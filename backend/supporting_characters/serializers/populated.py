from .common import SupportingCharacterSerializer
from books.serializers.common import BookSerializer

class PopulatedSupportingCharacterSerializer(SupportingCharacterSerializer):
    books = BookSerializer(many=True)
