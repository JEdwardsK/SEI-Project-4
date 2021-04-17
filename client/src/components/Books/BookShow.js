/* eslint-disable no-unused-vars*/

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const BookShow = () => {
  console.log(useParams())
  const { id: bookID } = useParams()
  const [singleBook, setSingleBook] = useState(null)
  useEffect(() => {
    const getSingleBook = async () => {
      const { data } = await axios.get(`/api/books/${bookID}`)
      setSingleBook(data)
    }
    getSingleBook()
  },[])

  if (!singleBook) return null

  const {id, reviews, supporting_characters:supChars, main_protagonist: protag, main_antagonist: antag, genre: genres, title, author, cover_image: coverImage, ISBN, is_made_into_film: isFilm, is_made_into_series: isSeries, story_overview: synopsis, page_count: pageCount, published_by: publisher, pub_date: pubDate } = singleBook

  //* remember the following data structures:
    //* Arrays of objects = supChars, genres, protag, antag, reviews
    //* Booleans = isFilm, isSeries
    //* Strings = title, author, coverImage, ISBN, synopsis, publisher
    //* Numbers = id, pageCount
    //* pubDate is a string in format "yyyy-mm-dd"
  return (
    <div>

    </div>
  )
}

export default BookShow
