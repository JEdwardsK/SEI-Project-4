from rest_framework import serializers
from ..models import SupportingCharacter

class SupportingCharacterSerializer(serializers.ModelSerializer):

    class Meta:
        model = SupportingCharacter
        fields = '__all__'
