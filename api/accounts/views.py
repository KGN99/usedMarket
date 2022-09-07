from rest_framework.generics import RetrieveUpdateAPIView, UpdateAPIView, ListAPIView, RetrieveAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .models import User
from accounts.serializers import UserProfileSerializer,UserProfileUpdateSerializer

# 사용자 프로필 확인
class UserProfileGenericAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer

# 사용자 프로필 수정 / only 사용자 이름, 아바타
class UserProfileUpdategenericAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileUpdateSerializer