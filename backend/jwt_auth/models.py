from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    class Nation(models.TextChoices):
        ADMIN = "admin", ("Admin User")
        FIRE = "fire", ("Fire Nation"),
        EARTH = "earth", ("Earth Kingdom"),
        WIND = "air", ("Air Nomads")
        WATER = "water", ("Water Tribe")
    email = models.CharField(max_length=50, unique=True)
    is_first_login = models.BooleanField(default=True)
    date_joined = models.DateField(auto_now_add=True)
    profile_image = models.CharField(max_length=400, default="", blank=True)
    nationality = models.CharField(
        max_length=50,
        choices=Nation.choices,
        )

