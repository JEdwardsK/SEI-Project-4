import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CharacterCard from './CharacterCard'



const AntagonistIndex = () => {
  const [allAntagonists, setAllAntagonists] = useState(null)

  useEffect(() => {
    const getAntagonists = async () => {
      const { data } = await axios.get('/api/antagonists')
      setAllAntagonists(data)
    }
    getAntagonists()
  }, [])


  if (!allAntagonists) return null

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
