from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .models import Product,Comment
from contents.serializers import ProductSerializer,CommentSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response

# 상품 목록/생성
class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ["product_name", "product_desc", "trading_location"]
    filterset_fields = ['product_category', "writer"]
    ordering = ["-id"]

    @action(detail=True, methods=["get", "post"])
    def like(self, request, pk):
        product = self.get_object()
        product.product_like.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    @like.mapping.delete
    def unlike(self, request, pk):
        product = self.get_object()
        product.product_like.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["get", "post"])
    def views(self, request, pk):
        product = self.get_object()
        product.product_views.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

# 상품 조회/수정/삭제
class ProductRetrieveUpdateDestroyGenericAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# 댓글 목록/생성
class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(product__id=self.kwargs["product_id"])
        return qs