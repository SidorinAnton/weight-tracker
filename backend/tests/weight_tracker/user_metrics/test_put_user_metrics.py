import datetime

import pytest
from django.urls import reverse

pytestmark = [
    pytest.mark.django_db,
]


def url(user_metrics_id):
    return reverse("weight_tracker:user-metrics-detail", args=(user_metrics_id,))


def test_put_not_authenticated(drf_client, user_metrics):
    resp = drf_client.put(url(1))
    assert resp.status_code == 403, resp.json()
    assert resp.json() == {"detail": "Учетные данные не были предоставлены."}


def test_put_ok(drf_client, authenticate, user, user_metrics):
    data = {
        "user": user.id,
        "weight": 10,
        "waist_circumference": 10,
        "measurement_date": datetime.date.today(),
    }

    with authenticate(user):
        resp = drf_client.put(url(user_metrics.id), data=data)

    assert resp.status_code == 200, resp.json()
    assert resp.json() == {
        "measurement_date": datetime.date.today().strftime("%Y-%m-%d"),
        "user": user.id,
        "waist_circumference": 10,
        "weight": 10,
    }


def test_put_not_valid_user_id(drf_client, authenticate, user, user_metrics):
    data = {
        "user": 10,
        "weight": 1,
        "waist_circumference": 1,
        "measurement_date": datetime.date.today(),
    }

    with authenticate(user):
        resp = drf_client.put(url(user_metrics.id), data=data)

    assert resp.status_code == 400, resp.json()
    assert resp.json() == {
        "user": [
            'Недопустимый первичный ключ "10" - объект не существует.',
        ]
    }


def test_put_another_user_id(drf_client, authenticate, user, user_2, user_metrics):
    data = {
        "user": user_2.id,
        "weight": 1,
        "waist_circumference": 1,
        "measurement_date": datetime.date.today(),
    }

    with authenticate(user):
        resp = drf_client.put(url(user_metrics.id), data=data)

    assert resp.status_code == 403, resp.json()
    assert resp.json() == {
        "detail": "У вас недостаточно прав для выполнения данного действия.",
    }
