import React from 'react'
import Card from 'react-bootstrap/Card'
const CharacterCard = ({ character }) => {


  const { books, first_name: firstName, last_name: lastName, character_bio: bio, relationship_to_protagonist: relationship, quote } = character

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
