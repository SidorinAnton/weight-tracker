from django.contrib.auth.models import User
from rest_framework import serializers
from weight_tracker.models import UserMetrics


class UserMetricsCreateUpdateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.prefetch_related("metrics").all(),
    )

    class Meta:
        model = UserMetrics
        fields = (
            "user",
            "weight",
            "waist_circumference",
            "measurement_date",
        )
