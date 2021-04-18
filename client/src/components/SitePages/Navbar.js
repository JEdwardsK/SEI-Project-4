import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to ="/books">Books</Link>
      <Link to="/characters">Characters</Link>
      <Link to="/genres">Genres</Link>
      <Link to="/protagonists">Protagonists</Link>
      <Link to="/antagonists">Antagonists</Link>
      <Link to="/supporting_characters">Supporting Characters</Link>
    </div>
  )
}

export default Navbar
