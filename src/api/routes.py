"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash


api = Blueprint('api', __name__)
#usertest@test55.com 123456// use this to test the login and other functionality.
# Allow CORS requests to this API
CORS(api)

@api.route('/login', methods=['POST'])
def handle_login():
    email = request.json.get("email")
    password = request.json.get("password")
    if not email or not password:
     return jsonify({"msg": "Email and password are required"}), 400
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"msg": "User not found"}), 404
    if not check_password_hash(user.password, password):  #<<<<=====retunrs true or false(password entered by the client)
        return jsonify({"msg": "Password doesn't match"}), 401          
       
    token = create_access_token(identity=email)
    return jsonify(token_value=token), 200


@api.route('/signup', methods=['POST'])
def handle_signup():
    email = request.json.get("email")
    password = request.json.get("password")
    if not email or not password:
        return jsonify("email and password are required"), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify("user already exists"), 409
    new_user = User(
        email = email,
        password = generate_password_hash(password)
    )
    db.session.add(new_user)
    db.session.commit()  
    
    return jsonify("user created"), 201

