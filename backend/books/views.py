from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Book
from .serializers.common import BookSerializer
class BookListView(APIView):
    def get(self, _request):
        meals = Book.objects.all() # return everything from the db
        serialized_books = BookSerializer(meals, many=True) # convert the data
        return Response(serialized_books.data, status=status.HTTP_200_OK)