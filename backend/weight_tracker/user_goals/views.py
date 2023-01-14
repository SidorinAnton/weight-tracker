from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from weight_tracker.models import UserGoal
from weight_tracker.user_goals.actions import UserGoalCreateSerializer
from weight_tracker.user_goals.entities import UserGoalSerializer


class UserGoalViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return {
            "list": UserGoalSerializer,
            "create": UserGoalCreateSerializer,
        }[self.action]

    def get_queryset(self):
        return UserGoal.objects.select_related("user").filter(user=self.request.user).order_by("target_date")

    @extend_schema(responses=UserGoalSerializer)
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @extend_schema(
        parameters=[OpenApiParameter("id", OpenApiTypes.INT, OpenApiParameter.PATH)],
        request=None,
        responses=None,
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
