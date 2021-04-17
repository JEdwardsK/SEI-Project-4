import React, { useState, useEffect } from 'react'
import BookCard from './BookCard'
import axios from 'axios'

export const BookIndex = () => {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/books/')
      setBooks(data)
    }
    getData()
  }, [])

  if(!books) return (
    <div>Loading, please wait</div>
  )

  return (
    <>
      { books.map( book => {
                return (
                  <div key = {book.id} >
                    <BookCard { ...book } />
                  </div>
                )
              })}
    </>
  )
}
export default BookIndex