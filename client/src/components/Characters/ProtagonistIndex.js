import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CharacterCard from './CharacterCard'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { setColourByNation } from '../../helpers/helperFunctions'



const ProtagonistIndex = () => {
  setColourByNation()
  const [allProtagonists, setAllProtagonists] = useState(null)
  useEffect(() => {
    const getProtagonists = async () => {
      const { data } = await axios.get('/api/protagonists')
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
  console.log(allProtagonists)
  return (
    <>
      <h1>Protagonists</h1>
      {allProtagonists.map(character => {
        return <CharacterCard key={character.index} character={character} />
      })}
    </>

  )
}

export default ProtagonistIndex
