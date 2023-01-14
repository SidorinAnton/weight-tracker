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
        "weight": 1,
        "waist_circumference": 1,
        "measurement_date": datetime.date.today(),
    }

    with authenticate(user):
        resp = drf_client.post(url(), data=data)

    assert resp.status_code == 201, resp.json()
    assert resp.json() == {
        "id": user.metrics.first().id,
        "user_id": user.id,
        "weight": 1,
        "waist_circumference": 1,
        "measurement_date": str(datetime.date.today()),
    }


def test_post_without_date(drf_client, authenticate, user):
    data = {
        "weight": 1,
        "waist_circumference": 1,
    }

    with authenticate(user):
        resp = drf_client.post(url(), data=data)

    assert resp.status_code == 201, resp.json()
    assert resp.json() == {
        "id": user.metrics.first().id,
        "user_id": user.id,
        "weight": 1,
        "waist_circumference": 1,
        "measurement_date": str(datetime.date.today()),
    }


def test_post_without_data(drf_client, authenticate, user):
    with authenticate(user):
        resp = drf_client.post(url(), data={})

    assert resp.status_code == 201, resp.json()
    assert resp.json() == {
        "id": user.metrics.first().id,
        "user_id": user.id,
        "weight": 0,
        "waist_circumference": None,
        "measurement_date": str(datetime.date.today()),
    }
