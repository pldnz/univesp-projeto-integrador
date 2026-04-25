from ..extensions import db

class Pet(db.Model):
    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)  # Cachorro, Gato, etc
    age = db.Column(db.Integer)  # Idade em meses
    size = db.Column(db.String(50))  # Pequeno, Médio, Grande
    gender = db.Column(db.String(20)) # Macho, Fêmea
    location = db.Column(db.String(200))
    image_url = db.Column(db.String(500))
    status = db.Column(db.String(50), default="disponível") # disponível, adotado
    description = db.Column(db.Text)

    # Relacionamento com o Usuário (quem cadastrou o animal)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    def __repr__(self):
        return f'<Pet {self.name}>'
