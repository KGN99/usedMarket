from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone

# 유저 아바타 이미지 저장 경로 커스텀
def avatar_url_path(instance,filename):
    path = f"accounts/{instance.username}/avatar/{filename}"
    return path

class UserManager(BaseUserManager):
    use_in_migrations = True
    # 일반 유저
    def create_user(self, email, username, password, **extra_fields):
        if not email:
            raise ValueError('이메일을 입력해주세요!')
        if not username:
            raise ValueError('사용자 이름을 입력해주세요!')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    # 관리자
    def create_superuser(self, email,username, password, **extra_fields):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password
        )
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser,PermissionsMixin):
    objects = UserManager()

    email = models.EmailField(max_length=64,
                              unique=True)
    username = models.CharField(unique=True,max_length=30)
    avatar = models.ImageField(blank=True,null=True,upload_to=avatar_url_path)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False,
                                   help_text="Designates whether the user can log into this admin site.")
    date_joined = models.DateTimeField('date joined', default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

    def get_email(self):
        return self.email

    @property
    def is_staff(self):
        return self.is_admin

    # 사용자 아바타를 추가로 저장하지 않으면 지정한 기본 이미지를 호출
    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return "/static/images/default_avatar.png"

