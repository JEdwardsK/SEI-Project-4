from django.urls import path
from .views import BookListView, BookDetailView, SearchBooksView

urlpatterns = [
    path('', BookListView.as_view()),
    path('<int:pk>/', BookDetailView.as_view()),
    path('search/', SearchBooksView.as_view())
]

