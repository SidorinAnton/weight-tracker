import pytest
from django.urls import reverse

pytestmark = [
    pytest.mark.django_db,
]


def url(user_goal_id):
    return reverse("weight_tracker:user-goals-detail", args=(user_goal_id,))


def test_patch_not_authenticated(drf_client, user_goals):
    resp = drf_client.patch(url(1))
    assert resp.status_code == 403, resp.json()
    assert resp.json() == {"detail": "Учетные данные не были предоставлены."}


def test_patch_ok(drf_client, authenticate, user, user_goals):
    data = {
        "user": user.id,
        "weight_goal": 10,
    }

    with authenticate(user):
        resp = drf_client.patch(url(user_goals.id), data=data)

    assert resp.status_code == 200, resp.json()
    assert resp.json() == {
        "user": user.id,
        "weight_goal": 10,
        "goal_type": user_goals.goal_type,
        "target_date": str(user_goals.target_date),
    }


def test_patch_not_valid_user_id(drf_client, authenticate, user, user_goals):
    data = {
        "user": 10,
        "weight_goal": 10,
    }

    with authenticate(user):
        resp = drf_client.patch(url(user_goals.id), data=data)

    assert resp.status_code == 400, resp.json()
    assert resp.json() == {
        "user": [
            'Недопустимый первичный ключ "10" - объект не существует.',
        ]
    }


def test_patch_another_user_id(drf_client, authenticate, user, user_2, user_goals):
    data = {
        "user": user_2.id,
        "weight_goal": 10,
    }

    with authenticate(user):
        resp = drf_client.patch(url(user_goals.id), data=data)

    assert resp.status_code == 403, resp.json()
    assert resp.json() == {
        "detail": "У вас недостаточно прав для выполнения данного действия.",
    }
