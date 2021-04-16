import React, { useState, useEffect } from 'react'
import BookCard from './BookCard'
import axios from 'axios'

export const BookIndex = () => {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/books')
      setBooks(response.data)
    }
    console.log('The Book List', books)
    getData()
  }, [])

  if(!books) return null

  return (
    <>
      { books.map( book => {
                return <div key = {book.id} >
                  <BookCard { ...book } />
                </div> 
              })}
    </>
  )
}
export default BookIndex