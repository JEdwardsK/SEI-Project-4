import React from 'react'
import { Link } from 'react-router-dom'

const BookCard3d = ({ book }) => {

  const { title, author, cover_image: coverImage, id } = book

  return (
    <>
      <main>

        <div className="book-card__cover">
          <div className="book-card__book">
            <div className="book-card__book-front">
              <Link to={`/book/${id}`}><img className="book-card__img" src={coverImage} alt={`the cover for ${title}, by ${author}`}/></Link>
            </div>
            <div className="book-card__book-back"></div>
            <div className="book-card__book-side"></div>
          </div>
        </div>

      </main>
    </>
  )
}

export default BookCard3d
