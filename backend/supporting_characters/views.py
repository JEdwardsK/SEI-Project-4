from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.common import SupportingCharacterSerializer
from .models import SupportingCharacter

class SupportingCharacterListView(APIView):
    def get(self, _request):
        supporting_characters = SupportingCharacter.objects.all()
        serialised_supporting_characters = SupportingCharacterSerializer(supporting_characters, many=True)

        return Response(serialised_supporting_characters.data, status = status.HTTP_200_OK)
