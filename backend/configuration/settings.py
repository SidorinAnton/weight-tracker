import os
from os import path

import confuse

BASE_DIR = path.dirname(path.dirname(path.abspath(__file__)))

confuse.core.CONFIG_FILENAME = "weight-tracker.yaml"
config = confuse.Configuration("weight-tracker", __name__)
path_to_config = os.path.join(path.dirname(BASE_DIR), "configs", "weight-tracker.yaml")
if os.path.exists(path_to_config):
    config.set_file(path_to_config)

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-1i4(1c9a=9@_-2b$u!unh68_bol8#xev*ajc*x#eaz=7a+)_@4"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config["common"]["debug"].get(True)

ALLOWED_HOSTS = ["*"]
CSRF_TRUSTED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1"]
CORS_ORIGIN_WHITELIST = ["http://localhost:3000", "http://127.0.0.1:3000"]
CORS_ALLOW_CREDENTIALS = True

# CSRF_COOKIE_SAMESITE = "Strict"
# SESSION_COOKIE_SAMESITE = "Strict"
# CSRF_COOKIE_HTTPONLY = True
# SESSION_COOKIE_HTTPONLY = True


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "drf_spectacular",
    "corsheaders",
]

PROJECT_APPS = [
    "entrypoint",
    "weight_tracker",
]

INSTALLED_APPS += PROJECT_APPS

if DEBUG:
    INSTALLED_APPS += ["silk"]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

if DEBUG:
    MIDDLEWARE += ["silk.middleware.SilkyMiddleware"]

ROOT_URLCONF = "configuration.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "configuration.wsgi.application"
ASGI_APPLICATION = "configuration.asgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": config["database"]["name"].get("weight_tracker"),
        "USER": config["database"]["user"].get("weight_tracker"),
        "PASSWORD": config["database"]["password"].get("weight_tracker"),
        "HOST": config["database"]["host"].get("127.0.0.1"),
        "PORT": config["database"]["port"].get(5432),
        "TEST_CHARSET": "utf8mb4",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "ru-RU"
TIME_ZONE = "Europe/Moscow"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "NON_FIELD_ERRORS_KEY": "non_field_error",
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
    ],
    "SEARCH_PARAM": "q",
    # "DATETIME_FORMAT": "%s",
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    # "TEST_REQUEST_DEFAULT_FORMAT": "json",
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Weight Tracker API",
    "DESCRIPTION": "Tracker for weight and other metrics of body",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    # OTHER SETTINGS
}
