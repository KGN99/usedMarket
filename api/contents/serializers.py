from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product

# 상품 목록/생성
class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "writer",
            "created_at",
            "updated_at",
            "product_name",
            "product_price",
            "product_condition",
            "exchange_or_not",
            "trading_location",
            "product_desc",
            "product_count",
            "product_category",
        ]
