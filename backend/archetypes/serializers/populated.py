from .common import ArchetypeSerializer
from supporting_characters.serializers.common import SupportingCharacterSerializer

class PopulatedArchetypeSerializer(ArchetypeSerializer):
    supporting_characters = SupportingCharacterSerializer(many=True)
