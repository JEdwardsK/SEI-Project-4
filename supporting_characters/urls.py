from django.urls import path
from .views import SupportingCharacterListView

urlpatterns = [
    path('', SupportingCharacterListView.as_view()),
]
