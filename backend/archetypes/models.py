from django.db import models

class Archetype(models.Model):
    archetype = models.CharField(max_length= 50)

    def __str_(self):
        return f"{self.archetype}"