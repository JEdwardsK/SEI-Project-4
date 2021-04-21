/*eslint-disable no-unused-vars*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { characterFormOptions, genreFormOptions } from '../../helpers/helperFunctions'

const BookSubmit = () => {
  // * the following fields are required for a successful post: title, author, ISBN, published by, genre, supporting characters, protagonist and antagonist. will change these later to only require title author and synopsis.

  // * the form will be segmented into at least parts: first the user will have the required fields. then they will pass to optional fields, displaying all of the remaining fields EXCEPT the character fields. these are relationship based and so must be posted first.

  //* client is first given the option to select from characters already in the database. if they want to add one the book form is not submitted. the character form is rendered and posted which will then allow them to select from the database characters. all relationship based fields require a get request on load of form to populate the form options.

  //! all fields with a relationship will require a get all request to populate the form and have a value to return in the POST. for example, for character archetypes make a get request to get all, then map it into the form with each being a checkbox or something, with a value= their own id.


  //? the path for forms completion is as follows:
  //? 1)client goes to submit form. the following fields are populated on display
  //?      - title, author, synopsis
  //? buttons visible are cancel and submit
  //? 2) client asked if they want to submit the book as is or enter more information
  //? buttons visible are submit and continue
  //? 3) client moves to next form, previous info still saved to state, the following fields are populated
  //?     - ISBN, published by, genre, cover image, isFilm, isSeries, pageCount, publish date
  //? buttons visible are cancel (clear current fields and submit previous), and submit
  //? 4) client again asked if they want to add more or submit
  //? buttons visible are submit or continue
  //? 5) characters are displayed as dropdown entries. user can select one protagonist, one antagonist and any number of supporting characters
  //? buttons visible are cancel (clear current fields and submit previous),  submit, and my characters not there
  //? 6) if user selects third button, the form is submitted and posted. they are then asked if they want submit characters and are directed to the character submission page. if they do not want to submit a character, they are directed to the posted books show page

  //* any null values must be in the format of an empty string "" or empty array []. do not submit data that is null or undefined it will either throw an error and not work, or work and cause a problem later with rendering info.
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
    console.log(values)
    setFormData({ ...formData, [name]: values })
    console.log(formData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    window.alert(JSON.stringify(formData, null, 2))
    await axios.post('/api/books/', formData)

  }
  const handlePageTurn = (event) => {
    const { value, name } = event.target
    const page = parseInt(value)
    setPageNumber(page)
    console.log(pageNumber + 1)
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
                    <Form.Control type="text" placeholder="Enter Author name" name="author"  onChange={handleChange}/>
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
                {'input user message'}
              </Form.Text>
              <Form.Label>Select Genre</Form.Label>

              <Select
                name="genre"
                options={genreOptions}
                isMulti
                components={makeAnimated()}
                onChange={(selected) => handleMultiChange(selected, 'genre')}
              />
              <Button value="1" onClick={handlePageTurn}>Move to next page</Button>

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
                  <Form.Control type="date" name="pub_date" value={formData.pub_date} onChange={handleChange}/>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>ISBN</Form.Label>
              <Form.Control type="text" value={formData.ISBN} placeholder="enter ISBN" name="ISBN" onChange={handleChange}/>
              <Form.Text className="text-muted">
                {'Enter in format ""'}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Button value="2" onClick={handlePageTurn}>Move to final page</Button>
              <Button value="0" onClick={handlePageTurn}>Go Back</Button>
            </Form.Group>
          </>

      }
      {/** final form section, give user otion to fill forms based on wheter there is no character they wish to select */}

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

              {/* <Form.Control as="select">
                <option>Select...</option>
                {allProtagonists.map(protagonist => {
                  const { id, first_name: firstName, last_name: lastName } = protagonist
                  return (
                    <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
                  )
                })}
              </Form.Control> */}
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Antagonist</Form.Label>
              <Select
                name="antagonists"
                options={antagonistOptions}
                components={makeAnimated()}
                onChange={(selected) => handleSingleSelect(selected, 'antagonists')}
              />
              {/* <Form.Control as="select">
                <option>Select...</option>
                {allAntagonists.map(antagonist => {
                  const { id, first_name: firstName, last_name: lastName } = antagonist
                  return (
                    <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
                  )
                })}
              </Form.Control> */}
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
              {/* <Form.Control as="select" multiple>
                {allSupportingCharacters.map(character => {
                  const { id, first_name: firstName, last_name: lastName } = character
                  return (
                    <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
                  )
                })}
                <option>None Listed</option>
              </Form.Control> */}
            </Form.Group>
            <Button variant="primary" type="submit">
      Submit
            </Button>
            <Button value="1" onClick={handlePageTurn}>Go Back</Button>

          </>
      }
    </Form>

  )
}

export default BookSubmit
