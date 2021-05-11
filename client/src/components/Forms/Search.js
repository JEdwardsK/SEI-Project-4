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
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'
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
  const [show, setShow] = useState(true)
  const [showResults, setShowResults] = useState(false)

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
    setFormData({ ...formData, [name]: values })
  }

  const { formTitle, formAuthor, formIsFilm, formSearchPhrases, formGenres, formFirstName, formLastName, formIsSeries, supporting_characters: supChars, story_overview: synopsis } = formData

  const validBooksSearchArray = []

  const handleSubmit = (event) => {
    event.preventDefault()
    setShow(false)
    console.log(formData)
    console.log(allBooks[0])
    allBooks.forEach(book => {
      let matchCount = 0
      const results = []
      const { title, author, is_made_into_film: isFilm, is_made_into_series: isSeries, story_overview: synopsis, genre: genres, supporting_characters: supChars, main_protagonist: protag, main_antagonist: antag } = book
      if (formTitle !== '' && title.toLowerCase().includes(formTitle.toLowerCase())) {
        matchCount++
        results.push(title)
      }
      if (formAuthor !== '' && author.toLowerCase().includes(formAuthor.toLowerCase())) {
        matchCount++
        results.push(author)
      }
      if (formIsFilm !== '' && isFilm === formIsFilm) {
        matchCount++
        results.push('Made into film')
      }
      if (formIsSeries !== '' && isSeries === formIsSeries) {
        matchCount++
        results.push('Made into tv series')
      }
      // console.log(genres, story_overview)
      formSearchPhrases.split(',')
        .forEach(searchPhrase => {
          // console.log(synopsis)
          // if (story_overview.includes(searchPhrase)) matchCount++
        })
      // genre is an array of objects with the key genres. so to get to genres you need to genre.
      formGenres.forEach(formGenre => {
        console.log(formGenre)
        const genreIdArray = genres.map(item=>item.id)
        console.log(genres)
        const findGenre = genres.find(genre => genre.id = formGenre)
        const genreName = findGenre.genre
        console.log(findGenre)
        genreIdArray.includes(formGenre) && matchCount++
        results.push(genreName)

      })
      // finesse

      //? check data structure before use main_antagonist
      //? check data structure before use main_protagonist

      // make sure the for data produces an array of first names and last names. each character checks against the first and last name arrays
      supChars.forEach(char => {
        const name = (`${char.first_name} ${char.last_name}`).trim()
        if (formFirstName !== '' && formFirstName.toLowerCase().includes(char.first_name.toLowerCase()) ) {
          results.push(name)
          matchCount++
        }
        if (formLastName !== '' && formLastName.toLowerCase().includes(char.last_name.toLowerCase())) {
          results.push(name)
          matchCount++
        }
      })
      protag.forEach(char => {
        const name = (`${char.first_name} ${char.last_name}`).trim()
        if (formFirstName !== '' && char.first_name.toLowerCase().includes(formFirstName.toLowerCase()) ) {
          matchCount++
          results.push(name)
        }
        if (formLastName !== '' && char.last_name.toLowerCase().includes(formLastName.toLowerCase())) {
          matchCount++
          results.push(name)
        }
      })

      antag.forEach(char => {
        console.log(char.first_name.toLowerCase())
        if (formFirstName !== '' && char.first_name.toLowerCase().includes(formFirstName.toLowerCase())) {
          results.push(char.first_name)
          matchCount++
        }
        if (formLastName !== '' && char.last_name.toLowerCase().includes(formLastName.toLowerCase())) {
          const name = (`${char.first_name} ${char.last_name}`).trim()
          matchCount++
          results.push(name)
        }
      })



      // after checking all fields, if the match count is greater than 0, the search has found at least one match. We want to return the books that have matched something
      console.log(matchCount)
      const filteredResults = [...new Set(results)]
      if (matchCount !== 0) {
        validBooksSearchArray.push({ resultBook: book, searchHits: matchCount, results: filteredResults, bookTitle: title })
      }
    })
    console.log('🚀 ~ file: Search.js ~ line 69 ~ Search ~ validBooksSearchArray', validBooksSearchArray)
    setSearchResults(validBooksSearchArray)
    const str = 'lord voldemort'; const substr = 'voldemort'; if (str.includes(substr) )console.log('Found the substring!')
  }

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    setSearchResults([])
    setFormData({
      formTitle: '',
      formAuthor: '',
      formIsFilm: '',
      formSearchPhrases: '',
      formGenres: [],
      formFirstName: '',
      formLastName: '',
      formIsSeries: '',
    })
  }
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
          <Form.Group className="field">
            <Button type="submit">Search</Button>
            <Button className="button" onClick={handleClose}>Cancel and Leave</Button>
          </Form.Group>
        </Form>

      </Modal>
      <section>
        { !show &&
          <>
            <h2 className="search-h2">Search Results: {searchResults.length} matches</h2>
            {searchResults.length === 0 ?
              <p>{'Sorry we\'ve not found a match... please try again'}</p>
            //       <>
            //         <Button disabled>
            //           <Spinner
            //             as="span"
            //             animation="border"
            //             role="status"
            //             aria-hidden="true"
            //           />
            // Loading...
            //         </Button>
            //       </> :
            // <>
            //   <p>{'if we\'ve found the book you were looking for, click on it below'}</p>
            //   {console.log('validBooksSearchArray', searchResults)}
            //   < className="books-index-container" >
              : <div className="book-search-container">
                {searchResults
                  .sort((a, b) => b.searchHits - a.searchHits)
                  .map((result, index) => {
                    const { searchHits, resultBook, results, bookTitle } = result
                    const { cover_image: coverImage, id, title, author } = resultBook

                    return (
                      <div key={id} className="book-search-result" >

                        <div className='book'>
                          <Card.Img src={coverImage} alt={`the cover for ${title}, by ${author}`} value={id}/>
                        </div>
                        <Card border={index === 0 && 'success'} style={{ width: '10rem' }}>
                          <Card.Header>
                            <Link to={`/books/${id}`}>
                              {bookTitle}
                            </Link>
                          </Card.Header>
                          <Card.Text>
                            <Accordion>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                View/Hide Result matches
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                <ListGroup>
                                  {results.map((result, index) => {
                                    return <ListGroup.Item key={index}>{result}</ListGroup.Item>
                                  })}
                                </ListGroup>
                              </Accordion.Collapse>
                            </Accordion>
                            <Card.Footer className="text-muted">
                              search hits: {searchHits}
                            </Card.Footer>
                          </Card.Text>
                        </Card>
                      </div>
                    )
                  })}
              </div>
            }
            <Button variant="primary" onClick={handleShow}>
              New Search
            </Button>
          </>
        }


      </section>

    </>
  )
}

export default Search
