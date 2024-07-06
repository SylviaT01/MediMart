"""Adds category_id column

Revision ID: 76c68ea582cf
Revises: f729d9bfd30f
Create Date: 2024-07-06 12:34:09.335503

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '76c68ea582cf'
down_revision = 'f729d9bfd30f'
branch_labels = None
depends_on = None


def upgrade():
    # Add the new column to the product table
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key('fk_category_id', 'category', ['category_id'], ['id'])


def downgrade():
    # Remove the column and the foreign key constraint if downgrading
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.drop_constraint('fk_category_id', type_='foreignkey')
        batch_op.drop_column('category_id')
