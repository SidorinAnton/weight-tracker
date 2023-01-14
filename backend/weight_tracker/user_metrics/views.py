from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from weight_tracker.models import UserMetrics
from weight_tracker.user_metrics.actions import UserMetricsCreateSerializer
from weight_tracker.user_metrics.entities import UserMetricsSerializer


class UserMetricsViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return {
            "list": UserMetricsSerializer,
            "create": UserMetricsCreateSerializer,
        }[self.action]

    def get_queryset(self):
        return UserMetrics.objects.select_related("user").filter(user=self.request.user).order_by("measurement_date")

    @extend_schema(responses=UserMetricsSerializer)
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @extend_schema(
        parameters=[OpenApiParameter("id", OpenApiTypes.INT, OpenApiParameter.PATH)],
        request=None,
        responses=None,
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
