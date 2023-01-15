from django.urls import path
from entrypoint.csrf.views import get_csrf
from entrypoint.is_authenticated.views import SessionView
from entrypoint.login.views import LoginView
from entrypoint.logout.views import LogoutView

urlpatterns = [
    path("csrf-token/", get_csrf, name="csrf-token"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("is_authenticated/", SessionView.as_view(), name="is_authenticated"),
]
