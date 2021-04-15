from rest_framework import serializers
from ..models import Protagonist

class ProtagonistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Protagonist
        fields = '__all__'
