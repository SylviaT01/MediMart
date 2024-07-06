"""Add category column

Revision ID: 659e6781a166
Revises: a64635cdb69a
Create Date: 2024-07-06 13:08:36.784702

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '659e6781a166'
down_revision = 'a64635cdb69a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.drop_column('category_name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category_name', sa.VARCHAR(length=120), nullable=False))

    # ### end Alembic commands ###
