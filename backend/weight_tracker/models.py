from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class UserMetrics(models.Model):
    class Meta:
        verbose_name = "метрика"
        verbose_name_plural = "метрики"

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь", related_name="metrics")
    weight = models.PositiveIntegerField(default=0, verbose_name="Вес (кг)")
    waist_circumference = models.PositiveIntegerField(default=None, null=True, blank=True, verbose_name="Обхват талии")
    measurement_date = models.DateTimeField(default=timezone.now, verbose_name="Дата измерения")

    def __str__(self):
        return f"{self.user} -- W:{self.weight} ({self.measurement_date})"


class UserGoal(models.Model):
    class Meta:
        verbose_name = "цель"
        verbose_name_plural = "цели"

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Пользователь", related_name="goals")
    weight_goal = models.PositiveIntegerField(default=0, verbose_name="Ожидаемый вес (кг)")
    target_date = models.DateTimeField(default=timezone.now, verbose_name="Дата ожидаемого результата")

    def __str__(self):
        return f"{self.user} -- W_goal:{self.weight_goal} ({self.target_date})"
