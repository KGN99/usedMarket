from rest_framework import serializers
from django.contrib.auth import get_user_model

# 객체 인스턴스로 리턴 받은 사용자 모델 참조
User = get_user_model()

# 사용자 프로필 확인
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["pk", "email", "username","avatar", "avatar_url"]

# 사용자 프로필 수정 / only 사용자 이름, 아바타
class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["username","avatar"]

