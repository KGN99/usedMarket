# Generated by Django 4.1 on 2022-09-09 15:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contents', '0005_alter_productimage_product_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productimage',
            old_name='product_id',
            new_name='product',
        ),
    ]