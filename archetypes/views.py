from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedArchetypeSerializer
from .models import Archetype

class ArchetypesListView(APIView):
    def get(self, _request):
        archetypes = Archetype.objects.all()
        serialised_archetypes = PopulatedArchetypeSerializer(archetypes, many = True)

        return Response(serialised_archetypes.data, status = status.HTTP_200_OK)
