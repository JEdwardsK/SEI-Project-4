# Generated by Django 3.2 on 2021-04-22 03:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('protagonists', '0002_protagonist_quote'),
    ]

    operations = [
        migrations.AlterField(
            model_name='protagonist',
            name='quote',
            field=models.CharField(default='', max_length=500),
        ),
    ]
