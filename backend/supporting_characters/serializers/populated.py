from .common import SupportingCharacterSerializer
from books.serializers.common import BookSerializer
from archetypes.serializers.common import ArchetypeSerializer

class PopulatedSupportingCharacterSerializer(SupportingCharacterSerializer):
    books = BookSerializer(many=True)
    archetypes = ArchetypeSerializer(many=True)
