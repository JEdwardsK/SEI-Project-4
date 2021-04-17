import React from 'react'

const BooksCarousel = ( {title, author, cover_image, genre, id, is_made_into_film, is_made_into_series, page_count,published_by, pub_date, reviews, story_overview, supporting_characters, ISBN  }) => {
  return (

    <li class='book'>
      <img src="http://37signals.com/images/remote/remote_front.png" alt={`the cover for ${title}, by ${author}`} />
    </li>
  )
}

export default BooksCarousel
