
from app import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    orders = db.relationship('Order', backref='user', lazy=True)

    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    image_url = db.Column(db.String(255))
    # category = db.Column(db.String(120))
    price = db.Column(db.Integer, nullable=False)
    # is_in_stock = db.Column(db.Boolean, default=True)
    orders = db.relationship('Order', backref='product', lazy=True)


    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)
    order_date = db.Column(db.DateTime, nullable=False)

    def as_dict(self):
        return {col.name: getattr(self, col.name) for col in self.__table__.columns}
