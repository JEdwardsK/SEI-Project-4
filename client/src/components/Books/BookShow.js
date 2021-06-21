import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BookCard3d from './BookCard3d'
import Card from 'react-bootstrap/Card'
import { Col, Container, Row } from 'react-bootstrap'
import { setColourByNation } from '../../helpers/helperFunctions'

const BookShow = () => {
  setColourByNation()
  const { id: bookID } = useParams()
  const [singleBook, setSingleBook] = useState(null)

  useEffect(() => {
    const getSingleBook = async () => {
      const { data } = await axios.get(`/api/books/${bookID}/`)
      setSingleBook(data)
    }
    getSingleBook()
  },[bookID])

  if (!singleBook) return null

  const { supporting_characters: supChars, main_protagonist: protag, main_antagonist: antag, genre: genres, title, author, is_made_into_film: isFilm, is_made_into_series: isSeries, story_overview: synopsis } = singleBook

  const genreString = genres.map(item => ` ${item.genre}`).toString()
  const supCharsString = supChars.map(item => ` ${item.first_name} ${item.last_name}`).toString()

  return (
    <div className="book-show-card-container">
      <Card className="book-show-card" style={{ width: '40rem' }}>
        <Card.Body>
          <Card.Title>{`${title}, by ${author}`}</Card.Title>
        </Card.Body>
        <Row>
          <Col className="book-show-info-left book-card">
            <BookCard3d book={singleBook}/>
          </Col>
        </Row>
        <Row>
          <Col>Book Title</Col>
          <Col>{title}</Col>

        </Row>
        <Row>
          <Col>Author</Col>
          <Col><a href={`https://en.wikipedia.org/wiki/${author}`}>
            {author}
          </a></Col>
        </Row>
        <Row>
          <Col>Synopsis</Col>
          <Col>
            <p>{synopsis}</p>
          </Col>
        </Row>
        <Row>
          <Col>Protagonist</Col>
          <Col>
            {
              protag.length > 0 &&

                <p>{`${protag[0].first_name} ${protag[0].last_name}`}</p>
            }
          </Col>
        </Row>
        <Row>
          <Col>Antagonist</Col>
          <Col>
            {
              antag.length > 0 &&

                <p>{`${antag[0].first_name} ${antag[0].last_name}`}</p>
            }
          </Col>
        </Row>
        <Row>
          <Col>Supporting Characters</Col>
          <Col>
            <p>{supCharsString}</p>
          </Col>
        </Row>
        <Row>
          <Col>Genre</Col>
          <Col>{genreString}</Col>
        </Row>
        <Row>
          <Col>Has it Been Made Into a Film?</Col>
          <Col>
            {isFilm ? 'Yes' : 'No'}
          </Col>
        </Row>
        <Row>
          <Col>Has it Been Made into a Series</Col>
          <Col>
            {isSeries ? 'Yes' : 'No'}
          </Col>
        </Row>
        <Row>
          <Col>Publisher</Col>
          <Col></Col>
        </Row>

        <Row>
          <Col>Publication Date</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>ISBN</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>Number of Pages</Col>
          <Col></Col>
        </Row>

        <Card.Body>
          <Container>

          </Container>
        </Card.Body>
      </Card>
    </div>
  )
}

export default BookShow
