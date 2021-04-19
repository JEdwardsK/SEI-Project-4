from rest_framework import serializers
from ..models import Antagonist

class AntagonistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Antagonist
        fields = '__all__'
