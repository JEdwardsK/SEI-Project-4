from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=50)
    author =models.CharField(max_length=50)
    cover_image =models.CharField(max_length=50)
    ISBN =models.CharField(max_length=50)
    is_made_into_film = models.BooleanField('Has the book been made into a film?', default=False)
    is_made_into_series = models.BooleanField('Has the book been made into a tv series?', default=False)
    story_overview = models.TextField(max_length= 400, null=True)
    page_count = models.IntegerField(default= 0)
    published_by =models.CharField(max_length=50)
    pub_date = models.DateField('date published', null=True)


    # RELATIONSHIPS - MANY2MANY
    # protagonist_character =
    # antagonist_character =
    # supporting_characters =
    # book_contributor =
    # genre =
    # RELATIONSHIPS - MANY2ONE


    # RELATIONSHIPS - ONE2MANY
    # book_creator =

    def __str__(self):
        return f"{self.title}, by {self.author}."


