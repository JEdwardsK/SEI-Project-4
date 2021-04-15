# from django.contrib.postgres.fields import ArrayField
from django.db import models

class Antagonist(models.Model):

    first_name = models.CharField(max_length= 50)
    last_name = models.CharField(max_length= 50)
    # aliases = models.ArrayField(models.CharField(max_length=50))
    character_bio = models.TextField(max_length=700)
    character_archetypes = models.ManyToManyField('archetypes.Archetype', related_name="main_antagonist")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"