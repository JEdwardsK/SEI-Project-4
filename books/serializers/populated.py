from reviews.serializers.common import ReviewSerializer
from ..serializers.common import BookSerializer
from supporting_characters.serializers.common import SupportingCharacterSerializer
from protagonists.serializers.common import ProtagonistSerializer
from antagonists.serializers.common import AntagonistSerializer
from genres.serializers.common import GenreSerializer

class PopulateBookSerializer(BookSerializer):

    reviews = ReviewSerializer(many=True)
    supporting_characters = SupportingCharacterSerializer(many=True)
    main_protagonist = ProtagonistSerializer(many=True)
    main_antagonist = AntagonistSerializer(many=True)
    genre = GenreSerializer(many=True)