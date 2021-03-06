# Generated by Django 3.2 on 2021-04-21 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('genres', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('author', models.CharField(max_length=50)),
                ('cover_image', models.CharField(max_length=200, null=True)),
                ('ISBN', models.CharField(max_length=50)),
                ('is_made_into_film', models.BooleanField(default=False, verbose_name='Has the book been made into a film?')),
                ('is_made_into_series', models.BooleanField(default=False, verbose_name='Has the book been made into a tv series?')),
                ('story_overview', models.TextField(max_length=2000, null=True)),
                ('page_count', models.IntegerField(default=0)),
                ('published_by', models.CharField(max_length=50)),
                ('pub_date', models.DateField(null=True, verbose_name='date published')),
                ('genre', models.ManyToManyField(related_name='books', to='genres.Genre')),
            ],
        ),
    ]
