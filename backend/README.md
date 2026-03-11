# API - Adoção de Animais

## Instalação

1 - Criar ambiente virtual

python -m venv venv

2 - Ativar ambiente

source venv/bin/activate
ou
venv\Scripts\activate

3 - Instalar dependências

pip install -r requirements.txt

4 - Configurar variáveis de ambiente

cp .env.example .env

5 - Rodar migrations

flask db upgrade

6 - Iniciar servidor

python run.py
