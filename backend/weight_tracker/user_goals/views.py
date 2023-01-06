from configuration.drf.viewsets import (
    BaseCreateModelViewSet,
    BaseDestroyModelViewSet,
    BaseListModelViewSet,
    BaseUpdateModelViewSet,
)
from rest_framework.permissions import IsAuthenticated
from weight_tracker.models import UserGoal
from weight_tracker.user_goals.actions import UserGoalCreateUpdateSerializer
from weight_tracker.user_goals.entities import UserGoalSerializer


class UserGoalViewSet(BaseListModelViewSet, BaseCreateModelViewSet, BaseUpdateModelViewSet, BaseDestroyModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return {
            "list": UserGoalSerializer,
            "create": UserGoalCreateUpdateSerializer,
            "update": UserGoalCreateUpdateSerializer,
            "partial_update": UserGoalCreateUpdateSerializer,
        }[self.action]

    def get_queryset(self):
        return UserGoal.objects.select_related("user").filter(user=self.request.user).order_by("target_date")
