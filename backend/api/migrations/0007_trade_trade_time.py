# Generated by Django 3.0.8 on 2020-08-04 00:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_trade_trade_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='trade',
            name='trade_time',
            field=models.CharField(blank=True, max_length=40, null=True, verbose_name='trade_time'),
        ),
    ]
