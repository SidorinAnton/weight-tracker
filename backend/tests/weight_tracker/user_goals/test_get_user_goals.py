import pytest
from django.urls import reverse

pytestmark = [
    pytest.mark.django_db,
]


def url():
    return reverse("weight_tracker:user-goals-list")


def test_get_not_authenticated(drf_client, user_goals):
    resp = drf_client.get(url())
    assert resp.status_code == 403, resp.json()
    assert resp.json() == {"detail": "Учетные данные не были предоставлены."}


def test_get_ok(drf_client, authenticate, user, user_goals):
    with authenticate(user):
        resp = drf_client.get(url())

    assert resp.status_code == 200, resp.json()
    assert resp.json() == {
        "count": 1,
        "next": None,
        "previous": None,
        "results": [
            {
                "goal_type": user_goals.goal_type,
                "id": user_goals.id,
                "target_date": str(user_goals.target_date),
                "user_id": user.id,
                "weight_goal": user_goals.weight_goal,
            },
        ],
    }


def test_get_user_dependent_metrics(drf_client, authenticate, user, staff_user, user_goals):
    with authenticate(user):
        resp = drf_client.get(url())

    with authenticate(staff_user):
        resp_2 = drf_client.get(url())

    assert resp.status_code == 200, resp.json()
    assert resp_2.status_code == 200, resp.json()
    assert resp.json() != resp_2.json()
