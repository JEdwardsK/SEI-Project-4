import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { userIsAuthenticated } from '../../helpers/auth'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'

import CharacterSubmit from '../forms/CharacterSubmit'
import BookSubmit from '../forms/BookSubmit'
import Register from '../forms/users/Register'
import Login from '../forms/users/Login'



const Header = () => {
  const history = useHistory()
  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('nation')
    window.alert('you have logged out, returning to homepage')
    history.push('/')
    window.location.reload()
  }
  const [show, setShow] = useState(false)
  const [bookShow, setBookShow] = useState(false)
  const [loginShow, setLoginShow] = useState(false)
  const [registerShow, setRegisterShow] = useState(false)
  const [characterToSubmit, setCharacterToSubmit] = useState('')

  const handleShow = (event) => {
    const { name } = event.target
    if (name === 'book') {
      setBookShow(true)
    } else if (name === 'login') {
      setLoginShow(true)
    } else if (name === 'register') {
      setRegisterShow(true)
    } else {
      setShow(true)
      setCharacterToSubmit(name)
    }
  }
  const handleClose = () => {
    setShow(false)
    setBookShow(false)
    setLoginShow(false)
    setRegisterShow(false)
  }
  return (
    <>
      <Navbar expand="xl" className="navbar background">
        <Nav className="mr=auto">
          <Navbar.Brand className="nav-element secondary" href="/">Home</Navbar.Brand>
          <Nav.Link className="nav-element secondary" href="/books">Books</Nav.Link>
          <Nav.Link className="nav-element secondary" href="/genres">Genres</Nav.Link>
          <Nav.Link className="nav-element secondary" href="/protagonists">Protagonists</Nav.Link>
          <Nav.Link className="nav-element secondary" href="/antagonists">Antagonists</Nav.Link>
          <Nav.Link className="nav-element secondary" href="/supporting_characters">Supporting Characters</Nav.Link>
          {
            userIsAuthenticated() &&
            <>
              <Nav.Link className="nav-element secondary" href="/search">Search</Nav.Link>
              <NavDropdown className="nav-element secondary" title="Forms" id="basic-nav-dropdown">
                <NavDropdown.Item  className="primary" onClick={handleShow} name="protagonists">Submit a Protagonist</NavDropdown.Item>
                <NavDropdown.Item className="secondary" onClick={handleShow} name="antagonists">Submit a Antagonist</NavDropdown.Item>
                <NavDropdown.Item className="primary" onClick={handleShow} name="supporting_characters">Submit a Supporting Character</NavDropdown.Item>
                <NavDropdown.Item className="secondary" name="book" onClick={handleShow}>Submit a book</NavDropdown.Item>

              </NavDropdown>
              <Nav.Link className="nav-element secondary" href="/profile">Profile</Nav.Link>
              <Button className="nav-element  secondary" onClick={handleLogout}>Logout</Button>
              {/* <Button className="nav-element secondary" type="toggle" onClick={handleNationChange}  name="toggle" data-toggle="toggle" data-on="Nation" data-off="Default"></Button> */}
            </>
          }
          {
            !userIsAuthenticated() &&
        <>
          <Nav.Link className="nav-element secondary" onClick={handleShow} name="login">Log In</Nav.Link>
          <Nav.Link className="nav-element secondary" onClick={handleShow} name="register">Register</Nav.Link>

        </>
          }
          <Form className='form-styling ' inline>
            <FormControl type="text" placeholder="Search for a Book (WIP)" className=" mr-sm-2" />
            <Button style={{ cursor: 'not-allowed' }} type="button">Submit</Button>
          </Form>
        </Nav>
      </Navbar>
      <Modal show={show} onHide={handleClose} centered>
        <CharacterSubmit characterType={characterToSubmit}/>
      </Modal>
      <Modal show={bookShow} onHide={handleClose} centered>
        <BookSubmit isModal={true}/>
      </Modal>
      <Modal show={registerShow} onHide={handleClose} centered>
        <Register/>
      </Modal>
      <Modal show={loginShow} onHide={handleClose} centered>
        <Login/>
      </Modal>
    </>
  )
}

export default Header
