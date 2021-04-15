from django.db import models

class User(models.Model):
    user_name = models.CharField(max_length=50, unique=True)
    email = models.CharField(max_length=50, unique=True)
    is_first_login = models.BooleanField(default=True)
    date_joined = models.DateField(auto_now_add=True)
    user_searches = models.CharField(max_length=50)
    favourite_books = models.CharField(max_length=50)


    def __str__(self):
        return f"{self.user_name}"

