import pytest
from django.urls import reverse

pytestmark = [
    pytest.mark.django_db,
]


def url(user_goal_id):
    return reverse("weight_tracker:user-goals-detail", args=(user_goal_id,))


def test_delete_not_authenticated(drf_client, user_goals):
    resp = drf_client.delete(url(1))
    assert resp.status_code == 403, resp.json()
    assert resp.json() == {"detail": "Учетные данные не были предоставлены."}


def test_delete_ok(drf_client, authenticate, user, user_goals):
    with authenticate(user):
        resp = drf_client.delete(url(user_goals.id))

    assert resp.status_code == 204


def test_delete_not_valid_user_goal_id(drf_client, authenticate, user, user_goals):
    with authenticate(user):
        resp = drf_client.delete(url(1))

    assert resp.status_code == 404, resp.json()
    assert resp.json() == {"detail": "Страница не найдена."}


def test_delete_another_users_user_goal(drf_client, authenticate, user, user_2, user_goals):
    with authenticate(user_2):
        resp = drf_client.delete(url(user.goals.first().id))

    assert resp.status_code == 404, resp.json()
    assert resp.json() == {"detail": "Страница не найдена."}
