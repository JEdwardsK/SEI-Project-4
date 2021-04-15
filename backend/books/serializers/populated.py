from reviews.serializers.common import ReviewSerializer
from ..serializers.common import BookSerializer


class PopulateBookSerializer(BookSerializer):

    reviews = ReviewSerializer(many=True)