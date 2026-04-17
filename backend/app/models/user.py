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
    avatar_url = db.Column(db.String(255))
    nome_instituicao = db.Column(db.String(120))
    password_hash = db.Column(db.String(256))
    
    pets = db.relationship('Pet', backref='owner', lazy=True)

    def set_password(self, password):
        from werkzeug.security import generate_password_hash
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        from werkzeug.security import check_password_hash
        return check_password_hash(self.password_hash, password)