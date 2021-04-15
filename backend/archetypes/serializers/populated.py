from .common import ArchetypeSerializer
from supporting_characters.serializers.common import SupportingCharacterSerializer
from antagonists.serializers.common import AntagonistSerializer
from protagonists.serializers.common import ProtagonistSerializer
class PopulatedArchetypeSerializer(ArchetypeSerializer):
    supporting_characters = SupportingCharacterSerializer(many=True)
    main_antagonist = AntagonistSerializer(many=True)
    main_protagonist = ProtagonistSerializer(many=True)
