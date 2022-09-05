import os
from os.path import join

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = '4o$+3sm+f=u5c^p4vukj!4gvf&_-k^_q+eo+u86&37-jhg4y2s'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# User 모델 선언
AUTH_USER_MODEL = 'accounts.User'

# "*"는 보안상 안좋아 서비스 할 때는 수정할 것
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # accounts third
    'rest_framework',
    'rest_framework.authtoken',
    'dj_rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth.registration',
    # third
    'corsheaders',
    # local
    'accounts',
]
SITE_ID = 1

MIDDLEWARE = [
    # corsheader 미들웨어 설정
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api.wsgi.application'


# MYSQL 환경변수 받아서 사용 /docker-compose.yml
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get("MYSQL_NAME"),
        'USER' : os.environ.get("MYSQL_USER"),
        'PASSWORD' : os.environ.get("MYSQL_PASSWORD"),
        'HOST' : os.environ.get("MYSQL_HOST"),
        'PORT' : '3306',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'ko-KR'
TIME_ZONE = 'Asia/Seoul'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# 경로 설정
STATIC_URL = '/static/'
STATIC_ROOT = join(BASE_DIR,'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = join(BASE_DIR,'media')

# DRF 설정
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        # 인증된 사용자만 접근 가능
        'rest_framework.permissions.IsAuthenticated',
        # 관리자만 접근 가능
        #'rest_framework.permissions.IsAdminUser',
        # 누구나 접근 가능
        #'rest_framework.permissions.AllowAny',
    ),

    'DEFAULT_RENDERER_CLASSES': (
        # 자동으로 json으로 바꿔줌
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ),
    # simple jwt 설정
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'rest_framework.authentication.SessionAuthentication',
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
    ),
    # 'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}
# dj-rest-auth JWT 설정
REST_USE_JWT = True
JWT_AUTH_COOKIE = 'access_token'
JWT_AUTH_REFRESH_COOKIE = 'refresh_token'

SITE_ID = 1
# dj-rest-auth 로그인 및 회원가입 관련 설정
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USER_MODEL_USERNAME_FIELD = 'username'
ACCOUNT_USERNAME_REQUIRED = True
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_VERIFICATION = 'none'
# 비밀번호 변경시 이전 비밀번호 입력받기
OLD_PASSWORD_FIELD_ENABLED = True
# 비밀번호 변경 후 로그아웃
LOGOUT_ON_PASSWORD_CHANGE = False
# corsheader 화이트 리스트
if DEBUG:
    CSRF_TRUSTED_ORIGINS = [
        'http://localhost:8000',
        'http://localhost:3000'
    ]
    CORS_ORIGIN_WHITELIST = [
        "http://localhost:3000",
        "http://localhost:8000",
    ]