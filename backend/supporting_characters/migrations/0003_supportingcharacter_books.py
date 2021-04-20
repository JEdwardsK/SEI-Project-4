# Generated by Django 3.2 on 2021-04-20 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0013_auto_20210420_1733'),
        ('supporting_characters', '0002_alter_supportingcharacter_relationship_to_protagonist'),
    ]

    operations = [
        migrations.AddField(
            model_name='supportingcharacter',
            name='books',
            field=models.ManyToManyField(related_name='supporting_characters', to='books.Book'),
        ),
    ]
