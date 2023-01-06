import pytest
from django.urls import reverse

pytestmark = [
    pytest.mark.django_db,
]


def url():
    return reverse("weight_tracker:user-metrics-list")


def test_get_not_authenticated(drf_client, user_metrics):
    resp = drf_client.get(url())
    assert resp.status_code == 403, resp.json()
    assert resp.json() == {"detail": "Учетные данные не были предоставлены."}


def test_get_ok(drf_client, authenticate, user, user_metrics):
    with authenticate(user):
        resp = drf_client.get(url())

    assert resp.status_code == 200, resp.json()
    assert resp.json() == {
        "count": 1,
        "next": None,
        "previous": None,
        "results": [
            {
                "id": user_metrics.id,
                "measurement_date": str(user_metrics.measurement_date),
                "user_id": user_metrics.user.id,
                "waist_circumference": user_metrics.waist_circumference,
                "weight": user_metrics.weight,
            }
        ],
    }


def test_get_user_dependent_metrics(drf_client, authenticate, user, staff_user, user_metrics):
    with authenticate(user):
        resp = drf_client.get(url())

    with authenticate(staff_user):
        resp_2 = drf_client.get(url())

    assert resp.status_code == 200, resp.json()
    assert resp_2.status_code == 200, resp.json()
    assert resp.json() != resp_2.json()
