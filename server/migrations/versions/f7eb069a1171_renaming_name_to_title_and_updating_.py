"""Renaming name to title and updating model

Revision ID: f7eb069a1171
Revises: 2822b5a1a937
Create Date: 2024-07-05 10:40:16.652003

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f7eb069a1171'
down_revision = '2822b5a1a937'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('_alembic_tmp_product')
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.alter_column('is_in_stock',
               existing_type=sa.BOOLEAN(),
               nullable=False)
        batch_op.drop_column('category')
        batch_op.drop_column('name')
        batch_op.drop_column('description')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.VARCHAR(length=255), nullable=True))
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=120), nullable=False))
        batch_op.add_column(sa.Column('category', sa.VARCHAR(length=120), nullable=True))
        batch_op.alter_column('is_in_stock',
               existing_type=sa.BOOLEAN(),
               nullable=True)

    op.create_table('_alembic_tmp_product',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('image_url', sa.VARCHAR(length=255), nullable=True),
    sa.Column('price', sa.INTEGER(), nullable=False),
    sa.Column('is_in_stock', sa.BOOLEAN(), nullable=True),
    sa.Column('title', sa.VARCHAR(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
