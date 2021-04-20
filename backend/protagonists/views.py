from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedProtagonistSerializer
from .serializers.common import ProtagonistSerializer

from .models import Protagonist

class ProtagonistListView(APIView):
    def get(self, _request):
        protagonists = Protagonist.objects.all()
        serialised_protagonists = PopulatedProtagonistSerializer(protagonists, many=True)

        return Response(serialised_protagonists.data, status = status.HTTP_200_OK)

    def post(self, request):
        protagonist_to_add = ProtagonistSerializer(data=request.data)
        print('🚨 test', request.data)
        if protagonist_to_add.is_valid():
            protagonist_to_add.save()
            return Response(protagonist_to_add.data, status=status.HTTP_201_CREATED)
        return Response(protagonist_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
class ProtagonistDetailView(APIView):
    ''' Request routes for individual Protagonists (SHOW Page).'''
    def get(self, _request, pk):
        console.log('>>>>>>>>>>>>>>>', pk)
        try:
            protagonists = Protagonist.objects.get(pk = pk)
        except Protagonist.DoesNotExist:
            raise NotFound(detail = "Cannot find the requested protagonist")
        serialised_protagonists = PopulatedProtagonistSerializer(book)
        return Response(serialised_protagonists.data, status= status.HTTP_200_OK)
