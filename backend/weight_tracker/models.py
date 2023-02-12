import datetime

from django.contrib.auth.models import User
from django.db import models


class UserMetrics(models.Model):
    class Meta:
        verbose_name = "метрика"
        verbose_name_plural = "метрики"

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь", related_name="metrics")
    weight = models.DecimalField(default=0, max_digits=12, decimal_places=2, verbose_name="Вес (кг)")
    waist_circumference = models.DecimalField(
        default=None,
        null=True,
        blank=True,
        max_digits=12,
        decimal_places=2,
        verbose_name="Обхват талии",
    )
    measurement_date = models.DateField(default=datetime.date.today, verbose_name="Дата измерения")

    def __str__(self):
        return f"{self.user} -- W:{self.weight} ({self.measurement_date})"


class UserGoal(models.Model):
    class Meta:
        verbose_name = "цель"
        verbose_name_plural = "цели"

    class GoalType(models.TextChoices):
        LOCAL = ("local", "Локальная цель")
        GLOBAL = ("global", "Глобальная цель")

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь", related_name="goals")
    weight_goal = models.DecimalField(default=0, max_digits=12, decimal_places=2, verbose_name="Ожидаемый вес (кг)")
    goal_type = models.CharField(max_length=255, choices=GoalType.choices, verbose_name="Тип цели")
    target_date = models.DateField(
        default=datetime.date.today,
        null=True,
        blank=True,
        verbose_name="Дата ожидаемого результата",
    )

    def __str__(self):
        return f"{self.user} -- W_goal:{self.weight_goal}"
