import pytest
from django.contrib.auth.models import User
from tests.fixture_utils import get_factory_kwargs
from tests.weight_tracker.factories import UserFactory, UserGoalFactory, UserMetricsFactory
from weight_tracker.models import UserGoal, UserMetrics

__all__ = [
    "user",
    "user_2",
    "staff_user",
    "user_metrics",
    "user_goals",
]


@pytest.fixture
def user(request) -> User:
    kwargs = get_factory_kwargs(request, "user")
    return UserFactory(**kwargs)


@pytest.fixture
def user_2(request) -> User:
    kwargs = get_factory_kwargs(request, "user_2")
    return UserFactory(**kwargs)


@pytest.fixture
def staff_user(request) -> User:
    kwargs = {"is_staff": True, **get_factory_kwargs(request, "staff_user")}
    return UserFactory(**kwargs)


@pytest.fixture
def user_metrics(request, user) -> UserMetrics:
    kwargs = {"user": user, **get_factory_kwargs(request, "user_metrics")}
    return UserMetricsFactory(**kwargs)


@pytest.fixture
def user_goals(request, user) -> UserGoal:
    kwargs = {"user": user, **get_factory_kwargs(request, "user_goals")}
    return UserGoalFactory(**kwargs)
