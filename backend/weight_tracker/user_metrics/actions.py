from django.db import transaction
from rest_framework import serializers
from weight_tracker.models import UserMetrics
from weight_tracker.user_metrics.entities import UserMetricsSerializer


class UserMetricsCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMetrics
        fields = (
            "weight",
            "waist_circumference",
            "measurement_date",
        )

    def to_representation(self, instance):
        return UserMetricsSerializer().to_representation(instance)

    def create(self, validated_data):
        data = {**validated_data, "user": self.context["request"].user}

        with transaction.atomic():
            user_metrics = UserMetrics(**data)
            user_metrics.save()

        return user_metrics
