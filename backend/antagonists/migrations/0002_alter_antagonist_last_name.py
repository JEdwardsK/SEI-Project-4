# Generated by Django 3.2 on 2021-04-15 23:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('antagonists', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='antagonist',
            name='last_name',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
    ]
