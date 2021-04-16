import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Search = () => {
  let
  const [allBooks, setAllBooks] = useState(null)

  useEffect (() => {
    const getData = async () => {
      const { data } = await axios.get('api/books/')
      setAllBooks(data)
    }
    getData()
  },[])
  const validBooksSearchArray = []
  allBooks.forEach(book => {
    let matchCount = 0
    const { title, author, is_made_into_film, is_made_into_series, story_overview, genre: genres} = book
    if (title.includes(formTitle)) matchCount++
    if (author.includes(formAuthor)) matchCount++
    if (is_made_into_film === formIsFilm) matchCount++
    if (is_made_into_series === formIsSeries) matchCount++

    formSearchPhrases.forEach(searchPhrase => {
    if (story_overview.includes(searchPhrase)) matchCount++
    })
    // genre is an array of objects with the key genres. so to get to genres you need to genre.
    formGenres.forEach(formGenre => {
    if (genres.includes(formGenre)) matchCount++
    })

  })

  return (


    <div>

    </div>
  )
}

export default Search
