/*eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import Register from '../Forms/Users/Register'
import Login from '../Forms/Users/Login'

const HomePage = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [riddleAnswer, setRiddleAnswer] = useState(0)

  const handlePageTurn = (event) => {
    const { value, name } = event.target
    const page = parseInt(value)
    setPageNumber(page)
    console.log(pageNumber + 1)
  }
  const handleRiddle = (event) => {
    const { value } = event.target
    const answer = parseInt(value)
    setRiddleAnswer(answer)
  }

  const entryPages = [4,7,8,9]
  return (
    <>
      <Button value="0" onClick={handlePageTurn}>Page One</Button>
      <h1>HOME PAGE</h1>
      <div className="homepage-container">
        <div className="homepage-container-sections">
          <div className="homepage-wan-shi-image">
            image of wan shi tong
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

                <p>
                  {'If you\'re going to'}
                  {pageNumber === 9 ? <> lie to </> : <> try to sneak past </> }
                  <>
                    an All-Knowing spirit being, you should should at least put some effort into it
                  </>
                </p>


                <p>*Sigh... you may enter</p>
                <p>However, you will receive no assistance until you tell me who you are</p>

              </>
            }

          </div>
        </div>
        { pageNumber === 0 &&
            <>
              <div className="homepage-container-sections buttons-page-0">
                <Button onClick={handlePageTurn} value="1">Provide a book to the Library</Button>
                <Button onClick={handlePageTurn} value="6">Prove your Knowledge by Answering a Riddle</Button>
                <Button onClick={handlePageTurn} value="8">Sneak into the Library</Button>
                <Button onClick={handlePageTurn} value="5"> {'I\'ve been here before!!'}</Button>
              </div>
            </>
        }
        { pageNumber === 1 &&
            <>
              <div className="homepage-container-section">
                <Register />
              </div>
              <div className="homepage-container-sections">
                <button onClick={handlePageTurn} value="2">answer his questions</button>
                <p>OR...</p>
                <button onClick={handlePageTurn} value="8" >sneak into the library</button>
              </div>
            </>
        }

        { pageNumber === 2 &&
          <div className="homepage-container-sections">
            <button value="3"onClick={handlePageTurn}>Water Tribe</button>
            <button value="3"onClick={handlePageTurn}>Earth Kingdom</button>
            <button value="3"onClick={handlePageTurn}>Fire Nation</button>
            <button value="3"onClick={handlePageTurn}>Air Nomad</button>
          </div>
        }
        { pageNumber === 3 &&
          <>
            <div className="homepage-container-sections">
              <h2>Book Form part 1</h2>
            </div>
            <div className="homepage-container-sections">
              <button onClick={handlePageTurn} value="4">Answer his questions</button>
              <button onClick={handlePageTurn}>Tell him you will talk about it inside after you have settled inside</button>
            </div>
          </>
        }
        { entryPages.includes(pageNumber) &&
          <>

            <div className="homepage-container-sections">
              <Link to="/books/"><button>enter the Library</button></Link>
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
            <div className="homepage-container-sections">
              <button value="1" onClick={handleRiddle}>A Surgeon</button>
              <button value="2" onClick={handleRiddle}>A Magician</button>
              <button value="3" onClick={handleRiddle}>A Identity Thief</button>
              <button value="7" onClick={handlePageTurn}>A Mirror</button>
            </div>
            <div className="homepage-container-sections">
              <button onClick={handlePageTurn} value="1">Give him a book instead</button>
              <button onClick={handlePageTurn} value="9">Make up an elaborate lie to get into the library for nothing</button>

            </div>
          </>

        }
      </div>
    </>

  )
}

export default HomePage
