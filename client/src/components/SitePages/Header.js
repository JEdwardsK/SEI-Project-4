import React from 'react'
import { useHistory } from 'react-router-dom'
import { userIsAuthenticated } from '../../helpers/auth'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
const Header = () => {

  const history = useHistory()

  const handleNationChange = (event) => {
    console.log('the props>>>>', event.target.checked)

    if (userIsAuthenticated() === true){
      console.log('IS AUTHENTICATED HERE IS THE CLASSLIST', document.body.classList)
      if ([...document.body.classList].includes('defaultMode') === true){
        document.body.classList.remove('defaultMode')
        document.body.classList.add(`${localStorage.getItem('nation')}Mode`)
      } else if ([...document.body.classList].includes(`${localStorage.getItem('nation')}Mode`) === true){
        document.body.classList.remove(`${localStorage.getItem('nation')}Mode`)
        document.body.classList.add('defaultMode')
      }
    } else if (userIsAuthenticated() === false){
      console.log('NOT AUTHENTICATED')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.alert('you have logged out, returning to homepage')
    history.push('/')
    window.location.reload()
  }
  return (
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
            <NavDropdown.Item className="primary" href="/protagform">Submit a Protagonist</NavDropdown.Item>
            <NavDropdown.Divider className="trim"/>
            <NavDropdown.Item className="primary" href="/antagform">Submit a Antagonist</NavDropdown.Item>
            <NavDropdown.Divider className="trim"/>
            <NavDropdown.Item className="primary" href="/supform">Submit a Supporting Character</NavDropdown.Item>
            <NavDropdown.Divider className="trim"/>
            <NavDropdown.Item className="primary" href="/bookform">Submit a book</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link className="nav-element secondary" href="/profile">Profile</Nav.Link>
          <button className="nav-element secondary" onClick={handleLogout}>Logout</button>
          <switch className="nav-element secondary" type="toggle" onClick={handleNationChange}  data-toggle="toggle" data-on="Nation" data-off="Default"></switch>
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
