/* eslint-disable indent */
/* eslint-disable no-unused-vars*/

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BookCard3d from './BookCard3d'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { getTokenFromLocalStorage } from '../../helpers/auth'
import Card from 'react-bootstrap/Card'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'

const BookShow = () => {
  const { id: bookID } = useParams()
  const [singleBook, setSingleBook] = useState(null)
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({
    book: bookID,
    review_text: '',
  })
  useEffect(() => {
    const getSingleBook = async () => {
      const { data } = await axios.get(`/api/books/${bookID}`)
      setSingleBook(data)
    }
    getSingleBook()
  },[bookID])

  if (!singleBook) return null

  const { id, reviews, supporting_characters: supChars, main_protagonist: protag, main_antagonist: antag, genre: genres, title, author, cover_image: coverImage, ISBN, is_made_into_film: isFilm, is_made_into_series: isSeries, story_overview: synopsis, page_count: pageCount, published_by: publisher, pub_date: pubDate } = singleBook

  const genreString = genres.map(item => ` ${item.genre}`).toString()
  const supCharsString = supChars.map(item => ` ${item.first_name} ${item.last_name}`).toString()



  //* remember the following data structures:
  //* Arrays of objects = supChars, genres, protag, antag, reviews
  //* Booleans = isFilm, isSeries
  //* Strings = title, author, coverImage, ISBN, synopsis, publisher
  //* Numbers = id, pageCount
  //* pubDate is a string in format "yyyy-mm-dd"
  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log(newFormData)
    setFormData(newFormData)
  }

  const handleSubmit = async (event) => {
    console.log(formData)
    event.preventDefault()
    window.alert(JSON.stringify(formData, null, 2))
    try {
      const response = await axios.post('/api/reviews/', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log(response)
      history.push(`/pubs/${id}`)
    } catch (err){
      console.log(err.message)
    }
  }

  const handleModal = () => setShow(true)


  const handleClose = () => setShow(false)

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

        {/* <h2>Reviews</h2>
        <Button onClick={handleModal}>Add a review</Button>
        {reviews.map(review => {
          const { id, review_text: text, created_at: createdAt, reviewOwner } = review
          return (

            <div key={id}>
              <div>{reviewOwner}</div>
              <div>{text}</div>
            </div>

          )
        })}
       */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Review for {title} by {author}</Modal.Title>
        </Modal.Header>
        <Card>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control as="textarea" rows={3} placeholder="Enter your review here" name="review_text" value={formData.review_text} onChange={handleChange}/>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" type="submit">Submit</Button>
            </Modal.Footer>
          </Form>
        </Card>
      </Modal>

    </div>
  )
}

export default BookShow
