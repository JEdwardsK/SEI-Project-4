from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedProtagonistSerializer

from .models import Protagonist

class ProtagonistListView(APIView):
    def get(self, _request):
        protagonists = Protagonist.objects.all()
        serialised_protagonists = PopulatedProtagonistSerializer(protagonists, many=True)

        return Response(serialised_supporting_characters.data, status = status.HTTP_200_OK)
