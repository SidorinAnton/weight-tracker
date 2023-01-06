from django.contrib.auth.models import User
from rest_framework import serializers
from weight_tracker.models import UserGoal


class UserGoalCreateUpdateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.prefetch_related("goals").all(),
    )

    class Meta:
        model = UserGoal
        fields = (
            "user",
            "weight_goal",
            "goal_type",
            "target_date",
        )
