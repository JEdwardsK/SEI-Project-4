from .common import ProtagonistSerializer
from books.serializers.common import BookSerializer
from archetypes.serializers.common import ArchetypeSerializer

class PopulatedProtagonistSerializer(ProtagonistSerializer):
    books = BookSerializer(many=True)
    character_archetypes = ArchetypeSerializer(many=True)
