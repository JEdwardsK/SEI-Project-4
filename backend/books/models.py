from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    cover_image = models.CharField(max_length=200, null=True)
    ISBN = models.CharField(max_length=50)
    is_made_into_film = models.BooleanField('Has the book been made into a film?', default=False)
    is_made_into_series = models.BooleanField('Has the book been made into a tv series?', default=False)
    story_overview = models.TextField(max_length= 2000, null=True)
    page_count = models.IntegerField(default= 0)
    published_by =models.CharField(max_length=50)
    pub_date = models.DateField('date published', null=True)
    genre = models.ManyToManyField('genres.Genre', related_name="books")
    # supporting_characters = models.ManyToManyField('supporting_characters.SupportingCharacter', related_name="books")
    # main_protagonist = models.ManyToManyField('protagonists.Protagonist', related_name="books")
    # main_antagonist = models.ManyToManyField('antagonists.Antagonist', related_name="books")
    # book_creator = models.ForeignKey(
    #     "jwt_auth.User",
    #     related_name="books_created",
    #     on_delete=models.DO_NOTHING,
    #     default=1
    #     )
    # book_contributor = models.ForeignKey(
    #     "jwt_auth.User",
    #     related_name="books_contributed",
    #     default="",
    #     on_delete=models.DO_NOTHING
    #     )


    def __str__(self):
        return f"{self.title}, by {self.author}."


