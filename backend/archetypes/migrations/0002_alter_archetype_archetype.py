# Generated by Django 3.2 on 2021-04-15 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('archetypes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='archetype',
            name='archetype',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
