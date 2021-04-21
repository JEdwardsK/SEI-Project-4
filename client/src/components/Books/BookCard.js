/*eslint-disable camelcase, no-unused-vars */
import React from 'react'

const BookCard = ( { title, author, cover_image, genre, id, is_made_into_film, is_made_into_series, page_count,published_by, pub_date, reviews, story_overview, supporting_characters, ISBN  } ) => {
  console.log(genre)
  console.log(supporting_characters)
  console.log(reviews)
  return (
    <div>
      <h1>
        Title: {title}
      </h1>
      <h1>
        Author: {author}
      </h1>
      <h1>
        Genre:
        {genre.map(item => {
          return (
            <div className="genre" key={item.id}>
              {item.genre}
            </div>
          )
        })}
      </h1>
      <h1>
        ISBN: {ISBN}
      </h1>
      <h1>
        Published: {pub_date} by {published_by}
      </h1>
      <img src={cover_image} alt='Book Cover'></img>

    </div>
  )
}

export default BookCard
