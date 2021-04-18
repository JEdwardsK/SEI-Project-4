import React, { useState } from 'react'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
    console.log(formData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
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
