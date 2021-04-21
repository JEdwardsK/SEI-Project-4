import React from 'react'
import { useHistory } from 'react-router-dom'
import { userIsAuthenticated } from '../../helpers/auth'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

const Header = () => {
  const history = useHistory()
  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.alert('you have logged out, returning to homepage')
    history.push('/')
    window.location.reload()
  }
  return (
    <Navbar expand="xl" className="nav-element">
      <Nav className="mr=auto">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav.Link className="nav-element" href="/books">Books</Nav.Link>
        <Nav.Link className="nav-element" href="/genres">Genres</Nav.Link>
        <Nav.Link className="nav-element" href="/protagonists">Protagonists</Nav.Link>
        <Nav.Link className="nav-element" href="/antagonists">Antagonists</Nav.Link>
        <Nav.Link className="nav-element" href="/supporting_characters">Supporting Characters</Nav.Link>
        <Nav.Link className="nav-element" href="/search">Search</Nav.Link>
        {
          userIsAuthenticated() &&
        <>
          <NavDropdown className="nav-element" title="Forms" id="basic-nav-dropdown">
            <NavDropdown.Item href="/protagform">Submit a Protagonist</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/antagform">Submit a Antagonist</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/supform">Submit a Supporting Character</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/bookform">Submit a book</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link className="nav-element" href="/profile">Profile</Nav.Link>
          <button className="nav-element" onClick={handleLogout}>Logout</button>
        </>
        }
        {
          !userIsAuthenticated() &&
        <>
          <Nav.Link className="nav-element" href="/login">Log In</Nav.Link>
          <Nav.Link className="nav-element" href="/register">Register</Nav.Link>
          
        </>
        }
      </Nav>
    </Navbar>
  )
}

export default Header
