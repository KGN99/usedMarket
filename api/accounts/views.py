from rest_framework.generics import RetrieveUpdateAPIView, UpdateAPIView, ListAPIView, RetrieveAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .models import User
from accounts.serializers import UserProfileSerializer

# 사용자 프로필 확인
class UserProfileGenericAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer