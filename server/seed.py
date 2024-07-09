import json
import re
import os
import logging
import random
import requests
from faker import Faker
from datetime import datetime, timedelta
from app import db, create_app, bcrypt
from app.models import User, Product, Order, Category

fake = Faker()

def convert_price_to_float(price_str):
    # Extract the numeric part from the price string
    numeric_part = re.sub(r'[^\d.,]', '', price_str).replace(',', '')
    return float(numeric_part)

# Load the JSON data from file
with open('data.json', 'r') as file:
    data = json.load(file)

# Iterate through each category and product to convert the prices
for category, products in data.items():
    for product in products:
        product['price'] = convert_price_to_float(product['price'])

# Specify the number of users and orders to generate
NUM_USERS = 0
NUM_ORDERS = 0

api_url = "https://api.github.com/repos/ahabab23/chemistdata/contents/payless"

logging.basicConfig(level=logging.DEBUG)  # Enable debug logging

def generate_fake_users(num_users):
    users = []
    for _ in range(num_users):
        name = fake.name()
        email = fake.email()
        password = bcrypt.generate_password_hash(fake.password()).decode('utf-8')
        user = User(name=name, email=email, password=password)
        users.append(user)
    return users

def generate_fake_orders(num_orders, users, products):
    orders = []
    for _ in range(num_orders):
        user = random.choice(users)
        product = random.choice(products)
        quantity = random.randint(1, 10)
        price = product.price
        total_price = product.price * quantity
        order_date = fake.date_time_between(start_date='-1y', end_date='now')
        order = Order(
            user_id=user.id,
            product_id=product.id,
            quantity=quantity,
            price=price,
            total_price=total_price,
            order_date=order_date
        )
        orders.append(order)
    return orders

def clear_tables():
    Order.query.delete()
    Product.query.delete()
    User.query.delete()
    Category.query.delete()
    db.session.commit()

app = create_app()

with app.app_context():
    db.create_all()

    # Clear existing data
    clear_tables()
    
    # Generate and add fake users
    users = generate_fake_users(NUM_USERS)
    db.session.add_all(users)
    db.session.commit()

    # Fetch and add products from JSON files in the folder
    products = []
    for category_name, items in data.items():
        category = Category(name=category_name)
        db.session.add(category)
        db.session.flush()  # Flush to get the category.id
        for item in items:
            product = Product(
                title=item["title"],
                price=item["price"],
                image_url=item["image_url"],
                category_name=category_name,  # Ensure category_name is set correctly
                category_id=category.id
            )
            products.append(product)
            db.session.add(product)
    db.session.commit()

    # Generate and add fake orders
    orders = generate_fake_orders(NUM_ORDERS, users, products)
    db.session.add_all(orders)
    db.session.commit()

    print("Database seeded successfully.")
