from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied
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

    def validate(self, attrs):
        request_user = self.context["request"].user
        user = attrs["user"]

        if request_user != user:
            raise PermissionDenied

        return attrs
