"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/login', methods=['POST'])
def handle_login():
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email=email).first()

    token = create_access_token(identity=email)
    return jsonify(token_value=token), 200


@api.route('/signup', methods=['POST'])
def handle_signup():
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email=email).first()
    new_user = User(
        email = email,
        password = password
    )
    db.session.add(new_user)
    db.session.commit()  
    token = create_access_token(identity=email)
    return jsonify(), 200

