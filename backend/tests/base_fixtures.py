import contextlib

import pytest
from django.contrib.auth.models import User
from django.test.client import Client
from pytest_django.lazy_django import skip_if_no_django
from rest_framework.test import APIClient
from tests.weight_tracker.factories import UserFactory

__all__ = [
    "client",
    "drf_client",
    "authenticate",
]


@pytest.fixture()
def client() -> Client:
    skip_if_no_django()
    return Client()


@pytest.fixture()
def drf_client() -> APIClient:
    skip_if_no_django()
    return APIClient()


@pytest.fixture
def authenticate(client, drf_client):
    @contextlib.contextmanager
    def wrap(user: User = None):
        if user is None:
            user = UserFactory()

        client.force_login(user)
        drf_client.force_login(user)
        yield user
        drf_client.logout()
        client.logout()

    return wrap
