/*eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'


const Search = () => {

  const [allBooks, setAllBooks] = useState(null)
  const [allGenres, setAllGenres] = useState(null)
  const [formData, setFormData] = useState({
    formTitle: '',
    formAuthor: '',
    formIsFilm: '',
    formSearchPhrases: '',
    formGenres: [],
    formFirstName: '',
    formLastName: '',
    formIsSeries: '',
  })
  const [searchResults, setSearchResults] = useState([])
  const [genreValues, setGenreValues] = useState([])

  useEffect(() => {
    const getBooks = async () => {
      const { data } = await axios.get('api/books/')
      setAllBooks(data)
    }
    getBooks()
  },[])
  useEffect(() => {
    const getGenres = async () => {
      const { data } = await axios.get('api/genres/')
      setAllGenres(data)
    }
    getGenres()
  },[])




  const handleChange = (event) => {
    console.log('event type>>', (event.target.value))
    const genrePicks = []
    event.target.type === 'checkbox' && genrePicks.push(event.target.value)
    setGenreValues(genrePicks)
    const value = event.target.type === 'checkbox'
      ? genreValues
      : event.target.value
    const newFormData = { ...formData, [event.target.name]: value }
    setFormData(newFormData)
    console.log('🚀 ~ file: Search.js ~ line 74 ~ handleChange ~ newFormData', formData)
  }

  const { formTitle, formAuthor, formIsFilm, formSearchPhrases, formGenres, formFirstName, formLastName, formIsSeries } = formData

  const validBooksSearchArray = []

  const handleSubmit = (event) => {
    event.preventDefault()
    allBooks.forEach(book => {
      let matchCount = 0
      const { title, author, is_made_into_film: isFilm, is_made_into_series: isSeries, story_overview: synopsis, genre: genres, supporting_characters: supChars } = book
      if (formTitle !== '' && title.toLowerCase().includes(formTitle.toLowerCase())) matchCount++
      if (formAuthor !== '' && author.toLowerCase().includes(formAuthor.toLowerCase())) matchCount++
      if (formIsFilm !== '' && isFilm.toString() === formIsFilm) matchCount++
      if (formIsSeries !== '' && isSeries === formIsSeries) matchCount++
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
        validBooksSearchArray.push({ resultBook: book, searchHits: matchCount })
      }
    })
    console.log('🚀 ~ file: Search.js ~ line 69 ~ Search ~ validBooksSearchArray', validBooksSearchArray)
    setSearchResults(validBooksSearchArray)

  }

  if (!allBooks || !allGenres) return null

  return (
    <>
      <Modal>
        <Form className="form search-form" onSubmit={handleSubmit}>

          <Form.Group className="field">
            <Form.Label className="label" htmlFor="formTitle">Enter Book Title</Form.Label>
            <Form.Control
              type="text"
              className="input"
              placeholder="enter book title here"
              name="formTitle" onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="field">
            <Form.Label className="label" htmlFor="formAuthor">
              Enter Author
            </Form.Label>
            <Form.Control
              type="text"
              className="input"
              placeholder="enter authors full name"
              name="formAuthor"
              onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="field">
            <Form.Label className="label" htmlFor="formIsFilm">
              Has it been made into a Film?
            </Form.Label>
            <Form.Control
              type="checkbox"
              value={true}
              className="input"
              placeholder=""
              name="formIsFilm"
              onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="field">
            <Form.Label className="label" htmlFor="formIsSeries">
              Has it been made into a TV Series?
            </Form.Label>
            <Form.Control
              type="checkbox"
              value={true}
              className="input"
              name="formIsSeries"
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="field">
            <Form.Label className="label" htmlFor="is"> Search by Keyword (separate each word by comma i.e Mudblood, Dragon, Scar. Do not use punctuation and avoid common words like and the etc.</Form.Label>
            <div><Form.Control type="text" className="input" placeholder="enter search phrases" name="formSearchPhrases" onChange={handleChange}/></div>
          </Form.Group>
          <div className="field">
            <Form.Label className="label" htmlFor="formGenres"> Select Genres</Form.Label>
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
                  <div key={id}className="genre-form-container">
                    <div>
                      <Form.Control type="checkbox" className="input" name="formGenres" value={id} onChange={handleChange}/>{genre}
                    </div>
                  </div>
                )
              })}
          </div>
          <Form.Group className="field">
            <Form.Label className="label" htmlFor="formFirstName">Enter Character First Name</Form.Label>
            <Form.Control
              type="text"
              className="input"
              placeholder=""
              name="formFirstName"
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="field">
            <Form.Label className="label" htmlFor="formLastName">Enter Character Last Name</Form.Label>
            <Form.Control
              type="text"
              className="input"
              placeholder=""
              name="formLastName"
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="field">
            <Button className="submit">Search</Button>
            <Button className="button" type="reset">Reset Form</Button>
            <Button className="button">Cancel and Leave</Button>
          </Form.Group>
        </Form>

      </Modal>
      <section>
        <h2>Search Results</h2>
        <p>{'if we\'ve found the book you were looking for, click on it below'}</p>
        <ul className="list-inline">
          {console.log('validBooksSearchArray', searchResults)}
          {
            searchResults
              .sort((a, b) => b.searchHits - a.searchHits)
              .map(result => {
                const { searchHits, resultBook } = result
                const { cover_image: coverImage, id, title, author } = resultBook

                return (
                  <>
                    <Link to= {`/books/${id}`}>
                      <li className='book'>
                        <img src={coverImage} alt={`the cover for ${title}, by ${author}`} value={id}/>
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
