import React from 'react'
import { Link } from 'react-router-dom'
const BooksCarousel = ( { books } ) => {

  return (

    <ul className='list-inline'>
      {books.map(book => {
        const { title, author, cover_image: coverImage, id } = book

        return (
          <li className='book' key={id}>
            <Link to={`/books/${id}`}>
              <img src={coverImage} alt={`the cover for ${title}, by ${author}`} />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default BooksCarousel
