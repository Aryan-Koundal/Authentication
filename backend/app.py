from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from models.user import db
from routes.auth_routes import auth_bp
app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "your-secret-key"
JWTManager(app)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+mysqlconnector://root:%40%23aryan_3039@localhost/signup_db"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

app.register_blueprint(auth_bp)

with app.app_context():
    db.create_all()


app.run()