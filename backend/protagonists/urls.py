from django.urls import path
from .views import ProtagonistListView

urlpatterns = [
    path('', ProtagonistListView.as_view()),
]
