from flask import request
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import db, User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity


def signup_controller():

    data = request.json

    name = data["name"]
    email = data["email"]
    password = generate_password_hash(data["password"])

    # existingUser = db.session.

    user = User(
        name=name,
        email=email,
        password=password
    )

    db.session.add(user)
    db.session.commit()

    return {
    "message": "User created successfully!"
           }, 200

def login_controller():
    data = request.json

    email = data["email"]

    user = User.query.filter_by(email=email).first()
    if user is None:
          return {
        "message": "Invalid email or password"
        }, 401

    password = data["password"]

    if not check_password_hash(user.password, password):
     return {
        "message": "Invalid email or password"
        }, 401

    access_token = create_access_token(identity=str(user.id))

    return {
    "message": "Login successful!",
    "access_token": access_token
}, 200

@jwt_required()
def profile_controller():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    return {
        "message": "You are authenticated!",
        "user_id": user.id,
        "name": user.name,
        "email": user.email
    }, 200