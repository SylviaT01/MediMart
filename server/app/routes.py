from flask import request, jsonify, Blueprint
from app import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity,  get_jwt, JWTManager, create_refresh_token 
from app.models import User, Product, Order, Category
from flask_bcrypt import Bcrypt
# import bcrypt
import jwt
from datetime import datetime

bcrypt = Bcrypt()

routes = Blueprint("routes", __name__)

# @routes.route("/login", methods=["POST"])
# def login():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     user = User.query.filter_by(email=email).first()
#     if user and bcrypt.check_password_hash(user.password, password):
#         access_token = create_access_token(identity=user.id)
#         return jsonify({"access_token":access_token})
#     else:
#         return jsonify({"message":"Invalid username or password"}), 401

@routes.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        return jsonify({"access_token": access_token, "refresh_token": refresh_token})
    else:
        return jsonify({"message": "Invalid username or password"}), 401


@routes.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user_id)
    return jsonify({"access_token": new_access_token}), 200
    
@routes.route("/current_user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    if current_user:
        return jsonify({"id":current_user.id, "name":current_user.name, "email":current_user.email}), 200
    else: 
        return jsonify({"message":"User not found"}), 404
    
BLACKLIST = set()
# @jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    jti = decrypted_token["jti"]
    return jti in BLACKLIST

@routes.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"success":"Logged out successfully"}), 200

    
# #Add user
# @routes.route('/users', methods=['POST'])
# def create_user():
#     data = request.get_json()
#     hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
#     new_user = User(name=data['name'], email=data['email'], password=hashed_password)
#     db.session.add(new_user)
#     db.session.commit()
#     return jsonify(new_user.as_dict()), 201

@routes.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()

    # Check if 'name', 'email', and 'password' are present in the JSON data
    if 'name' not in data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(name=data['name'], email=data['email'], password=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'success': 'User created successfully', 'user': new_user.as_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


#Get single user
@routes.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    return jsonify(user.as_dict())

@routes.route('/users/<int:user_id>', methods=['PATCH'])
@jwt_required()
def update_user(user_id):
    current_user_id = get_jwt_identity()

    # Check if the user is updating their own profile
    if current_user_id != user_id:
        return jsonify({'error': 'Unauthorized access'}), 401

    data = request.get_json()

    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    if 'name' in data:
        user.name = data['name']
    
    if 'email' in data:
        user.email = data['email']

    if 'password' in data:
        user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    try:
        db.session.commit()
        return jsonify(user.as_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Add products
# @routes.route('/products', methods=['POST'])
# def create_product():
#     data = request.get_json()
#     new_product = Product(
#         name=data['name'],
#         image_url=data['image_url'],
#         description=data['description'],
#         category=data['category'],
#         price=data['price'],
#         is_in_stock=data['is_in_stock']
#     )
#     db.session.add(new_product)
#     db.session.commit()
#     return jsonify(new_product.as_dict()), 201

# Delete
@routes.route('/users/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    current_user_id = get_jwt_identity()
    user = User.query.get(id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    if user.id != current_user_id:
        return jsonify({'error': 'You are not authorized to delete this user'}), 403

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'User deleted successfully'}), 200

# Get all products
@routes.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.as_dict() for product in products])

# Get a single product
@routes.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)
    return jsonify(product.as_dict())

#Add new product
# @routes.route('/products/<int:product_id>', methods=['PUT'])
# def update_product(product_id):
#     data = request.get_json()
#     product = Product.query.get(product_id)
#     product.name = data['name']
#     product.image_url = data['image_url']
#     product.description = data['description']
#     product.category = data['category']
#     product.price = data['price']
#     product.is_in_stock = data['is_in_stock']
#     db.session.commit()
#     return jsonify(product.as_dict())

# Delete product
@routes.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get(product_id)
    db.session.delete(product)
    db.session.commit()
    return '', 204

# Add new order
# Add new order
@routes.route('/orders', methods=['POST'])
def create_order():
    try:
        data = request.get_json()
        if not data or not all(key in data for key in ('user_id', 'product_id', 'quantity', 'total_price')):
            return jsonify({"error": "Invalid data"}), 400

        new_order = Order(
            user_id=data['user_id'],
            product_id=data['product_id'],
            quantity=data['quantity'],
            price=data.get('price'),  # Get the price from the data if available
            total_price=data['total_price'],
            order_date=datetime.utcnow()
        )
        db.session.add(new_order)
        db.session.commit()
        return jsonify(new_order.as_dict()), 201
    except Exception as e:
        print(f"Error creating order: {e}")
        return jsonify({"error": "An error occurred while creating the order"}), 500
#Get all orders
@routes.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([order.as_dict() for order in orders])

# Get a single order
@routes.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get(order_id)
    return jsonify(order.as_dict())

# Update order
@routes.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    data = request.get_json()
    order = Order.query.get(order_id)
    order.user_id = data['user_id']
    order.product_id = data['product_id']
    order.quantity = data['quantity']
    order.total_price = data['total_price']
    db.session.commit()
    return jsonify(order.as_dict())

# Delete order
@routes.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get(order_id)
    db.session.delete(order)
    db.session.commit()
    return '', 204

@routes.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.as_dict() for category in categories])
