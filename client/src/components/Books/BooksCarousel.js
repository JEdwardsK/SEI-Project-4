import React from 'react'
import { Link } from 'react-router-dom'
const BooksCarousel = ( { books } ) => {

  return (


    <>
      {books.map(book => {
        const { title, author, cover_image: coverImage, id } = book

        return (
          <Link className="book-link" key={id} to={`/books/${id}`}>
            <li className='book' >
              <img src={coverImage} alt={`the cover for ${title}, by ${author}`} />
            </li>
          </Link>
        )
      })}
    </>

  )


}

export default BooksCarousel
