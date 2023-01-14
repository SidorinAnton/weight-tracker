import pytest
from django.urls import reverse

pytestmark = [
    pytest.mark.django_db,
]


def url(user_metrics_id):
    return reverse("weight_tracker:user-metrics-detail", args=(user_metrics_id,))


def test_patch_not_authenticated(drf_client, user_metrics):
    resp = drf_client.patch(url(1))
    assert resp.status_code == 403, resp.json()
    assert resp.json() == {"detail": "Учетные данные не были предоставлены."}


def test_patch_ok(drf_client, authenticate, user, user_metrics):
    data = {
        "user": user.id,
        "weight": 10,
    }

    with authenticate(user):
        resp = drf_client.patch(url(user_metrics.id), data=data)

    assert resp.status_code == 200, resp.json()
    assert resp.json() == {
        "measurement_date": str(user_metrics.measurement_date),
        "user": user.id,
        "waist_circumference": user_metrics.waist_circumference,
        "weight": 10,
    }


def test_patch_not_valid_user_id(drf_client, authenticate, user, user_metrics):
    data = {
        "user": 10,
        "weight": 1,
    }

    with authenticate(user):
        resp = drf_client.patch(url(user_metrics.id), data=data)

    assert resp.status_code == 400, resp.json()
    assert resp.json() == {
        "user": [
            'Недопустимый первичный ключ "10" - объект не существует.',
        ]
    }


def test_patch_another_user_id(drf_client, authenticate, user, user_2, user_metrics):
    data = {
        "user": user_2.id,
        "weight": 1,
    }

    with authenticate(user):
        resp = drf_client.patch(url(user_metrics.id), data=data)

    assert resp.status_code == 403, resp.json()
    assert resp.json() == {
        "detail": "У вас недостаточно прав для выполнения данного действия.",
    }
