from django.urls import path, include
from . import views

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('signup/', include('dj_rest_auth.registration.urls')),
    path('<int:pk>/',views.UserProfileGenericAPIView.as_view()),
    path('<int:pk>/update',views.UserProfileUpdategenericAPIView.as_view()),
]