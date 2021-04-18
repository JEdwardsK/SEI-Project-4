import axios from 'axios'
import React, { useEffect, useState } from 'react'


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
  console.log('🚀 ~ file: SupportingCharacterIndex.js ~ line 18 ~ SupportingCharacterIndex ~ allSupportingCharacters', allSupportingCharacters)

  return (
    <div>hello world</div>
  )
}

export default SupportingCharacterIndex
