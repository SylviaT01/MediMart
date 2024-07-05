# from app import db, create_app, bcrypt
# from app.models import User, Product, Order
# from faker import Faker
# import random
# from datetime import datetime, timedelta
# import requests
# import logging

# fake = Faker()

# # Specify the number of users and orders to generate
# NUM_USERS = 20
# NUM_ORDERS = 40

# api_url = "https://api.github.com/repos/ahabab23/chemistdata/contents/payless"

# # URL of the GitHub API to list the JSON files in the folder
# logging.basicConfig(level=logging.DEBUG)  # Enable debug logging

# def fetch_json_files_list(url):
#     try:
#         response = requests.get(url)
#         response.raise_for_status()  # Raise an error for bad status codes
#         # Parse HTML or use GitHub API to get file URLs
#         # Example: Use GitHub API to list contents of a directory
#         api_url = "https://api.github.com/repos/ahabab23/chemistdata/contents/payless"
#         headers = {"Accept": "application/vnd.github.v3+json"}
#         response = requests.get(api_url, headers=headers)
#         response.raise_for_status()
#         files = response.json()
#         json_files = [file['download_url'] for file in files if file.get('name', '').endswith('.json')]
#         return json_files
#     except requests.exceptions.RequestException as e:
#         logging.error(f"Error fetching JSON files from {url}: {e}")
#         return []
#     except ValueError as e:
#         logging.error(f"Error decoding JSON from {url}: {e}")
#         return []


# def fetch_products_from_github(urls):
#     products = []
#     for url in urls:
#         response = requests.get(url)
#         products.extend(response.json())
#     return products

# def generate_fake_users(num_users):
#     users = []
#     for _ in range(num_users):
#         name = fake.name()
#         email = fake.email()
#         password = bcrypt.generate_password_hash(fake.password()).decode('utf-8')
#         user = User(name=name, email=email, password=password)
#         users.append(user)
#     return users

# def generate_products_from_json(data):
#     products = []
#     for item in data:
#         title = item['title']
#         image_url = item['image_url']
#         # description = item['description']
#         # category = item['category']
#         price = item['price']
#         # is_in_stock = item['is_in_stock']
#         product = Product(
#             title=title,
#             image_url=image_url,
#             # description=description,
#             # category=category,
#             price=price,
#             # is_in_stock=is_in_stock
#         )
#         products.append(product)
#     return products

# def generate_fake_orders(num_orders, users, products):
#     orders = []
#     for _ in range(num_orders):
#         user = random.choice(users)
#         product = random.choice(products)
#         quantity = random.randint(1, 10)
#         total_price = product.price * quantity
#         order_date = fake.date_time_between(start_date='-1y', end_date='now')
#         order = Order(
#             user_id=user.id,
#             product_id=product.id,
#             quantity=quantity,
#             total_price=total_price,
#             order_date=order_date
#         )
#         orders.append(order)
#     return orders

# def clear_tables():
#     Order.query.delete()
#     Product.query.delete()
#     User.query.delete()
#     db.session.commit()

# app = create_app()

# with app.app_context():
#     db.create_all()

#     # Clear existing data
#     clear_tables()

#     # Generate and add fake users
#     users = generate_fake_users(NUM_USERS)
#     db.session.add_all(users)
#     db.session.commit()

#     # Fetch and add products from JSON files in the folder
#     json_files_list = fetch_json_files_list(api_url)
#     products_data = fetch_products_from_github(json_files_list)
#     products = generate_products_from_json(products_data)
#     db.session.add_all(products)
#     db.session.commit()

#     # Generate and add fake orders
#     orders = generate_fake_orders(NUM_ORDERS, users, products)
#     db.session.add_all(orders)
#     db.session.commit()

#     print("Database seeded successfully.")



from app import db, create_app, bcrypt
from app.models import User, Product, Order
from faker import Faker
import random
from datetime import datetime, timedelta
import requests
import logging
import os

fake = Faker()

# Specify the number of users and orders to generate
NUM_USERS = 20
NUM_ORDERS = 40

api_url = "https://api.github.com/repos/ahabab23/chemistdata/contents/payless"

# URL of the GitHub API to list the JSON files in the folder
logging.basicConfig(level=logging.DEBUG)  # Enable debug logging

def fetch_json_files_list(url):
    try:
        headers = {"Accept": "application/vnd.github.v3+json"}
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        files = response.json()
        json_files = [file['download_url'] for file in files if file.get('name', '').endswith('.json')]
        return json_files
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching JSON files from {url}: {e}")
        return []

def fetch_products_from_github(urls):
    products = []
    for url in urls:
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            # Add 'filename' attribute to each item in data list
            for item in data:
                item['filename'] = os.path.basename(url)  # Add filename as category
            products.extend(data)
        except requests.exceptions.RequestException as e:
            logging.error(f"Error fetching product data from {url}: {e}")
    return products

def generate_fake_users(num_users):
    users = []
    for _ in range(num_users):
        name = fake.name()
        email = fake.email()
        password = bcrypt.generate_password_hash(fake.password()).decode('utf-8')
        user = User(name=name, email=email, password=password)
        users.append(user)
    return users

def generate_products_from_json(data):
    products = []
    for item in data:
        title = item['title']
        image_url = item['image_url']
        price = item['price']
        # Infer category from the filename
        category = item['filename'].split('.')[0].replace('_', ' ')  # Assumes filename structure like 'category.json'
        product = Product(
            title=title,
            image_url=image_url,
            price=price,
            category=category  # Assign inferred category
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

def clear_tables():
    Order.query.delete()
    Product.query.delete()
    User.query.delete()
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
    json_files_list = fetch_json_files_list(api_url)
    products_data = fetch_products_from_github(json_files_list)
    products = generate_products_from_json(products_data)
    db.session.add_all(products)
    db.session.commit()

    # Generate and add fake orders
    orders = generate_fake_orders(NUM_ORDERS, users, products)
    db.session.add_all(orders)
    db.session.commit()

    print("Database seeded successfully.")
