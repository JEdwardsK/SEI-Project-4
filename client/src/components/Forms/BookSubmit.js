import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { characterFormOptions, genreFormOptions } from '../../helpers/helperFunctions'
import { useHistory } from 'react-router'
import Modal from 'react-bootstrap/Modal'

const BookSubmit = ( { isModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    cover_image: '',
    genre: [],
    is_made_into_film: false,
    is_made_into_series: false,
    page_count: '',
    published_by: '',
    pub_date: '',
    story_overview: '',
    supporting_characters: [],
    main_protagonist: [],
    main_antagonist: [],
    ISBN: '',
  })

  const [allProtagonists, setAllProtagonists] = useState(null)
  const [allAntagonists, setAllAntagonists] = useState(null)
  const [allSupportingCharacters, setAllSupportingCharacters] = useState(null)
  const [allGenres, setAllGenres] = useState(null)
  const [pageNumber, setPageNumber] = useState(0)

  const history = useHistory()
  useEffect(() => {
    const getAntagonists = async () => {
      const { data } = await axios.get('/api/antagonists')
      setAllAntagonists(data)
    }
    getAntagonists()
  }, [])
  useEffect(() => {
    const getProtagonists = async () => {
      const { data } = await axios.get('/api/protagonists')
      setAllProtagonists(data)
    }
    getProtagonists()
  }, [])
  useEffect(() => {
    const getSupportingCharacters = async () => {
      const { data } = await axios.get('/api/supporting_characters')
      setAllSupportingCharacters(data)
    }
    getSupportingCharacters()
  }, [])
  useEffect(() => {
    const getGenres = async () => {
      const { data } = await axios.get('/api/genres')
      setAllGenres(data)
    }
    getGenres()
  }, [])

  const handleChange = (event) => {
    const { type, name, checked, value } = event.target
    const values = type === 'checkbox'
      ? checked
      : value
    setFormData({ ...formData, [name]: values })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (formData.cover_image === '' || formData.cover_image === ' ') {
      formData.cover_image = 'https://cdn.wallpapersafari.com/35/57/iUfZRE.jpg'
    }
    window.alert(JSON.stringify(formData, null, 2))
    const response = await axios.post('/api/books/', formData)
    const postedBookID = response.data.id
    history.push(`/books/${postedBookID}`)

  }
  const handlePageTurnBookForm = (event) => {
    const { value } = event.target
    const page = parseInt(value)
    setPageNumber(page)
  }
  const handleSingleSelect = (selected, name) => {
    const selection = selected.value
    setFormData({ ...formData, [name]: selection })
  }
  const handleMultiChange = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: [...values] })
  }

  //character select options


  if (!allAntagonists || !allProtagonists || !allSupportingCharacters || !allGenres) return (

    <Button disabled>
      <Spinner
        as="span"
        animation="border"
        role="status"
        aria-hidden="true"
      />
    Loading...
    </Button>
  )
  const protagonistOptions = characterFormOptions(allProtagonists)
  const antagonistOptions = characterFormOptions(allAntagonists)
  const supportCharacterOptions = characterFormOptions(allSupportingCharacters)
  const genreOptions = genreFormOptions(allGenres)

  return (

    <Form onSubmit={handleSubmit}>
      {isModal &&
        <Modal.Header closeButton>
          <Modal.Title>Create a New Book</Modal.Title>
        </Modal.Header>
      }
      { pageNumber === 0 &&
          <>
            <Form.Group controlId="bookFormPartOne">
              <Form.Row>
                <Col>
                  <Form.Group controlId="formBookTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Book Title" required name="title" value={formData.title}onChange={handleChange}/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="forBookAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Enter Author name" name="author"  onChange={handleChange} value={formData.author}/>
                    <Form.Text className="text-muted">
                      {'Avoid punctuation e.g instead of "J.K. Rowling", enter "JK Rowling"'}
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group controlId="formCharacterBioProtagonist">
              <Form.Label>Synopsis</Form.Label>
              <Form.Control as="textarea" rows ={4} placeholder="enter info about the story" value={formData.story_overview} name="story_overview" required onChange={handleChange}/>
              <Form.Text className="text-muted">
                {'Max length 2000 characters'}
              </Form.Text>
              <Form.Label>Select Genre</Form.Label>

              <Select
                name="genre"
                options={genreOptions}
                isMulti
                components={makeAnimated()}
                onChange={(selected) => handleMultiChange(selected, 'genre')}
              />
              <Form.Text className="text-muted">
                {'Select all/any genres that apply'}
              </Form.Text>
              <Button value="1" onClick={handlePageTurnBookForm}>Move to next page</Button>

            </Form.Group>
          </>
      }

      {/** end of required forms i.e part one of form
         * cover_image: '',
          genre: [],
          published_by: '',
          pub_date: '',
          story_overview: '',
        */}
      { pageNumber === 1 &&
          <>
            <Form.Group controlId="filmSeriesPages">
              <Form.Row>
                <Col>
                  <Form.Check
                    name="is_made_into_film"
                    label="Has it been made into a Film?"
                    checked={formData.is_made_into_film}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Check
                    name="is_made_into_series"
                    label="Has it been made into a Series?"
                    checked={formData.is_made_into_series}
                    onChange={handleChange}/>
                </Col>
                <Col>
                  <Form.Label>Number of Pages</Form.Label>
                  <Form.Control type="number" name="page_count" value={formData.page_count} label="No. Pages" onChange={handleChange}/>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group controlId="publisherInfo">
              <Form.Row>
                <Col>
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control type="text" value={formData.published_by} placeholder="enter publisher" name="published_by" onChange={handleChange}/>
                </Col>
                <Col>
                  <Form.Label>Date Published</Form.Label>
                  <Form.Control type="date" name="pub_date" value={formData.pub_date} onChange={handleChange} />
                  <Form.Text className="text-muted">
                    {'If the exact date is unknown, you can put the 1st of the month instead.'}
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Label>Book Cover</Form.Label>
                  <Form.Control type="text" placeholder="url link" name="cover_image" value={formData.cover_image} onChange={handleChange} />
                  <Form.Text className="text-muted">
                    {'Enter URL link for cover image, or leave blank for a default'}
                  </Form.Text>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>ISBN</Form.Label>
              <Form.Control type="text" value={formData.ISBN} placeholder="enter ISBN" name="ISBN" onChange={handleChange}/>
              <Form.Text className="text-muted">
                {'Enter in format "978-3-16-148410-0"'}
              </Form.Text>
            </Form.Group>
            { isModal ?
              <Modal.Footer>
                <Button value="2" onClick={handlePageTurnBookForm}>Move to final page</Button>
                <Button value="0" onClick={handlePageTurnBookForm}>Go Back</Button>
              </Modal.Footer>
              :
              <Form.Group>
                <Button value="2" onClick={handlePageTurnBookForm}>Move to final page</Button>
                <Button value="0" onClick={handlePageTurnBookForm}>Go Back</Button>
              </Form.Group>

            }
          </>

      }
      { pageNumber === 2 &&

          <>
            <Form.Group>
              <Form.Label>Select Protagonist</Form.Label>

              <Select
                name="protagonists"
                options={protagonistOptions}
                components={makeAnimated()}
                onChange={(selected) => handleSingleSelect(selected, 'protagonists')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Antagonist</Form.Label>
              <Select
                name="antagonists"
                options={antagonistOptions}
                components={makeAnimated()}
                onChange={(selected) => handleSingleSelect(selected, 'antagonists')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Supporting Characters</Form.Label>
              <Select
                name="supporting_characters"
                options={supportCharacterOptions}
                isMulti
                components={makeAnimated()}
                onChange={(selected) => handleMultiChange(selected, 'supporting_characters')}
              />
            </Form.Group>
            <Form.Text className="text-muted">
              {'You can select multiple supporting characters'}
            </Form.Text>
            { isModal ?

              <Modal.Footer>
                <Button variant="primary" type="submit">
              Submit
                </Button>
                <Button value="1" onClick={handlePageTurnBookForm}>Go Back</Button>
                <Form.Text className="text-muted">
                  {'If a character doesn\'t exist, don\'t worry! You can add them to the book later '}
                </Form.Text>
              </Modal.Footer>
              :
              <Form.Group>
                <Button variant="primary" type="submit">
              Submit
                </Button>
                <Button value="1" onClick={handlePageTurnBookForm}>Go Back</Button>
                <Form.Text className="text-muted">
                  {'If a character doesn\'t exist, don\'t worry! You can add them to the book later '}
                </Form.Text>
              </Form.Group>
            }

          </>
      }
    </Form>

  )
}

export default BookSubmit
