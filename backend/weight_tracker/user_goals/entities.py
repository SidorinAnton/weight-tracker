from rest_framework import serializers
from weight_tracker.models import UserGoal


class UserGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGoal
        fields = read_only_fields = (
            "id",
            "user_id",
            "weight_goal",
            "goal_type",
            "target_date",
        )
