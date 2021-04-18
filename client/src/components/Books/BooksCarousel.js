import React from 'react'
import { Link } from 'react-router-dom'
const BooksCarousel = ( { books } ) => {

  return (

    <ul className='list-inline'>
      {books.map(book => {
        const { title, author, cover_image, id } = book

        return (
          <Link to={`/books/${id}`}>
          <li className='book'>
            <img src={cover_image} alt={`the cover for ${title}, by ${author}`} />
          </li>
          </Link>
        )
      })}
    </ul>
  )
}

export default BooksCarousel
