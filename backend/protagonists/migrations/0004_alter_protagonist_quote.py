# Generated by Django 3.2 on 2021-04-22 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('protagonists', '0003_alter_protagonist_quote'),
    ]

    operations = [
        migrations.AlterField(
            model_name='protagonist',
            name='quote',
            field=models.CharField(blank=True, default='', max_length=500),
        ),
    ]
