import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BooksCarousel from '../Books/BooksCarousel'

const GenreIndex = () => {

  const [allGenres, setAllGenres] = useState(null)


  useEffect(() => {
    const getGenres = async () => {
      const { data } = await axios.get('api/genres')
      setAllGenres(data)
    }
    getGenres()
  },[])

  if (!allGenres) return null
  return (
    <>
      {allGenres.map(item => {
        const {id, books, genre } = item
        return (
          <>
          <div className="genre" key={id}>
            <h3>{genre}</h3>
            <div className="genre-books">
              <BooksCarousel books={books}/>
            </div>
          </div>
          </>
        )
      })}
    </>
  )
}

export default GenreIndex
