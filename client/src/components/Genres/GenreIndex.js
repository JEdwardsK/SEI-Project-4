
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { setColourByNation } from '../../helpers/helperFunctions'
import BooksCarousel from '../books/BooksCarousel'

const GenreIndex = () => {
  const [allGenres, setAllGenres] = useState(null)

  useEffect(() => {
    setColourByNation()
    const getGenres = async () => {
      const { data } = await axios.get('api/genres/')
      setAllGenres(data)
    }
    getGenres()
  },[])

  if (!allGenres) return null
  return (
    <>
      {allGenres
        .sort((a, b) => {
          const genreA = a.genre.toUpperCase()
          const genreB = b.genre.toUpperCase()

          return genreA < genreB ? -1
            : genreA > genreB ? 1
              : 0
        })
        .filter(item => item.books.length > 0)
        .map(item => {
          const { id, books, genre } = item
          return (
            <>
              <div className="genre background" key={id}>
                <p className='character-header'>{genre}</p>
                <div className="books-index-container background">
                  <BooksCarousel books={ books } />
                </div>
              </div>
            </>
          )
        })}
    </>
  )
}

export default GenreIndex