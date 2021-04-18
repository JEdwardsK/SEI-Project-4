import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

const Register = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    nationality: 'earth',
  })

  const handleChange = (event) => {
    console.log(event.target.value)
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
    console.log(formData)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/register/', formData)
      console.log(response)
      history.push('/login')
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h2>Register Form</h2>
        <div className="register-input-container">
          <h4>Username</h4>
          <input type="text" placeholder="enter your username" name="username" value={formData.value} onChange={handleChange} required/>
        </div>
        <div className="register-input-container">
          <h4>Email</h4>
          <input type="email" placeholder="enter your email" name="email"  onChange={handleChange} required/>
        </div>
        <div className="register-input-container">
          <h4>Password</h4>
          <input type="password" placeholder="enter your password" name="password"  onChange={handleChange} required/>
        </div>
        {/* <div className="register-input-container">
          <h4>Nation</h4>
          <select name="nationality" required>
            <option value="fire">Fire Nation</option>
            <option value="earth">Earth Kingdom</option>
            <option value="air">Air Nomads</option>
            <option value="water">Water Tribes</option>
          </select>
        </div> */}
        <div className="register-input-container">
          <h4>Password Confirmation</h4>
          <input type="password" placeholder="re-enter your password" name="password_confirmation"  onChange={handleChange} required/>
        </div>
        <button type="submit">Register</button>

      </form>
    </div>
  )
}

export default Register
