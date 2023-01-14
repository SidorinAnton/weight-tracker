import datetime

import pytest
from django.urls import reverse

pytestmark = [
    pytest.mark.django_db,
]


def url(user_goal_id):
    return reverse("weight_tracker:user-goals-detail", args=(user_goal_id,))


def test_put_not_authenticated(drf_client, user_goals):
    resp = drf_client.put(url(1))
    assert resp.status_code == 403, resp.json()
    assert resp.json() == {"detail": "Учетные данные не были предоставлены."}


def test_put_ok(drf_client, authenticate, user, user_goals):
    data = {
        "user": user.id,
        "weight_goal": 10,
        "goal_type": "local",
        "target_date": datetime.date.today(),
    }

    with authenticate(user):
        resp = drf_client.put(url(user_goals.id), data=data)

    assert resp.status_code == 200, resp.json()
    assert resp.json() == {
        "user": user.id,
        "weight_goal": 10,
        "goal_type": "local",
        "target_date": str(datetime.date.today()),
    }


def test_put_not_valid_user_id(drf_client, authenticate, user, user_goals):
    data = {
        "user": 10,
        "weight_goal": 10,
        "goal_type": "local",
        "target_date": datetime.date.today(),
    }

    with authenticate(user):
        resp = drf_client.put(url(user_goals.id), data=data)

    assert resp.status_code == 400, resp.json()
    assert resp.json() == {
        "user": [
            'Недопустимый первичный ключ "10" - объект не существует.',
        ]
    }


def test_put_another_user_id(drf_client, authenticate, user, user_2, user_goals):
    data = {
        "user": user_2.id,
        "weight_goal": 10,
        "goal_type": "local",
        "target_date": datetime.date.today(),
    }

    with authenticate(user):
        resp = drf_client.put(url(user_goals.id), data=data)

    assert resp.status_code == 403, resp.json()
    assert resp.json() == {
        "detail": "У вас недостаточно прав для выполнения данного действия.",
    }
