from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedSupportingCharacterSerializer
from .serializers.common import SupportingCharacterSerializer

from .models import SupportingCharacter

class SupportingCharacterListView(APIView):
    def get(self, _request):
        supporting_characters = SupportingCharacter.objects.all()
        serialised_supporting_characters = PopulatedSupportingCharacterSerializer(supporting_characters, many=True)

        return Response(serialised_supporting_characters.data, status = status.HTTP_200_OK)

    def post(self, request):
        character_to_add = SupportingCharacterSerializer(data=request.data)
        if character_to_add.is_valid():
            character_to_add.save()
            return Response(character_to_add.data, status=status.HTTP_201_CREATED)
        return Response(character_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
