# Generated by Django 3.2 on 2021-04-22 03:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('antagonists', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='antagonist',
            name='quote',
            field=models.CharField(default='', max_length=50),
        ),
    ]
