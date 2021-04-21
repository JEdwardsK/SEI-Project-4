/*eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'



const Register = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    nationality: '',
  })

  const handleChange = (event) => {
    console.log(event.target.value)
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
    console.log(formData)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    window.alert(JSON.stringify(formData, null, 2))
    try {
      const response = await axios.post('/api/auth/register/', formData)
      console.log(response)
      history.push('/login')
    } catch (err) {
      console.log(err.response)
    }
  }
  const nationalityOptions = [
    { value: 'fire', label: 'Fire Nation' },
    { value: 'earth', label: 'Earth Kingdom' },
    { value: 'air', label: 'Air Nomads' },
    { value: 'water', label: 'Water Tribes' }
  ]

  const handleSelect = (selected, name) => {
    const selection = selected.value
    setFormData({ ...formData, [name]: selection })
  }
  return (
    <>



      <Form onSubmit={handleSubmit}>
        <Form.Label>Register Form</Form.Label>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="enter your username" name="username" value={formData.value} onChange={handleChange} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="enter your email" name="email"  onChange={handleChange} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="enter your password" name="password"  onChange={handleChange} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Nation</Form.Label>
          <Select
            name="nationality"
            options={nationalityOptions}
            components={makeAnimated()}
            onChange={(selected) => handleSelect(selected, 'nationality')}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type="password" placeholder="re-enter your password" name="password_confirmation"  onChange={handleChange} required/>
        </Form.Group>
        <Button type="submit">Register</Button>

      </Form>
    </>
  )
}

export default Register
