from django.db import models

class SupportingCharacter(models.Model):

    class Relationship(models.TextChoices):
        NO_INPUT = 'None Input', ('None Input')
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
    last_name = models.CharField(max_length= 50)
    relationship_to_protagonist = models.CharField(
        max_length=50,
        choices=Relationship.choices,
        default=Relationship.NO_INPUT
        )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"