/*eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import { genreFormOptions } from '../../helpers/helperFunctions'
import makeAnimated from 'react-select/animated'




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
  const [show, setShow] = useState(false)

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
    const { type, name, checked, value } = event.target
    const values = type === 'checkbox'
      ? checked
      : value
    console.log(values)
    setFormData({ ...formData, [name]: values })
    console.log(formData)
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

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleMultiChange = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: [...values] })
  }

  if (!allBooks || !allGenres) return null

  const sortedGenres = allGenres.sort((a, b) => {
    const genreA = a.genre.toUpperCase()
    const genreB = b.genre.toUpperCase()
    return genreA < genreB
      ? -1 : genreA > genreB
        ? 1 : 0
  })
  const genreOptions = genreFormOptions(sortedGenres)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New Search
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter Search Information Below</Modal.Title>
        </Modal.Header>
        <Form className="form search-form" onSubmit={handleSubmit}>


          <Form.Group controlId="bookFormPartOne">
            <Form.Row>
              <Col>
                <Form.Group controlId="formBookTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter Book Title" name="formTitle" value={formData.title} onChange={handleChange}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="forBookAuthor">
                  <Form.Label>Author</Form.Label>
                  <Form.Control type="text" placeholder="Enter Author name" name="formAuthor" value={FormData.formAuthor} onChange={handleChange}/>
                  <Form.Text className="text-muted">
                    {'Avoid punctuation e.g instead of "J.K. Rowling", enter "JK Rowling"'}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group controlId="formCharacterBioProtagonist">
            <Form.Label>Search by Keyword</Form.Label>
            <Form.Control as="textarea" rows ={4} placeholder="enter info about the story" value={formData.formSearchPhrases} name="formSearchPhrases" onChange={handleChange}/>
            <Form.Text className="text-muted">
              {'separate each word by comma i.e Mudblood, Dragon, Scar. Do not use punctuation and avoid common words like and the etc.'}
            </Form.Text>
            <Form.Label>Select Genre</Form.Label>

            <Select
              name="formGenres"
              options={genreOptions}
              isMulti
              components={makeAnimated()}
              onChange={(selected) => handleMultiChange(selected, 'formGenres')}
            />
          </Form.Group>
          <Form.Group>
            <Col>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="What is their first name" value={formData.formFirstName} name="formFirstName" onChange={handleChange}/>
                <Form.Text className="text-muted">
                  {'for a character with a title or one given name enter here. e.g "Lord Voldemort".'}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="What is their last name" name="formLastName" value={formData.formLastName} onChange={handleChange}/>
                <Form.Text className="text-muted">
                  {'input user message'}
                </Form.Text>
              </Form.Group>
            </Col>
          </Form.Group>

          <Form.Group controlId="filmSeriesPages">
            <Form.Row>
              <Col>
                <Form.Check
                  name="formIsFilm"
                  label="Has it been made into a Film?"
                  checked={formData.formIsFilm}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Check
                  name="formIsSeries"
                  label="Has it been made into a Series?"
                  checked={formData.formIsSeries}
                  onChange={handleChange}/>
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>
        <Form.Group className="field">
          <Button type="submit">Search</Button>
          <Button className="button" onClick={handleClose}>Cancel and Leave</Button>
        </Form.Group>

      </Modal>
      <section>
        <h2>Search Results</h2>
        {
          searchResults.length === 0 ?
            <>
              <Button disabled>
                <Spinner
                  as="span"
                  animation="border"
                  role="status"
                  aria-hidden="true"
                />
      Loading...
              </Button>
            </> :
            <>
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
            </>
        }

      </section>

    </>
  )
}

export default Search
