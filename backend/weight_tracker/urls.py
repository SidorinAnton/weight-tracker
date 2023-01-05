from django.urls import include, path
from rest_framework.routers import SimpleRouter
from weight_tracker.user_goals.views import UserGoalViewSet
from weight_tracker.user_metrics.views import UserMetricsViewSet

router = SimpleRouter()

router.register("user_metrics", UserMetricsViewSet, basename="user_metrics")
router.register("user_goals", UserGoalViewSet, basename="user_metrics")

urlpatterns = [
    path("api/", include(router.urls)),
]