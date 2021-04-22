import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { userIsAuthenticated } from '../../helpers/auth'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import CharacterSubmit from '../Forms/CharacterSubmit'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { setColourByNation } from '../../helpers/helperFunctions'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'


const Header = () => {
  setColourByNation()
  const history = useHistory()

  // const handleNationChange = (event) => {
  //   console.log('the props>>>>', event.target.checked)
  //   if (event.target.name === 'toggle') {
  //     if (userIsAuthenticated() === true){
  //       console.log('IS AUTHENTICATED HERE IS THE CLASSLIST', document.body.classList)
  //       if ([...document.body.classList].includes('defaultMode') === true){
  //         document.body.classList.remove('defaultMode')
  //         document.body.classList.add(`${localStorage.getItem('nation')}Mode`)
  //       } else if ([...document.body.classList].includes(`${localStorage.getItem('nation')}Mode`) === true){
  //         document.body.classList.remove(`${localStorage.getItem('nation')}Mode`)
  //         document.body.classList.add('defaultMode')
  //       }
  //     } else if (userIsAuthenticated() === false){
  //       console.log('NOT AUTHENTICATED')

  //     }
  //   }

  // }

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
      <Navbar expand="xl" className="navbar background">
        <Nav className="mr=auto">
          <Navbar.Brand className="nav-element secondary" href="/">Home</Navbar.Brand>
          <Nav.Link className="nav-element secondary" href="/books">Books</Nav.Link>
          <Nav.Link className="nav-element secondary" href="/genres">Genres</Nav.Link>
          <Nav.Link className="nav-element secondary" href="/protagonists">Protagonists</Nav.Link>
          <Nav.Link className="nav-element secondary" href="/antagonists">Antagonists</Nav.Link>
          <Nav.Link className="nav-element secondary" href="/supporting_characters">Supporting Characters</Nav.Link>
          <Nav.Link className="nav-element secondary" href="/search">Search</Nav.Link>
          {
            userIsAuthenticated() &&
        <>
          <NavDropdown className="nav-element secondary" title="Forms" id="basic-nav-dropdown">
            <NavDropdown.Item  className="primary" onClick={handleShow} name="protagonists">Submit a Protagonist</NavDropdown.Item>
            
            <NavDropdown.Item className="secondary" onClick={handleShow} name="antagonists">Submit a Antagonist</NavDropdown.Item>
            
            <NavDropdown.Item className="primary" onClick={handleShow} name="supporting_characters">Submit a Supporting Character</NavDropdown.Item>
            <NavDropdown.Divider className="trim"/>
            <NavDropdown.Item className="primary" href="/bookform">Submit a book</NavDropdown.Item>
            <NavDropdown.Item>
              <Form inline>
                <FormControl type="text" placeholder="Search for a Book" className=" mr-sm-2" />
                <Button type="submit">Submit</Button>
              </Form>
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link className="nav-element secondary" href="/profile">Profile</Nav.Link>
          <Button className="nav-element secondary" onClick={handleLogout}>Logout</Button>
          {/* <Button className="nav-element secondary" type="toggle" onClick={handleNationChange}  name="toggle" data-toggle="toggle" data-on="Nation" data-off="Default"></Button> */}
        </>
          }
          {
            !userIsAuthenticated() &&
        <>
          <Nav.Link className="nav-element secondary" href="/login">Log In</Nav.Link>
          <Nav.Link className="nav-element secondary" href="/register">Register</Nav.Link>

        </>
          }
          <Form inline>
            <FormControl type="text" placeholder="Search for a Book" className=" mr-sm-2" />
            <Button type="submit">Submit</Button>
          </Form>
        </Nav>
      </Navbar>
      <Modal show={show} onHide={handleClose} centered>
        <CharacterSubmit characterType={characterToSubmit}/>
      </Modal>
    </>
  )
}

export default Header
