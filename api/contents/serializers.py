from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product,ProductImage

# 상품 이미지
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id","product","product_image"]

# 상품 목록/생성
class ProductSerializers(serializers.ModelSerializer):
    # ProductImage를 Product에서 같이 관리
    images = serializers.SerializerMethodField()

    # 커스텀 시리얼라이저
    def get_images(self, obj):
        product_image = obj.productimage_set.all()
        return ProductImageSerializer(instance=product_image, many=True).data

    def create(self, validated_data):
        product = Product.objects.create(**validated_data)
        images_data = self.context['request'].FILES
        for image_data in images_data.getlist('product_image'):
            ProductImage.objects.create(product=product, product_image=image_data)
        return product

    def update(self, instance, validated_data):
        instance.product_name = validated_data.get('product_name', instance.product_name)
        instance.product_price = validated_data.get('product_price', instance.product_price)
        instance.product_condition = validated_data.get('product_condition', instance.product_condition)
        instance.exchange_or_not = validated_data.get('exchange_or_not', instance.exchange_or_not)
        instance.trading_location = validated_data.get('trading_location', instance.trading_location)
        instance.product_desc = validated_data.get('product_desc', instance.product_desc)
        instance.product_count = validated_data.get('product_count', instance.product_count)
        instance.product_category = validated_data.get('product_category', instance.product_category)
        ProductImage.objects.filter(product=instance).delete()
        images_data = self.context['request'].FILES
        for image_data in images_data.getlist('product_image'):
            ProductImage.objects.create(product=instance, product_image=image_data)
        return instance

    class Meta:
        model = Product
        fields = [
            "id",
            "writer",
            "images",
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


