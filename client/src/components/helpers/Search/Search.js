import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Search = () => {

  const [allBooks, setAllBooks] = useState(null)

  useEffect (() => {
    const getData = async () => {
      const { data } = await axios.get('api/books/')
      setAllBooks(data)
    }
    getData()
  },[])

  allBooks.forEach(book => {

  });

  return (


    <div>

    </div>
  )
}

export default Search
