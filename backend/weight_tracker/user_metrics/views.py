from configuration.drf.viewsets import (
    BaseCreateModelViewSet,
    BaseDestroyModelViewSet,
    BaseListModelViewSet,
    BaseUpdateModelViewSet,
)
from rest_framework.permissions import IsAuthenticated
from weight_tracker.models import UserMetrics
from weight_tracker.user_metrics.actions import UserMetricsCreateUpdateSerializer
from weight_tracker.user_metrics.entities import UserMetricsSerializer


class UserMetricsViewSet(BaseListModelViewSet, BaseCreateModelViewSet, BaseUpdateModelViewSet, BaseDestroyModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return {
            "list": UserMetricsSerializer,
            "create": UserMetricsCreateUpdateSerializer,
            "update": UserMetricsCreateUpdateSerializer,
            "partial_update": UserMetricsCreateUpdateSerializer,
        }[self.action]

    def get_queryset(self):
        return UserMetrics.objects.select_related("user").filter(user=self.request.user).order_by("measurement_date")
