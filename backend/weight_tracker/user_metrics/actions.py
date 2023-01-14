from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied
from weight_tracker.models import UserMetrics


class UserMetricsCreateUpdateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = UserMetrics
        fields = (
            "user",
            "weight",
            "waist_circumference",
            "measurement_date",
        )

    def validate(self, attrs):
        request_user = self.context["request"].user
        user = attrs["user"]

        if request_user != user:
            raise PermissionDenied

        return attrs
