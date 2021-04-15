from reviews.serializers.common import ReviewSerializer
from ..serializers.common import BookSerializer
from supporting_characters.serializers.common import SupportingCharacterSerializer


class PopulateBookSerializer(BookSerializer):

    reviews = ReviewSerializer(many=True)
    supporting_characters = SupportingCharacterSerializer(many=True)