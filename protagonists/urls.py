from django.urls import path
from .views import ProtagonistListView, ProtagonistDetailView

urlpatterns = [
    path('', ProtagonistListView.as_view()),
    path('<int:pk>/', ProtagonistListView.as_view()),
]
