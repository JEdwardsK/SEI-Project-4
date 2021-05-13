import React from 'react'

const BookCard3d = ({ book }) => {

  const { title, author, cover_image: coverImage } = book

  return (
    <>
      <main>

        <div className="book-card__cover">
          <div className="book-card__book">
            <div className="book-card__book-front">
              <img className="book-card__img" src={coverImage} alt={`the cover for ${title}, by ${author}`}/>
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
