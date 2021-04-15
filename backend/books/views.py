from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Book
from .serializers.common import BookSerializer
class BookListView(APIView):
    '''Request routes for all Books (INDEX page).'''

    def get(self, _request):
        meals = Book.objects.all() # return everything from the db
        serialized_books = BookSerializer(meals, many=True) # convert the data
        return Response(serialized_books.data, status=status.HTTP_200_OK)

class BookDetailView(APIView):
    '''Request routes for individual Books (SHOW page).'''

    def get(self, _request, pk):
        try:
            book = Book.objects.get(pk = pk)
        except Book.DoesNotExist:
            raise NotFound(detail = "Cannot find the requested book")
        serialised_book = BookSerializer(book)
        return Response(serialised_book.data, status= status.HTTP_200_OK)

    def put(self, request, pk):
        '''check to find the book in the database, if not found raise error'''
        try:
            book = Book.objects.get(pk = pk)
        except Book.DoesNotExist:
            raise NotFound(detail = "Cannot find the requested book")
        # update book in database with request body
        updated_book = BookSerializer(book, data = request.data)
        if updated_book.is_valid():
            updated_book.save()
            return Response(updated_book.data, status = status.HTTP_202_ACCEPTED)
        return Response(updated_book.errors, status = status.HTTP_422_UNPROCESSABLE_ENTITY)
