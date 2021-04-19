import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CharacterCard from './CharacterCard'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'


const SupportingCharacterIndex = () => {
  const [allSupportingCharacters, setAllSupportingCharacters] = useState(null)

  useEffect(() => {
    const getSupportingCharacters = async () => {
      const { data } = await axios.get('/api/supporting_characters')
      setAllSupportingCharacters(data)
    }
    getSupportingCharacters()
  }, [])


  if (!allSupportingCharacters) return (
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
      <h1>Supporting Characters</h1>
      {allSupportingCharacters.map(character => {
        return <CharacterCard key={character.id} character={character} />
      })}
    </>
  )
}

export default SupportingCharacterIndex
