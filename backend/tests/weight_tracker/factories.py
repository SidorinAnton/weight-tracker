import factory
from django.contrib.auth.models import User
from factory import fuzzy
from factory.django import DjangoModelFactory


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    username = factory.SelfAttribute("email")
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    email = factory.Faker("email")
    password = factory.LazyFunction(lambda: "admin")


class UserMetricsFactory(DjangoModelFactory):
    class Meta:
        model = "weight_tracker.UserMetrics"

    user = factory.SubFactory(UserFactory)
    weight = factory.LazyFunction(lambda: 75)
    waist_circumference = factory.LazyFunction(lambda: 75)
    measurement_date = factory.Faker("date")


class UserGoalFactory(DjangoModelFactory):
    class Meta:
        model = "weight_tracker.UserGoal"

    user = factory.SubFactory(UserFactory)
    weight_goal = factory.LazyFunction(lambda: 75)
    goal_type = fuzzy.FuzzyChoice(("local", "global"))
    target_date = factory.Faker("date")
