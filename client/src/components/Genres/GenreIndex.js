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

  const toggleShowBooks = () => {
    setShowBooks(!showBooks)
  }

  if (!allGenres) return null
  return (
    <>
      {allGenres
      .filter(item => item.books.length > 0)
      .map(item => {
        const {id, books, genre } = item
        return (
          <>
          <div className="genre" key={id}>
            <h3 onClick={toggleShowBooks}>{genre}</h3>
            <ul className='list-inline'>
              {books.map(book => {
                const { title, author, cover_image } = book
                console.log(cover_image)

                return (
                  <li className='book'>
                    <img src={cover_image} alt={`the cover for ${title}, by ${author}`}/>
                  </li>
                )
              })}
            </ul>
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
