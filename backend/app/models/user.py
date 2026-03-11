from ..extensions import db

class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    nome = db.Column(db.String(120), nullable=False)
    cpf = db.Column(db.String(14), unique=True, nullable=False)

    email = db.Column(db.String(120), unique=True)

    telefone = db.Column(db.String(20))

    endereco = db.Column(db.String(200))
    cidade = db.Column(db.String(100))
    estado = db.Column(db.String(2))
    cep = db.Column(db.String(9))