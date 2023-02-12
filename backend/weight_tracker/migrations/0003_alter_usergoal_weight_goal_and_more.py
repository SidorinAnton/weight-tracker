# Generated by Django 4.1.5 on 2023-02-12 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("weight_tracker", "0002_usergoal_goal_type_alter_usergoal_target_date_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="usergoal",
            name="weight_goal",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=12, verbose_name="Ожидаемый вес (кг)"),
        ),
        migrations.AlterField(
            model_name="usermetrics",
            name="waist_circumference",
            field=models.DecimalField(
                blank=True, decimal_places=2, default=None, max_digits=12, null=True, verbose_name="Обхват талии"
            ),
        ),
        migrations.AlterField(
            model_name="usermetrics",
            name="weight",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=12, verbose_name="Вес (кг)"),
        ),
    ]