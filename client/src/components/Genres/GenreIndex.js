/*eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BooksCarousel from '../Books/BooksCarousel'

const GenreIndex = () => {
  const [allGenres, setAllGenres] = useState(null)
  const [showBooks, setShowBooks] = useState(false)

  useEffect(() => {
    const getGenres = async () => {
      const { data } = await axios.get('api/genres')
      setAllGenres(data)
    }
    getGenres()
  },[])

  // const toggleShowBooks = () => {
  //   setShowBooks(!showBooks)
  // }
  //!use bootstraps accordion for collapsing the genres!!
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

// { showBooks &&
//   <ul className="book">
//   {books.map(item => {
//     const { title, author } = item
//     <li className='book'>
//       <img src="http://37signals.com/images/remote/remote_front.png" alt={`the cover for ${title}, by ${author}`}/>
//     </li>
//   }
//     )}
//   </ul>
// }
