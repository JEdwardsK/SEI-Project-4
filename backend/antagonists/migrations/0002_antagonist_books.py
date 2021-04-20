# Generated by Django 3.2 on 2021-04-20 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0013_auto_20210420_1733'),
        ('antagonists', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='antagonist',
            name='books',
            field=models.ManyToManyField(related_name='main_antagonist', to='books.Book'),
        ),
    ]
