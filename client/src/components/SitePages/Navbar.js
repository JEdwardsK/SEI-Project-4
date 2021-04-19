import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { userIsAuthenticated } from '../../helpers/auth'

const Navbar = () => {
  const history = useHistory()
  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.alert('you have logged out, returning to homepage')
    history.push('/')
    window.location.reload()

  }
  return (
    <div className="navbar">
      <Link to="/"><p className="nav-element">Home</p></Link>
      <Link to ="/books"><p className="nav-element">Books</p></Link>
      <Link to="/genres"><p className="nav-element">Genres</p></Link>
      <Link to="/protagonists"><p className="nav-element">Protagonists</p></Link>
      <Link to="/antagonists"><p className="nav-element">Antagonists</p></Link>
      <Link to="/supporting_characters"><p className="nav-element">Supporting Characters</p></Link>
      <Link to="/search"><p className="nav-element">Search</p></Link>
      <Link to="/protagform"><p className="nav-element">Protagonist Form</p></Link>
      <Link to="/antagform"><p className="nav-element">Antagonist Form</p></Link>
      <Link to="/supform"><p className="nav-element">Support Char Form</p></Link>
      <Link to="/bookform"><p className="nav-element">Book Form</p></Link>

      {
        userIsAuthenticated() &&
        <>
          <Link to="/profile"><p className="nav-element">Profile</p></Link>
          <button className="nav-element" onClick={handleLogout}>Logout</button>
        </>
      }
      {
        !userIsAuthenticated() &&
        <>
          <Link to="/login"><p className="nav-element">Log In</p></Link>
          <Link to="/register"><p className="nav-element">Register</p></Link>
        </>
      }

    </div>
  )
}

export default Navbar
