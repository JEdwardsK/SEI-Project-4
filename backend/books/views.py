from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .models import Book
from .serializers.common import BookSerializer
from .serializers.populated import PopulateBookSerializer
class BookListView(APIView):
    '''Request routes for all Books (INDEX page).'''
    permission_classes = (IsAuthenticated,)
    def get(self, _request):
        books = Book.objects.all()
        serialized_books = PopulateBookSerializer(books, many=True)
        return Response(serialized_books.data, status=status.HTTP_200_OK)

    def post(self, request):
        print('request.user>>>>>', request.user)
        request.data["book_creator"] = request.user.username
        book_to_add = BookSerializer(data=request.data)
        if book_to_add.is_valid():
            book_to_add.save()
            return Response(book_to_add.data, status=status.HTTP_201_CREATED)
        return Response(book_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class BookDetailView(APIView):
    '''Request routes for individual Books (SHOW page).'''

    def get(self, _request, pk):
        try:
            book = Book.objects.get(pk = pk)
        except Book.DoesNotExist:
            raise NotFound(detail = "Cannot find the requested book")
        serialised_book = PopulateBookSerializer(book)
        return Response(serialised_book.data, status= status.HTTP_200_OK)

    def put(self, request, pk):
        '''check to find the book in the database, if not found raise error'''
        try:
            book = Book.objects.get(pk = pk)
        except Book.DoesNotExist:
            raise NotFound(detail = "Cannot find the requested book")
        # update book in database with request body
        request.data["book_contributor"] = request.user.id
        updated_book = BookSerializer(book, data = request.data)
        if updated_book.is_valid():
            updated_book.save()
            return Response(updated_book.data, status = status.HTTP_202_ACCEPTED)
        return Response(updated_book.errors, status = status.HTTP_422_UNPROCESSABLE_ENTITY)
