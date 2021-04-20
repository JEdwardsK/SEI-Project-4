/*eslint-disable no-unused-vars*/
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

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
    is_made_into_film: '',
    is_made_into_series: '',
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

  useEffect(() => {
    const getAntagonists = async () => {
      const { data } = await axios.get('/api/antagonists')
      setAllAntagonists(data)
    }
    getAntagonists()
  })
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

  const handleChange = (event) => {
    console.log(event.target.value)
  }

  const handelSubmit = (event) => {
    event.preventDefault()
  }

  if (!allAntagonists || !allProtagonists || !allSupportingCharacters) return (

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

  return (

    <Form>
      <Form.Row>
        <Col>
          <Form.Group controlId="formBookTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Book Title" required name="title" onSubmit={handleChange}/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="forBookAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" placeholder="Enter Author name" name="author" onSubmit={handleChange}/>
            <Form.Text className="text-muted">
              {'Avoid punctuation e.g instead of "J.K. Rowling", enter "JK Rowling"'}
            </Form.Text>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Group controlId="formCharacterBioProtagonist">
        <Form.Label>Synopsis</Form.Label>
        <Form.Control as="textarea" rows ={4} placeholder="enter info about the story" required onSubmit={handleChange}/>
        <Form.Text className="text-muted">
          {'input user message'}
        </Form.Text>

        {/** end of required forms i.e part one of form
         * cover_image: '',
         genre: [],
         published_by: '',
         pub_date: '',
         story_overview: '',
        */}
        <Form.Group controlId="filmSeriesPages">
          <Form.Row>
            <Col>
              <Form.Check name="is_made_into_film" label="Has it been made into a Film?"/>
            </Col>
            <Col>
              <Form.Check name="is_made_into_series" label="Has it been made into a Series?"/>
            </Col>
            <Col>
              <Form.Control type="number" name="page_count" label="No. Pages"/>
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="publisherInfo">
          <Form.Row>
            <Col>
              <Form.Label>Publisher</Form.Label>
              <Form.Control type="text" placeholder="enter publisher"/>
            </Col>
            <Col>
              <Form.Label>Date Published</Form.Label>
              <Form.Control type="date" name="pub_date"/>
            </Col>
          </Form.Row>
        </Form.Group>

        {/** final form section, give user otion to fill forms based on wheter there is no character they wish to select */}

      </Form.Group>
      <Form.Group>
        <Form.Label>Select Protagonist</Form.Label>
        <Form.Control as="select">
          <option>Select...</option>
          {allProtagonists.map(protagonist => {
            const { id, first_name: firstName, last_name: lastName } = protagonist
            return (
              <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
            )
          })}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Select Antagonist</Form.Label>
        <Form.Control as="select">
          <option>Select...</option>
          {allAntagonists.map(antagonist => {
            const { id, first_name: firstName, last_name: lastName } = antagonist
            return (
              <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
            )
          })}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Select Supporting Characters</Form.Label>
        <Form.Control as="select" multiple>
          {allSupportingCharacters.map(character => {
            const { id, first_name: firstName, last_name: lastName } = character
            return (
              <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
            )
          })}
          <option>None Listed</option>
        </Form.Control>
      </Form.Group>
    </Form>
  )
}

export default BookSubmit
