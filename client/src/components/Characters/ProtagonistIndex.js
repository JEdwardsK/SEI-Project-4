import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CharacterCard from './CharacterCard'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import CardColumns from 'react-bootstrap/CardColumns'



const ProtagonistIndex = () => {
  const [allProtagonists, setAllProtagonists] = useState(null)
  useEffect(() => {
    const getProtagonists = async () => {
      const { data } = await axios.get('/api/protagonists/')
      setAllProtagonists(data)
    }
    getProtagonists()
  }, [])


  if (!allProtagonists) return (
    <Button disabled>
      <Spinner
        as="span"
        animation="border"
        role="status"
        aria-hidden="true"
      />
    Loading...
    </Button>
  )
  return (
    <>
      <h1 className='character-header background'>Protagonists</h1>
      <CardColumns className='background'>
        {allProtagonists.map(character => {
          return (
            <CharacterCard characterType='protagonist' key={character.id} character={character} />
          )
        })}
      </CardColumns>

    </>

  )
}

export default ProtagonistIndex
