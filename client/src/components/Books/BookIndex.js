import React, { useState, useEffect } from 'react'
// import BookCard from './BookCard'
// import BooksCarousel from './BooksCarousel'
import axios from 'axios'
import BookCard3d from './BookCard3d'

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
    <div>Loading, please wait</div>
  )

  return (
    <>
      { books.map( book => {
        return (
          <div key = {book.id} >
            <BookCard3d  book={book} />
          </div>
        )
      })}
      {/* <BooksCarousel books={books} /> */}
    </>
  )
}
export default BookIndex