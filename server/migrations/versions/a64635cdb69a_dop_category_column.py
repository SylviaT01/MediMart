"""Dop category column

Revision ID: a64635cdb69a
Revises: 76c68ea582cf
Create Date: 2024-07-06 12:54:19.739105

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a64635cdb69a'
down_revision = '76c68ea582cf'
branch_labels = None
depends_on = None


def upgrade():
    # Drop category column
    op.drop_column('product', 'category')


def downgrade():
    # Add category column back as a string column
    op.add_column('product', sa.Column('category', sa.String(120), nullable=True))

    # ### end Alembic commands ###
