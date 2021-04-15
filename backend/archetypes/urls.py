from django.urls import path
from .views import ArchetypesListView

urlpatterns = [
    path('', ArchetypesListView.as_view()),
]
