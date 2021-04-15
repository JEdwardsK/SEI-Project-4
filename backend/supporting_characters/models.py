from django.db import models

class SupportingCharacter(models.Model):

    class Relationship(models.TextChoices):
        NO_INPUT = 'N/A', ('None Input')
        FAMILY_MEMBER = 'FM', ('Family Member')
        RIVAL = 'R', ('Rival')
        LOVER = 'L', ('Love Interest')
        FRIEND = 'F', ('Friend')
        COMPANION = 'C', ('Companion')
        ALLY = 'A', ('Ally')
        ENEMY = 'E', ('Enemy')
        SERVANT = 'SER', ('Servant')

    first_name = models.CharField(max_length= 50)
    last_name = models.CharField(max_length= 50)
    relationship_to_protagonist = models.CharField(
        max_length=10,
        choices=Relationship.choices,
        default=Relationship.NO_INPUT
        )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"