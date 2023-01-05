from rest_framework import serializers
from weight_tracker.models import UserMetrics


class UserMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMetrics
        fields = read_only_fields = (
            "id",
            "user_id",
            "weight",
            "waist_circumference",
            "measurement_date",
        )
