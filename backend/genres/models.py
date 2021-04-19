from django.db import models

class Genre(models.Model):
    genre = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return f"{self.genre}"
