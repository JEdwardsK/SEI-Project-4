import axios from 'axios'
import React, { useEffect, useState } from 'react'



const AntagonistIndex = () => {
  const [allAntagonists, setAllAntagonists] = useState(null)

  useEffect(() => {
    const getAntagonists = async () => {
      const { data } = await axios.get('/api/antagonists')
      setAllAntagonists(data)
    }
    getAntagonists()
  }, [])


  if(!allAntagonists) return null
  console.log(allAntagonists)
  return (
    <div>hello world</div>
  )
}

export default AntagonistIndex
