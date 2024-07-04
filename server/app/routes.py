from flask import request, jsonify, Blueprint
from app import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models import User, Product, Order
import bcrypt
from datetime import datetime

routes = Blueprint("routes", __name__)

@routes.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(name=data['name'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.as_dict()), 201

@routes.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    return jsonify(user.as_dict())

@routes.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    new_product = Product(
        name=data['name'],
        image_url=data['image_url'],
        description=data['description'],
        category=data['category'],
        price=data['price'],
        is_in_stock=data['is_in_stock']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.as_dict()), 201

@routes.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.as_dict() for product in products])

@routes.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)
    return jsonify(product.as_dict())

@routes.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    product = Product.query.get(product_id)
    product.name = data['name']
    product.image_url = data['image_url']
    product.description = data['description']
    product.category = data['category']
    product.price = data['price']
    product.is_in_stock = data['is_in_stock']
    db.session.commit()
    return jsonify(product.as_dict())

@routes.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get(product_id)
    db.session.delete(product)
    db.session.commit()
    return '', 204

@routes.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    new_order = Order(
        user_id=data['user_id'],
        product_id=data['product_id'],
        quantity=data['quantity'],
        total_price=data['total_price'],
        order_date=datetime.utcnow()
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify(new_order.as_dict()), 201

@routes.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([order.as_dict() for order in orders])

@routes.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get(order_id)
    return jsonify(order.as_dict())

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

@routes.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get(order_id)
    db.session.delete(order)
    db.session.commit()
    return '', 204

