from django.db import models

class Archetype(models.Model):
    archetype = models.CharField(max_length= 50, unique=True)

    def __str__(self):
        return f"{self.archetype}"
