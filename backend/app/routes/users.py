from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models.user import User

users_bp = Blueprint('users', __name__)

@users_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"msg": "Email já cadastrado"}), 400
    
    if User.query.filter_by(cpf=data.get('cpf')).first():
        return jsonify({"msg": "CPF já cadastrado"}), 400

    new_user = User(
        nome=data.get('nome'),
        cpf=data.get('cpf'),
        email=data.get('email'),
        telefone=data.get('telefone'),
        endereco=data.get('endereco'),
        cidade=data.get('cidade'),
        estado=data.get('estado'),
        cep=data.get('cep')
    )
    new_user.set_password(data.get('password'))
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "Usuário criado com sucesso", "id": new_user.id}), 201

@users_bp.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([{
        "id": u.id,
        "nome": u.nome,
        "email": u.email,
        "cidade": u.cidade,
        "estado": u.estado
    } for u in users]), 200

@users_bp.route('/users/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"msg": "Usuário não encontrado"}), 404
        
    return jsonify({
        "id": user.id,
        "nome": user.nome,
        "email": user.email,
        "telefone": user.telefone,
        "endereco": user.endereco,
        "cidade": user.cidade,
        "estado": user.estado,
        "cep": user.cep,
        "nome_instituicao": user.nome_instituicao,
        "avatar_url": user.avatar_url
    }), 200

@users_bp.route('/users/me', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"msg": "Usuário não encontrado"}), 404
        
    data = request.get_json()
    
    user.nome = data.get('nome', user.nome)
    user.telefone = data.get('telefone', user.telefone)
    user.nome_instituicao = data.get('nome_instituicao', user.nome_instituicao)
    user.avatar_url = data.get('avatar_url', user.avatar_url)
    user.endereco = data.get('endereco', user.endereco)
    user.cidade = data.get('cidade', user.cidade)
    user.estado = data.get('estado', user.estado)
    user.cep = data.get('cep', user.cep)
    
    db.session.commit()
    
    return jsonify({"msg": "Perfil atualizado com sucesso"}), 200

@users_bp.route('/users/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    current_user_id = get_jwt_identity()
    
    # Apenas o próprio usuário ou um admin (que ainda não definimos) pode deletar
    if str(id) != current_user_id:
        return jsonify({"msg": "Não autorizado"}), 403
        
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"msg": "Usuário deletado"}), 200
