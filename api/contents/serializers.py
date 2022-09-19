from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product,ProductImage,Comment

# 이미지 리사이징
def rescale(data, width, height, force=True):
    from io import BytesIO
    from PIL import Image as pil
    """
    Rescale the given image, optionally cropping it to make sure the result image has the specified width and height.
    https://djangosnippets.org/snippets/224/
    """
    max_width = width
    max_height = height

    input_file = BytesIO(data.read())
    img = pil.open(input_file)
    if not force:
        img.thumbnail((max_width, max_height), pil.ANTIALIAS)
    else:
        src_width, src_height = img.size
        src_ratio = float(src_width) / float(src_height)
        dst_width, dst_height = max_width, max_height
        dst_ratio = float(dst_width) / float(dst_height)

        if dst_ratio < src_ratio:
            crop_height = src_height
            crop_width = crop_height * dst_ratio
            x_offset = int(src_width - crop_width) // 2
            y_offset = 0
        else:
            crop_width = src_width
            crop_height = crop_width / dst_ratio
            x_offset = 0
            y_offset = int(src_height - crop_height) // 3
        img = img.crop((x_offset, y_offset, x_offset + int(crop_width), y_offset + int(crop_height)))
        img = img.resize((dst_width, dst_height), pil.ANTIALIAS)

    image_file = BytesIO()
    img.save(image_file, 'JPEG')
    data.file = image_file
    return data

# 유저 시리얼라이저
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id","email", "username", "avatar_url"]

# 상품 이미지
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id","product","product_image"]

# 상품 시리얼라이저
class ProductSerializer(serializers.ModelSerializer):
    writer = AuthorSerializer(read_only=True)
    # ProductImage를 Product에서 같이 관리
    images = serializers.SerializerMethodField()

    # 커스텀 시리얼라이저
    def get_images(self, obj):
        product_image = obj.productimage_set.all()
        return ProductImageSerializer(instance=product_image, many=True).data

    def create(self, validated_data):
        product = Product.objects.create(writer_id=self.context['request'].user.id,**validated_data)
        images_data = self.context['request'].FILES
        for image_data in images_data.getlist('product_image'):
            ProductImage.objects.create(product=product, product_image=rescale(image_data, 400, 400, force=True))
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
        instance.save()
        ProductImage.objects.filter(product=instance).delete()
        images_data = self.context['request'].FILES
        for image_data in images_data.getlist('product_image'):
            ProductImage.objects.create(product=instance, product_image=rescale(image_data, 400, 400, force=True))
        return instance

    def delete(self,instance,validated_data):
        return Product.objects.filter(id=instance.id).delete()

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

# 댓글 시리얼라이저
class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    def create(self, validated_data):
        comment = Comment.objects.create(author_id=self.context['request'].user.id,product_id=self.context["view"].kwargs.get("product_id"),**validated_data)
        return comment

    def update(self, instance, validated_data):
        instance.message = validated_data.get('message', instance.message)
        instance.save()
        return instance

    def delete(self,instance,validated_data):
        return Comment.objects.filter(id=instance.id).delete()

    class Meta:
        model = Comment
        fields = '__all__'


