# from django.contrib.postgres.fields import ArrayField
from django.db import models

class SupportingCharacter(models.Model):

    class Relationship(models.TextChoices):
        NO_INPUT = '', ('None')
        NOT_APPLICABLE = 'n/a', ('Not Applicable')
        FAMILY_MEMBER = 'Family Member', ('Family Member')
        RIVAL = 'Rival', ('Rival')
        LOVER = 'Love Interest', ('Love Interest')
        FRIEND = 'Friend', ('Friend')
        COMPANION = 'Companion', ('Companion')
        ALLY = 'Ally', ('Ally')
        ENEMY = 'Enemy', ('Enemy')
        SERVANT = 'Servant', ('Servant')
        MENTOR = 'Mentor', ('Mentor')


    first_name = models.CharField(max_length= 50)
    last_name = models.CharField(max_length= 50, default="", blank=True)    # aliases = models.ArrayField(models.CharField(max_length=50))
    relationship_to_protagonist = models.CharField(
        max_length=50,
        choices=Relationship.choices,
        default=Relationship.NO_INPUT
        )
    character_bio = models.TextField(max_length=700)
    character_archetypes = models.ManyToManyField('archetypes.Archetype', related_name="supporting_characters")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"