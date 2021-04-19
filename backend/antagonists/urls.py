from django.urls import path
from .views import AntagonistListView

urlpatterns = [
    path('', AntagonistListView.as_view()),
]
