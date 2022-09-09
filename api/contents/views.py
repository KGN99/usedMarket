from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .models import Product,ProductImage
from contents.serializers import ProductSerializers,ProductImageSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny

# 상품 목록/생성
class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers

# 상품 조회/수정/삭제
class ProductRetrieveUpdateDestroyGenericAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers