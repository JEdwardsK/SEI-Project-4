# Generated by Django 3.2 on 2021-04-15 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('supporting_characters', '0002_alter_supportingcharacter_relationship_to_protagonist'),
    ]

    operations = [
        migrations.AddField(
            model_name='supportingcharacter',
            name='character_bio',
            field=models.TextField(default='test', max_length=700),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='supportingcharacter',
            name='relationship_to_protagonist',
            field=models.CharField(choices=[('None Input', 'None Input'), ('n/a', 'Not Applicable'), ('Family Member', 'Family Member'), ('Rival', 'Rival'), ('Love Interest', 'Love Interest'), ('Friend', 'Friend'), ('Companion', 'Companion'), ('Ally', 'Ally'), ('Enemy', 'Enemy'), ('Servant', 'Servant'), ('Mentor', 'Mentor')], default='None Input', max_length=50),
        ),
    ]