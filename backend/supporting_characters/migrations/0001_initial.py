# Generated by Django 3.2 on 2021-04-20 11:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('archetypes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SupportingCharacter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(blank=True, default='', max_length=50)),
                ('relationship_to_protagonist', models.CharField(choices=[('', 'None'), ('n/a', 'Not Applicable'), ('Family Member', 'Family Member'), ('Rival', 'Rival'), ('Love Interest', 'Love Interest'), ('Friend', 'Friend'), ('Companion', 'Companion'), ('Ally', 'Ally'), ('Enemy', 'Enemy'), ('Servant', 'Servant'), ('Mentor', 'Mentor')], default='', max_length=50)),
                ('character_bio', models.TextField(max_length=700)),
                ('character_archetypes', models.ManyToManyField(related_name='supporting_characters', to='archetypes.Archetype')),
            ],
        ),
    ]
