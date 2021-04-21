import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { userIsAuthenticated } from '../../helpers/auth'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import CharacterSubmit from '../Forms/CharacterSubmit'
import Modal from 'react-bootstrap/Modal'

const Header = () => {
  const history = useHistory()
  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.alert('you have logged out, returning to homepage')
    history.push('/')
    window.location.reload()
  }
  const [show, setShow] = useState(false)
  const [characterToSubmit, setCharacterToSubmit] = useState('')

  const handleShow = (event) => {
    setShow(true)
    setCharacterToSubmit(event.target.name)
  }
  const handleClose = () => setShow(false)
  return (
    <>
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
              <NavDropdown.Item onClick={handleShow} name="protagonists">Submit a Protagonist</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleShow} name="antagonists">Submit a Antagonist</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleShow} name="supporting_characters">Submit a Supporting Character</NavDropdown.Item>
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
      <Modal show={show} onHide={handleClose} centered>
        <CharacterSubmit characterType={characterToSubmit}/>
      </Modal>
    </>

  )
}

export default Header
