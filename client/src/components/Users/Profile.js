import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getPayloadFromToken } from '../../helpers/auth'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { setColourByNation } from '../../helpers/helperFunctions'

const Profile = () => {
  const [user, setUser] = useState(null)
  const userID = getPayloadFromToken().sub
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`api/auth/user/${userID}/`)
      setUser(data)
      setColourByNation()
    }
    getUser()
  },[userID])

  if (!user) return (
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
  const { username, email, date_joined: dateJoined, nationality } = user
  return (
    <>
      <h1 className='character-header'>User Profile Page</h1>
      <div className="profile-container">
        <div className="profile-info-left"><div className="profile-image"></div></div>
        <div className="profile-info-right">
          <div className="profile-info-right-sections">
            <h3 className='profile-h3-right'>Username: {username}</h3>
          </div>
          <div className="profile-info-right-sections">
            <h3 className='profile-h3-right'>Email: {email}</h3>
          </div>
          <div className="profile-info-right-sections">
            <h3 className='profile-h3-right'>Member Since: {dateJoined}</h3>
          </div>
          <div className="profile-info-right-sections">
            <h3 className='profile-h3-right'> Nation: {nationality}</h3>
          </div>
        </div>
      </div>
    </>


  )
}

export default Profile
