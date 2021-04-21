import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CharacterCard from './CharacterCard'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { setColourByNation } from '../../helpers/helperFunctions'



const AntagonistIndex = () => {
  setColourByNation()
  const [allAntagonists, setAllAntagonists] = useState(null)

  useEffect(() => {
    const getAntagonists = async () => {
      const { data } = await axios.get('/api/antagonists')
      setAllAntagonists(data)
    }
    getAntagonists()
  }, [])


  if (!allAntagonists) return (
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
  console.log('the data>>>>', allAntagonists)
  return (
    <>
      <h1>Antagonists</h1>
      {allAntagonists.map(character => {
        return <CharacterCard key={character.id} character={character} />
      })}
    </>
  )
}

export default AntagonistIndex
