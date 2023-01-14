from django.db import transaction
from rest_framework import serializers
from weight_tracker.models import UserGoal
from weight_tracker.user_goals.entities import UserGoalSerializer


class UserGoalCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGoal
        fields = (
            "weight_goal",
            "goal_type",
            "target_date",
        )

    def to_representation(self, instance):
        return UserGoalSerializer().to_representation(instance)

    def create(self, validated_data):
        data = {**validated_data, "user": self.context["request"].user}

        with transaction.atomic():
            user_goals = UserGoal(**data)
            user_goals.save()

        return user_goals
