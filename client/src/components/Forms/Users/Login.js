import axios from 'axios'
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import  Form  from 'react-bootstrap/Form'
import { useHistory } from 'react-router'
import { getPayloadFromToken } from '../../../helpers/auth'
import Button  from 'react-bootstrap/Button'
import { setColourByNation } from '../../../helpers/helperFunctions'



const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const history = useHistory()
  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
    console.log(formData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.post('/api/auth/login/', formData)
    window.localStorage.setItem('token', response.data.token)
    const userID = getPayloadFromToken().sub
    const { data: user } = await axios.get(`api/auth/user/${userID}/`)

    localStorage.setItem('nation', user.nationality)
    setColourByNation()
    history.push('/books/')
    window.location.reload()
  }

  return (
    <>
      <Form className="login-box" onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              className="login-input"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={handleChange}
              className="login-input"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="field">
          <Button type="submit">
            Log In
          </Button>
        </Modal.Footer>
      </Form>
    </>
  )
}

export default Login
