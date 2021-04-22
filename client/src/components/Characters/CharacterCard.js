/* eslint-disable no-unused-vars */
import React, { useState  } from 'react'
import BooksCarousel from '../Books/BooksCarousel'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
const CharacterCard = ({ character, characterType }) => {

  
  const { books, character_archetypes: archetypes, first_name: firstName, last_name: lastName, character_bio: bio, relationship_to_protagonist: relationship } = character
  //* id not used, removed to prevent linter issues, add back when required
  console.log(archetypes)
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  
  const handleClose = () => setShow(false)
  console.log('first>>',books)
  return (
    <Card className='character-card background' style={{ width: 'auto' }}>
      <Card.Header className='secondary'>{`${firstName} ${lastName}`}</Card.Header>
      <Card.Body className='trim' >
        <Card.Title></Card.Title>
        {relationship &&
        <>
          <Card.Subtitle className="mb-2 text-muted">Relationship to Protagonist</Card.Subtitle>
          <Card.Text>{relationship}</Card.Text>
        </>
        }
        
        <Card.Text>
          {bio}
        </Card.Text>
        
      </Card.Body>
      <Card.Footer className='secondary'>
        <Card.Link href={`/books/${books}`}>Popular book</Card.Link>
        
      </Card.Footer>
    </Card>
      
    
  )
}

export default CharacterCard
