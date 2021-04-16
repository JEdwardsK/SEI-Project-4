import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Search = () => {

  const [allBooks, setAllBooks] = useState(null)

  useEffect (() => {
    const getData = async () => {
      const { data } = await axios.get('api/books/')
      setAllBooks(data)
    }
    getData()
  },[])

  if (!allBooks) return null

  let validBooksSearchArray = []

  // these are from the book search form data, replace accordingly
  let formTitle, formAuthor, formIsFilm, formSearchPhrases, formGenres, formFirstName, formLastName, formIsSeries

  allBooks.forEach(book => {
    let matchCount = 0
    const { title, author, is_made_into_film, is_made_into_series, story_overview, genre: genres, supporting_characters} = book
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

    //? check data structure before use main_antagonist
    //? check data structure before use main_protagonist

    // make sure the for data produces an array of first names and last names. each character checks against the first and last name arrays
    supporting_characters.forEach(char => {
      if(formFirstName.includes(char.first_name)) matchCount++
      if(formLastName.includes(char.last_name)) matchCount++
    })

    // after checking all fields, if the match count is greater than 0, the search has found at least one match. We want to return the books that have matched something
    if (matchCount > 0) {
      validBooksSearchArray.push(book, matchCount)
    }
  })

  return (


    <div>

    </div>
  )
}

export default Search
