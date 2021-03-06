import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CharacterCard from './CharacterCard'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import CardColumns from 'react-bootstrap/CardColumns'
import { setColourByNation } from '../../helpers/helperFunctions'


const SupportingCharacterIndex = () => {
  setColourByNation()
  const [allSupportingCharacters, setAllSupportingCharacters] = useState(null)
  useEffect(() => {
    const getSupportingCharacters = async () => {
      const { data } = await axios.get('/api/supporting_characters/')
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
      <h1 className='character-header background'>Supporting Characters</h1>
      <CardColumns className='background'>
        {allSupportingCharacters.map(character => {
          return (
            <CharacterCard characterType='supporting' key={character.id} character={character} />
          )
        })}
      </CardColumns>

    </>
  )
}

export default SupportingCharacterIndex
