from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedAntagonistSerializer
from .serializers.common import AntagonistSerializer

from .models import Antagonist

class AntagonistListView(APIView):
    def get(self, _request):
        antagonists = Antagonist.objects.all()
        serialised_antagonists = PopulatedAntagonistSerializer(antagonists, many=True)

        return Response(serialised_antagonists.data, status = status.HTTP_200_OK)

    def post(self, request):
        antagonist_to_add = AntagonistSerializer(data=request.data)
        if antagonist_to_add.is_valid():
            antagonist_to_add.save()
            return Response(antagonist_to_add.data, status=status.HTTP_201_CREATED)
        return Response(antagonist_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


