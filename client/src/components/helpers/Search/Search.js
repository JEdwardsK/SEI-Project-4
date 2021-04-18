/*eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Search = () => {

  const [allBooks, setAllBooks] = useState(null)
  const [allGenres, setAllGenres] = useState(null)
  const [formData, setFormData] = useState({
    formTitle: '',
    formAuthor: '',
    formIsFilm: '',
    formSearchPhrases: '',
    formGenres: '',
    formFirstName: '',
    formLastName: '',
    formIsSeries: '',
  })
  const [searchResults, setSearchResults] = useState([])

  useEffect (() => {
    const getBooks = async () => {
      const { data } = await axios.get('api/books/')
      setAllBooks(data)
    }
    getBooks()
  },[])
  useEffect (() => {
    const getGenres = async () => {
      const { data } = await axios.get('api/genres/')
      setAllGenres(data)
    }
    getGenres()
  },[])




  const handleChange = (event) => {
    console.log ('event type>>', typeof(event.target.value))
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
    // console.log('🚀 ~ file: Search.js ~ line 74 ~ handleChange ~ newFormData', formData)
  }

  const {formTitle, formAuthor, formIsFilm, formSearchPhrases, formGenres, formFirstName, formLastName, formIsSeries} = formData

  let validBooksSearchArray = []

  const handleSubmit = (event) => {
    event.preventDefault()
    allBooks.forEach(book => {
      let matchCount = 0
      const { title, author, is_made_into_film, is_made_into_series, story_overview, genre: genres, supporting_characters} = book
      if (formTitle.toLowerCase() !== "" && title.includes(formTitle.toLowerCase())) matchCount++
      if (formAuthor.toLowerCase() !== "" && author.includes(formAuthor.toLowerCase())) matchCount++
      if (formIsFilm !== "" && is_made_into_film.toString() === formIsFilm) matchCount++
      if (formIsSeries !== "" && is_made_into_series === formIsSeries) matchCount++
      // console.log(genres, story_overview)
      // formSearchPhrases.forEach(searchPhrase => {
      // if (story_overview.includes(searchPhrase)) matchCount++
      // })
      // genre is an array of objects with the key genres. so to get to genres you need to genre.
      // formGenres.forEach(formGenre => {
      // if (genres.includes(formGenre)) matchCount++
      // }) finesse

      //? check data structure before use main_antagonist
      //? check data structure before use main_protagonist

      // make sure the for data produces an array of first names and last names. each character checks against the first and last name arrays
      // supporting_characters.forEach(char => {
      //   if(formFirstName.includes(char.first_name)) matchCount++
      //   if(formLastName.includes(char.last_name)) matchCount++
      // })

      // after checking all fields, if the match count is greater than 0, the search has found at least one match. We want to return the books that have matched something
      console.log(matchCount)
      if (matchCount > 0) {
        validBooksSearchArray.push({resultBook: book, searchHits: matchCount})
      }
    })
    console.log('🚀 ~ file: Search.js ~ line 69 ~ Search ~ validBooksSearchArray', validBooksSearchArray)
    setSearchResults(validBooksSearchArray)

  }


  if (!allBooks || !allGenres) return null

  return (
    <>
      <section>
        <form className="form search-form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Enter Book Title</label>
          <div><input type="text" className="input" placeholder="enter book title here" name="formTitle" onChange={handleChange}/></div>
        </div>
        <div className="field">
          <label  className="label">Enter Author</label>
          <div><input type="text" className="input" placeholder="enter authors full name" name="formAuthor" onChange={handleChange}/></div>
        </div>
        <div className="field">
          <label className="label">Has it been made into a Film?</label>
          <div><input type="checkbox" value={true} className="input" placeholder="" name="formIsFilm" onChange={handleChange}/></div>
        </div>
        <div className="field">
          <label className="label">Has it been made into a TV Series?</label>
          <div><input type="checkbox" value={true} className="input" placeholder="" name="formIsSeries" onChange={handleChange}/></div>
        </div>
        <div className="field">
          <label className="label"> Search by Keyword (separate each word by comma i.e Mudblood, Dragon, Scar. Do not use punctuation and avoid common words like and the etc.</label>
          <div><input type="text" className="input" placeholder="enter search phrases" name="formSearchPhrases" onChange={handleChange}/></div>
        </div>
        <div className="field">
          <label className="label"> Select Genres</label>
          {allGenres
          .sort((a, b) => {
            const genreA = a.genre.toUpperCase()
            const genreB = b.genre.toUpperCase()

            return genreA < genreB ? -1
            : genreA > genreB ? 1
            : 0
          })
          .map(item => {
            const { genre, id } = item
            return (
              <div className="genre-form-container">
                <div key={id}><input type="checkbox" className="input" name="formGenre" value={genre} onChange={handleChange}/>{genre}</div>
              </div>
            )
          })}
        </div>
        <div className="field">
          <label className="label">Enter Character First Name</label>
          <div><input type="text" className="input" placeholder="" name="formFirstName" onChange={handleChange}/></div>
        </div>
        <div className="field">
          <label className="label">Enter Character Last Name</label>
          <div><input type="text" className="input" placeholder="" name="formLastName" onChange={handleChange}/></div>
        </div>
        <div className="field">
          <div className="control"><button className="button" onClick={handleSubmit}>Search</button></div>
          <div className="control"><button className="button" type="reset">Reset Form</button></div>
          <div className="control"><button className="button">Cancel and Leave</button></div>
        </div>
        </form>

      </section>
        <section>
          <h2>Search Results</h2>
        <ul className="list-inline">
          {console.log('validBooksSearchArray', searchResults)}
          {
            searchResults.map(result => {
              const { searchHits, resultBook } = result
              const { cover_image, id, title, author } = resultBook

              return (
                <>
                  <Link to={`/books/${id}`}>
                  <li className='book'>
                    <img src={cover_image} alt={`the cover for ${title}, by ${author}`} />
                  </li>
                  </Link>
                  <p>search hits: {searchHits}</p>
                </>
              )
            })
          }
        </ul>
      </section>

    </>
  )
}

export default Search
