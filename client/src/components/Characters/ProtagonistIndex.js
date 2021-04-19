import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CharacterCard from './CharacterCard'



const ProtagonistIndex = () => {
  const [allProtagonists, setAllProtagonists] = useState(null)
  useEffect(() => {
    const getProtagonists = async () => {
      const { data } = await axios.get('/api/protagonists')
      setAllProtagonists(data)
    }
    getProtagonists()
  }, [])


  if (!allProtagonists) return null
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
