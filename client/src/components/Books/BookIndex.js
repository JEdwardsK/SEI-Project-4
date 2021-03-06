import React, { useState, useEffect } from 'react'
import BooksCarousel from './BooksCarousel'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { setColourByNation } from '../../helpers/helperFunctions'


export const BookIndex = () => {
  const [books, setBooks] = useState(null)



  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/books/')
      setBooks(data)
    }
    getData()
    setColourByNation()

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
      <ul className="books-index-container background">
        <BooksCarousel books={books} />
      </ul>
    </>
  )
}
export default BookIndex