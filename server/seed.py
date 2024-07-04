from medimart.server.app.app import db
from models import User, Product, Order
from medimart.server.app.app import app, bcrypt
from faker import Faker
import random
from datetime import datetime, timedelta

fake = Faker()

# Specify the number of users, products, and orders to generate
NUM_USERS = 20
NUM_PRODUCTS = 50
NUM_ORDERS = 40

def generate_fake_users(num_users):
    users = []
    for _ in range(num_users):
        name = fake.name()
        email = fake.email()
        password = bcrypt.generate_password_hash(fake.password()).decode('utf-8')
        user = User(name=name, email=email, password=password)
        users.append(user)
    return users

def generate_fake_products(num_products):
    products = []
    for _ in range(num_products):
        name = fake.word().capitalize()
        image_url = fake.image_url()
        description = fake.sentence(nb_words=10)
        category = fake.word()
        price = random.randint(10, 1000)
        is_in_stock = fake.boolean()
        product = Product(
            name=name,
            image_url=image_url,
            description=description,
            category=category,
            price=price,
            is_in_stock=is_in_stock
        )
        products.append(product)
    return products

def generate_fake_orders(num_orders, users, products):
    orders = []
    for _ in range(num_orders):
        user = random.choice(users)
        product = random.choice(products)
        quantity = random.randint(1, 10)
        total_price = product.price * quantity
        order_date = fake.date_time_between(start_date='-1y', end_date='now')
        order = Order(
            user_id=user.id,
            product_id=product.id,
            quantity=quantity,
            total_price=total_price,
            order_date=order_date
        )
        orders.append(order)
    return orders

with app.app_context():
    db.create_all()

    # Generate and add fake users
    users = generate_fake_users(NUM_USERS)
    db.session.add_all(users)
    db.session.commit()

    # Generate and add fake products
    products = generate_fake_products(NUM_PRODUCTS)
    db.session.add_all(products)
    db.session.commit()

    # Generate and add fake orders
    orders = generate_fake_orders(NUM_ORDERS, users, products)
    db.session.add_all(orders)
    db.session.commit()

    print("Database seeded successfully.")
