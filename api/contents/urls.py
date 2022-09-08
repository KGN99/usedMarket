from django.urls import path, include
from . import views

urlpatterns = [
    path("products/",views.ProductListCreateGenericAPIView.as_view()),
    path("products/<int:pk>/",views.ProductRetrieveUpdateDestroyGenericAPIView.as_view()),
]