/* eslint-disable no-unused-vars */
import React, { useState  } from 'react'
import BooksCarousel from '../Books/BooksCarousel'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
const CharacterCard = ({ character, characterType }) => {


  const { books, character_archetypes: archetypes, first_name: firstName, last_name: lastName, character_bio: bio, relationship_to_protagonist: relationship, quote } = character
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
        {quote &&
        <>
          <Card.Subtitle className="mb-2 text-muted">Memorable Quote:</Card.Subtitle>
          <Card.Text>{`"${quote}"`}</Card.Text>
        </>
        }

        <Card.Text>
          {bio}
        </Card.Text>

      </Card.Body>
      {/* <Card.Link  href={`/books/${books[0].id}`}>{books[0].title}</Card.Link> */}
      <Card.Footer className='secondary'>
        {'Appears In: '}

        {books.map(book => {
          const { title, id } = book
          return (
            <Card.Link key={id} href={`/books/${id}`}>{title}</Card.Link>
          )
        })
        }


      </Card.Footer>
    </Card>


  )
}

export default CharacterCard
