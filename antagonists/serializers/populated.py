from .common import AntagonistSerializer
from books.serializers.common import BookSerializer
from archetypes.serializers.common import ArchetypeSerializer

class PopulatedAntagonistSerializer(AntagonistSerializer):
    books = BookSerializer(many=True)
    character_archetypes = ArchetypeSerializer(many=True)
