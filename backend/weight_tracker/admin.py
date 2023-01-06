from django.contrib import admin
from weight_tracker.models import UserGoal, UserMetrics


class UserMetricsAdmin(admin.ModelAdmin):
    list_display = ("user", "weight", "waist_circumference", "measurement_date")
    list_filter = ("user__username",)
    search_fields = ("user__id", "user__username", "user__email")
    ordering = ("measurement_date",)


class UserGoalAdmin(admin.ModelAdmin):
    list_display = ("user", "weight_goal", "goal_type", "target_date")
    list_filter = ("user__username", "goal_type")
    search_fields = ("user__id", "user__username", "user__email")
    ordering = ("target_date",)


admin.site.register(UserMetrics, UserMetricsAdmin)
admin.site.register(UserGoal, UserGoalAdmin)
