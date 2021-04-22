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
    <>
      <div className="book-show-info-container">
        <div className="book-show-info-left book-card">
          <BookCard3d book={singleBook}/>
        </div>
        <div className="book-show-info-right">
          <div className="book-info">
            <h4>Title</h4>
            <p>{title}</p>
          </div>
          <div className="book-info">
            <h4>Author</h4>
            <a href={`https://en.wikipedia.org/wiki/${author}`}>
              {author}
            </a>
          </div>
          <div className="book-info">
            <h4>Protagonist</h4>
            {
              protag.length > 0 &&

              <p>{`${protag[0].first_name} ${protag[0].last_name}`}</p>
            }
          </div>
          <div className="book-info">
            <h4>Antagonist</h4>
            {
              antag.length > 0 &&

              <p>{`${antag[0].first_name} ${antag[0].last_name}`}</p>
            }
          </div>
          <div className="book-info">
            <h4>Supporting Characters</h4>
            <p>{supCharsString}</p>
          </div>
          <div className="book-info">
            <h4>Synopsis</h4>
            <p>{synopsis}</p>
          </div>
          <div className="book-info">
            <h4>Genres</h4>
            <p>{genreString}</p>
          </div>
          <div className="book-info">
            <h4>Made into Film(s)?</h4>
            <p>{isFilm ? 'Yes' : 'No'}</p>
          </div>
          <div className="book-info">
            <h4>Made into Series?</h4>
            <p>{isSeries ? 'Yes' : 'No'}</p>
          </div>
          <div className="book-info">
            <h4>Publisher</h4>
            <p>{publisher}</p>
          </div>
          <div className="book-info">
            <h4>Date Published</h4>
            <p>{pubDate}</p>
          </div>
          <div className="book-info">
            <h4>Number of Pages</h4>
            <p>{pageCount}</p>
          </div>
          <div className="book-info">
            <h4>ISBN</h4>
            <p>{ISBN}</p>
          </div>
        </div>
      </div>
      <div className="reviews">
        <h2>Reviews</h2>
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
      </div>

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

    </>
  )
}

export default BookShow
