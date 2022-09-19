from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r"products/(?P<product_id>\d+)/comments", views.CommentViewSet)

urlpatterns = [
    path("", include(router.urls)),
]