from flask import Flask
from flask_cors import CORS
from config import Config
from .extensions import db, migrate, jwt

from .models.user import User
from .models.pet import Pet

def create_app():

    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensões
    CORS(app) # Habilita CORS para todas as rotas
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Registrar Blueprints
    from .routes.auth import auth_bp
    from .routes.users import users_bp
    from .routes.pets import pets_bp

    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(users_bp, url_prefix='/api')
    app.register_blueprint(pets_bp, url_prefix='/api')

    return app