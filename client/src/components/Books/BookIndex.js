import React, { useState, useEffect } from 'react'
import BooksCarousel from './BooksCarousel'
import axios from 'axios'
// import BookCard3d from './BookCard3d'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

export const BookIndex = () => {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/books/')
      setBooks(data)
    }
    getData()
  }, [])

  if (!books) return (
    <Button disabled>
      <Spinner
        as="span"
        animation="border"
        role="status"
        aria-hidden="true"
      />
    Loading...
    </Button>
  )

  return (
    <>
      {/* { books.map( book => {
        return (
          <div key = {book.id} >
            <BookCard3d  book={book} />
          </div>
        )
      })} */}
      <ul className="books-index-container">
        <BooksCarousel books={books} />
      </ul>
    </>
  )
}
export default BookIndex