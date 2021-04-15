# from django.contrib.postgres.fields import ArrayField
from django.db import models

class SupportingCharacter(models.Model):

    first_name = models.CharField(max_length= 50)
    last_name = models.CharField(max_length= 50)
    # aliases = models.ArrayField(models.CharField(max_length=50))
    character_bio = models.TextField(max_length=700)
    character_archetypes = models.ManyToManyField('archetypes.Archetype', related_name="supporting_characters")

    def __str__(self):
        return f" the protagonist {self.first_name} {self.last_name}"