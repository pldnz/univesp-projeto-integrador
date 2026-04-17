from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models.pet import Pet

pets_bp = Blueprint('pets', __name__)

from ..models.user import User

@pets_bp.route('/pets', methods=['GET'])
def get_pets():
    # Rota pública para listar animais disponíveis com filtros avançados
    status = request.args.get('status', 'disponível')
    search_query = request.args.get('search', '')
    p_type = request.args.get('type')
    gender = request.args.get('gender')
    size = request.args.get('size')
    age_group = request.args.get('age_group')

    query = Pet.query.join(User).filter(Pet.status == status)

    # Busca Unificada (Cidade, Estado, Nome da ONG, ou Nome do Animal)
    if search_query:
        from sqlalchemy import func
        search_pattern = f"%{search_query.lower()}%"
        query = query.filter(
            db.or_(
                func.lower(User.cidade).like(search_pattern),
                func.lower(User.estado).like(search_pattern),
                func.lower(User.nome_instituicao).like(search_pattern),
                func.lower(Pet.name).like(search_pattern),
                func.lower(Pet.location).like(search_pattern)
            )
        )

    # Filtros Categóricos
    if p_type and p_type != 'Todos':
        query = query.filter(Pet.type == p_type)
    if gender:
        query = query.filter(Pet.gender == gender)
    if size:
        query = query.filter(Pet.size == size)

    # Filtro de Idade (Meses)
    if age_group:
        if age_group == 'Filhote':
            query = query.filter(Pet.age < 12)
        elif age_group == 'Adulto':
            query = query.filter(Pet.age >= 12, Pet.age <= 84)
        elif age_group == 'Sênior':
            query = query.filter(Pet.age > 84)

    pets = query.all()
    
    return jsonify([{
        "id": p.id,
        "name": p.name,
        "type": p.type,
        "age": p.age,
        "size": p.size,
        "gender": p.gender,
        "location": p.location,
        "image_url": p.image_url,
        "status": p.status,
        "description": p.description,
        "owner_id": p.user_id,
        "institution_name": p.owner.nome_instituicao or p.owner.nome
    } for p in pets]), 200

@pets_bp.route('/pets/<int:id>', methods=['GET'])
def get_pet_detail(id):
    pet = Pet.query.get_or_404(id)
    return jsonify({
        "id": pet.id,
        "name": pet.name,
        "type": pet.type,
        "age": pet.age,
        "size": pet.size,
        "gender": pet.gender,
        "location": pet.location,
        "image_url": pet.image_url,
        "status": pet.status,
        "description": pet.description,
        "owner_id": pet.user_id,
        "institution_name": pet.owner.nome_instituicao or pet.owner.nome,
        "owner_phone": pet.owner.telefone,
        "owner_avatar": pet.owner.avatar_url
    }), 200

@pets_bp.route('/pets/me', methods=['GET'])
@jwt_required()
def get_my_pets():
    current_user_id = get_jwt_identity()
    pets = Pet.query.filter_by(user_id=int(current_user_id)).all()
    return jsonify([{
        "id": p.id,
        "name": p.name,
        "type": p.type,
        "age": p.age,
        "size": p.size,
        "gender": p.gender,
        "location": p.location,
        "image_url": p.image_url,
        "status": p.status,
        "description": p.description
    } for p in pets]), 200

@pets_bp.route('/pets', methods=['POST'])
@jwt_required()
def create_pet():
    current_user_id = get_jwt_identity()
    data = request.get_json()

    new_pet = Pet(
        name=data.get('name'),
        type=data.get('type'),
        age=data.get('age'),
        size=data.get('size'),
        gender=data.get('gender'),
        location=data.get('location'),
        image_url=data.get('image_url'),
        description=data.get('description'),
        user_id=int(current_user_id)
    )
    
    db.session.add(new_pet)
    db.session.commit()
    
    return jsonify({"msg": "Animal cadastrado com sucesso", "id": new_pet.id}), 201

@pets_bp.route('/pets/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_pet(id):
    current_user_id = get_jwt_identity()
    pet = Pet.query.get_or_404(id)
    
    # Apenas o dono do pet pode deletar
    if str(pet.user_id) != current_user_id:
        return jsonify({"msg": "Não autorizado"}), 403
        
    db.session.delete(pet)
    db.session.commit()
    
    return jsonify({"msg": "Animal removido"}), 200
