from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedGenreSerializer
from .models import Genre

class GenreListView(APIView):
    def get(self, _request):
        genres = Genre.objects.all()
        serialised_genres = PopulatedGenreSerializer(genres, many = True)

        return Response(serialised_genres.data, status = status.HTTP_200_OK)
