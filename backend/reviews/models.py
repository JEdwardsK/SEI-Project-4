from django.db import models



class Review(models.Model):
    review_text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    book = models.ForeignKey(
        "books.Book",
        related_name="reviews",
        # Users will not be able to delete the books after posting so this cascade is not used,
        # however keep in if decide to have an admin user to with delete privileges.
        on_delete=models.CASCADE
    )
    review_owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="reviews",
        on_delete= models.CASCADE
)
    def __str__(self):
        return f"Review of {self.book}"
