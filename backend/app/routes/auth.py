from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from ..models.user import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Email e senha são obrigatórios"}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({
            "access_token": access_token,
            "user": {
                "id": user.id,
                "nome": user.nome,
                "email": user.email,
                "nome_instituicao": user.nome_instituicao,
                "avatar_url": user.avatar_url
            }
        }), 200

    return jsonify({"msg": "Email ou senha inválidos"}), 401
