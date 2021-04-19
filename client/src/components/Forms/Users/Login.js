import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

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
    history.push('/')
    window.location.reload()
    console.log(response)
  }

  return (
    <>

      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <div className="login-input-box">
          <input
            className="login-input"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="login-input-box-pass">
          <input
            onChange={handleChange}
            className="login-input"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
          />
        </div>
        <div className="field">
          <button
            type="submit"
            className="button login-button is-fullwidth "
          >
                      Log In
          </button>
        </div>
      </form>
    </>
  )
}

export default Login
