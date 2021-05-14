import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import BookSubmit from '../forms/BookSubmit'
import Login from '../forms/users/Login'



const HomePage = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [riddleAnswer, setRiddleAnswer] = useState(0)
  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    nationality: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...registerFormData, [event.target.name]: event.target.value }
    setRegisterFormData(newFormData)
  }
  const handleSubmitRegister = async (event) => {
    event.preventDefault()
    handlePageTurn(event)
    try {
      await axios.post('/api/auth/register/', registerFormData)
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
    setRegisterFormData({ ...registerFormData, [name]: selection })
  }

  const handlePageTurn = (event) => {
    const { value } = event.target
    const page = parseInt(value)
    setPageNumber(page)
  }
  const handleRiddle = (event) => {
    const { value } = event.target
    const answer = parseInt(value)
    setRiddleAnswer(answer)
  }

  const entryPages = [8,9]
  return (
    <Card className='trim'>
      <div className="homepage-container secondary">
        <div className="homepage-container-sections-left">
          <div className="homepage-wan-shi-image">
          </div>
          <div className="homepage-text">

            { pageNumber === 0 &&
                <>
                  <p>
                    Welcome, Humans, to my Library. I am Wan Shi Tong, He who Knows Ten Thousand Things
                  </p>
                  <p>
                To enter my library you must prove your worth as scholars
                  </p>
                </>
            }
            { pageNumber === 1 &&
              <>
                <p>A Book you say? My Knowledge Seekers are quite thorough, I doubt you possess something they have not found...</p>
                <p>Very well I will se your book, though I am not expecting much. Oh, I suppose I should ask who you are...</p>
              </>
            }
            { pageNumber === 2 &&
              <>
                <p>Hmm... that does not sound like an actual name...</p>
                <p>Nevermind, what nation are you from?</p>
              </>
            }
            { pageNumber === 3 &&
              <>
                <p>So that Book you have, tell me about it</p>

              </>
            }
            { pageNumber === 4 || pageNumber === 7 &&
              <>
                <p>I suppose that will do...</p>
                <p> You may enter
                  { pageNumber === 7 &&
                  <>
                  , however you will receive no assistance until you tell me who you are
                  </>
                  }
                </p>
              </>
            }
            { pageNumber === 5 &&
              <>
                <p>Forgive me, you all look so alike</p>
                <p>Who are you again?</p>

              </>
            }
            { pageNumber === 6 && riddleAnswer === 0 &&
              <>
                <p>You wish to show your knowledge?</p>
                <p>Very well, riddle me this</p>
                <p>I make two people out of one, what am I ?</p>

              </>

            }
            { riddleAnswer === 1 ?
              <>
                <p>Your not very smart, are you?</p>
              </>
              : riddleAnswer === 2 ?
                <>
                  <p>No.</p>
                </>
                : riddleAnswer === 3 ?
                  <>
                    <p>*Sigh*</p>
                  </>
                  : null

            }
            { entryPages.includes(pageNumber) &&
                <>

                  { pageNumber !== 4 &&
                    <p>
                      {'If you\'re going to'}
                      {pageNumber === 9 ? <> lie to </> : <> try to sneak past </> }
                      <>
                      an All-Knowing spirit being, you should should at least put some effort into it
                      </>
                    </p>
                  }


                  <p>*Sigh... you may enter</p>

                  { pageNumber !== 4 &&
                    <p>However, you will receive no assistance until you tell me who you are</p>
                  }

                </>
            }

          </div>
        </div>
        <div className="homepage-container-sections-right">
          { pageNumber === 0 &&
              <>

                <Button className= "page-zero-button primary" onClick={handlePageTurn} value="1">Provide a book to the Library</Button>
                <Button className= "page-zero-button primary" onClick={handlePageTurn} value="6">Prove your Knowledge by Answering a Riddle</Button>
                <Button className= "page-zero-button primary" onClick={handlePageTurn} value="8">Sneak into the Library</Button>
                <Button className= "page-zero-button primary" onClick={handlePageTurn} value="5"> {'I\'ve been here before!!'}</Button>

              </>
          }
          { pageNumber === 1 &&
              <>
                <div className="homepage-container-sections">

                  <Form>
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" placeholder="enter your username" name="username" value={registerFormData.username} onChange={handleChange} required/>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="enter your email" name="email"  value={registerFormData.email} onChange={handleChange} required/>
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
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="enter your password" name="password"  value={registerFormData.password} onChange={handleChange} required/>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password Confirmation</Form.Label>
                      <Form.Control type="password" placeholder="re-enter your password" name="password_confirmation" value={registerFormData.password_confirmation}  onChange={handleChange} required/>
                      <Button onClick={handleSubmitRegister} value="3">Answer his questions</Button>
                      <p>OR...</p>
                      <Button onClick={handlePageTurn} value="8" >sneak into the library</Button>
                    </Form.Group>
                  </Form>

                </div>
              </>
          }

          { pageNumber === 2 &&
            <div className="homepage-container-sections">
              <Button value="3"onClick={handlePageTurn}>Water Tribe</Button>
              <Button value="3"onClick={handlePageTurn}>Earth Kingdom</Button>
              <Button value="3"onClick={handlePageTurn}>Fire Nation</Button>
              <Button value="3"onClick={handlePageTurn}>Air Nomad</Button>
            </div>
          }
          { pageNumber === 3 &&
            <>
              <div className="homepage-container-sections">
                <BookSubmit isModal={false}/>
              </div>
              <div className="homepage-container-sections buttons-page-0">
                <Button onClick={handlePageTurn} value="4">Tell him you will talk about it inside after you have settled inside</Button>
              </div>
            </>
          }
          { entryPages.includes(pageNumber) &&
            <>

              <div className="homepage-container-sections enter-library">
                <Link to="/books/"><Button>Enter the Library</Button></Link>
              </div>
            </>
          }
          { pageNumber === 5 &&
            <>

              <div className="homepage-container-sections">
                <Login/>
              </div>
            </>
          }
          { pageNumber === 6 &&
            <>
              <div className="homepage-container-sections riddle-buttons">
                <Button value="1" onClick={handleRiddle}>A Surgeon</Button>
                <Button value="2" onClick={handleRiddle}>A Magician</Button>
                <Button value="3" onClick={handleRiddle}>A Identity Thief</Button>
                <Button value="7" onClick={handlePageTurn}>A Mirror</Button>
              </div>
              <div className="homepage-container-sections">
                <Button onClick={handlePageTurn} value="1">Give him a book instead</Button>
                <Button onClick={handlePageTurn} value="9">Make up an elaborate lie to get into the library for nothing</Button>

              </div>
            </>

          }
        </div>
      </div>
    </Card>

  )
}

export default HomePage
