/*eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'

// Bootstrap Imports
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


const ProtagonistSubmit = () => {
  //* the following fields are required for a successful post: first name, character bio, character archetype. first name is a string, bio is a string, archetypes is an array of numbers. these numbers are the ids of the archetypes. a get request will be required for the archetypes and then attribute the value of the data as the id

  //! all fields with a relationship will require a get all request to populate the form and have a value to return in the POST. for example, for character archetypes make a get request to get all, then map it into the form with each being a checkbox or something, with a value= their own id.

  //? any null values must be in the format of an empty string "" or empty array []. do not submit data that is null or undefined it will either throw an error and not work, or work and cause a problem later with rendering info.

  //state variables
  const [allArchetypes, setAllArchetypes] = useState(null)
  const [allBooks, setAllBooks] = useState(null)
  const [formData, setFormData] = useState({
    // books and last name optional
    first_name: '',
    last_name: '',
    character_bio: '',
    //relationship fields, require get request
    character_archetypes: [],
    books: [],
  })

  useEffect(() => {
    const getArchetypes = async () => {
      const { data } = await axios.get('api/archetypes/')
      setAllArchetypes(data)
    }
    getArchetypes()
  }, [])

  useEffect(() => {
    const getBooks = async () => {
      const { data } = await axios.get('api/books/')
      setAllBooks(data)
    }
    getBooks()
  }, [])

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log(newFormData)
    setFormData(newFormData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }


  if (!allBooks || !allArchetypes) return null
  console.log('test')
  return (
    <>
      <Form>
        <Form.Row>
          <Col>
            <Form.Group controlId="formFirstNameProtagonist">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="What is their first name" required name="first_name"/>
              <Form.Text className="text-muted">
                {'for a character with a title or one given name enter here. e.g "Lord Voldemort".'}
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLastNameProtagonist">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="What is their last name" name="last_name"/>
              <Form.Text className="text-muted">
                {'input user message'}
              </Form.Text>
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Group controlId="formCharacterBioProtagonist">
          <Form.Label>Character Bio</Form.Label>
          <Form.Control as="textarea" rows ={5} placeholder="enter info about the character" required />
          <Form.Text className="text-muted">
            {'input user message'}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBooksProtagonist">
          <Form.Label>Appears in</Form.Label>
          <Form.Control as="select" multiple>
            {allBooks.map(book => {
              const { id, title } = book
              return (
                <option key={id} value={id}>{title}</option>
              )
            })}
            <option value="">Other Not Listed</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formGenreProtagonist">
          <Form.Label>Character Archetypes</Form.Label>
          <Form.Text className="text-muted">
            Check out {<a href="https://tvtropes.org/pmwiki/pmwiki.php/Main/NarrativeTropes">TVTropes</a>} for an idea on what tropes to pick
          </Form.Text>
          {allArchetypes.map(trait => {
            const { id, archetype } = trait

            return (
              <Form.Check inline type="checkbox" label={archetype} value={id} key={id} />
            )

          })}

        </Form.Group>
        <Button variant="primary" type="submit">
    Submit
        </Button>
      </Form>
    </>
  )
}

export default ProtagonistSubmit
