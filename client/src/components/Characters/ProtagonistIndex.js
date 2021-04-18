import axios from 'axios'
import React, { useEffect, useState } from 'react'




const ProtagonistIndex = () => {
  const [allProtagonists, setAllProtagonists] = useState(null)
  useEffect(() => {
    const getProtagonists = async () => {
      const { data } = await axios.get('/api/protagonists')
      setAllProtagonists(data)
    }
    getProtagonists()
  }, [])


  if(!allProtagonists) return null
  console.log(allProtagonists)
  return (
    <div>hello world</div>
  )
}

export default ProtagonistIndex
