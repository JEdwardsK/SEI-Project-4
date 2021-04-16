from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedAntagonistSerializer

from .models import Antagonist

class AntagonistListView(APIView):
    def get(self, _request):
        antagonists = Antagonist.objects.all()
        serialised_antagonists = PopulatedAntagonistSerializer(antagonists, many=True)

        return Response(serialised_antagonists.data, status = status.HTTP_200_OK)

