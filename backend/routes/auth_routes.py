from flask import Blueprint

from controllers.auth_controller import signup_controller, login_controller, profile_controller


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/signup", methods=["POST"])
def signup():
    return signup_controller()

@auth_bp.route("/login", methods=["POST"])
def login():
    return login_controller()

@auth_bp.route("/profile", methods=["GET"])
def profile():
    return profile_controller()