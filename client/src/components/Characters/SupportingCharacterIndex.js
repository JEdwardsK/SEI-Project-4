import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CharacterCard from './CharacterCard'


const SupportingCharacterIndex = () => {
  const [allSupportingCharacters, setAllSupportingCharacters] = useState(null)

  useEffect(() => {
    const getSupportingCharacters = async () => {
      const { data } = await axios.get('/api/supporting_characters')
      setAllSupportingCharacters(data)
    }
    getSupportingCharacters()
  }, [])


  if(!allSupportingCharacters) return null


  return (
    <>
    <h1>Supporting Characters</h1>
    {allSupportingCharacters.map(character => {
      return <CharacterCard character={character} />
    })}
    </>
  )
}

export default SupportingCharacterIndex
