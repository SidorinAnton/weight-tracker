import datetime

import pytest
from django.urls import reverse

pytestmark = [
    pytest.mark.django_db,
]


def url():
    return reverse("weight_tracker:user-metrics-list")


def test_post_not_authenticated(drf_client):
    resp = drf_client.post(url())
    assert resp.status_code == 403, resp.json()
    assert resp.json() == {"detail": "Учетные данные не были предоставлены."}


def test_post_ok(drf_client, authenticate, user):
    data = {
        "user": user.id,
        "weight": 1,
        "waist_circumference": 1,
        "measurement_date": datetime.date.today(),
    }

    with authenticate(user):
        resp = drf_client.post(url(), data=data)

    assert resp.status_code == 201, resp.json()
    assert resp.json() == {
        "measurement_date": datetime.date.today().strftime("%Y-%m-%d"),
        "user": user.id,
        "waist_circumference": 1,
        "weight": 1,
    }


def test_post_not_valid_user_id(drf_client, authenticate, user):
    data = {
        "user": 10,
        "weight": 1,
        "waist_circumference": 1,
        "measurement_date": datetime.date.today(),
    }

    with authenticate(user):
        resp = drf_client.post(url(), data=data)

    assert resp.status_code == 400, resp.json()
    assert resp.json() == {
        "user": [
            'Недопустимый первичный ключ "10" - объект не существует.',
        ]
    }


def test_post_another_user_id(drf_client, authenticate, user, user_2):
    data = {
        "user": user_2.id,
        "weight": 1,
        "waist_circumference": 1,
        "measurement_date": datetime.date.today(),
    }

    with authenticate(user):
        resp = drf_client.post(url(), data=data)

    assert resp.status_code == 403, resp.json()
    assert resp.json() == {
        "detail": "У вас недостаточно прав для выполнения данного действия.",
    }
