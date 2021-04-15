from django.db import models

class Genre(models.Model):
    genre = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.genre}"
