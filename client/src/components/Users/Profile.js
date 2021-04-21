import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getPayloadFromToken } from '../../helpers/auth'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import CharacterSubmit from '../Forms/CharacterSubmit'
import { setColourByNation } from '../../helpers/helperFunctions'

const Profile = () => {
  setColourByNation()
  const [user, setUser] = useState(null)

  const userID = getPayloadFromToken().sub
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`api/auth/user/${userID}`)
      setUser(data)
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
  console.log('🚀 ~ file: Profile.js ~ line 18 ~ Profile ~ user', user)
  const { username, email, profile_image: profileImage, date_joined: dateJoined, nationality } = user
  return (
    <>
      <h1>User Profile Page</h1>
      <div className="profile-container">
        <div className="profile-info-left"><img className="profile-pic" src={profileImage} alt={`user profile pic for ${username}`}/></div>
        <div className="profile-info-right">
          <div className="profile-info-right-sections">
            <h3>Username</h3>
            <p>{username}</p>
          </div>
          <div className="profile-info-right-sections">
            <h3>Email</h3>
            <p>{email}</p>
          </div>
          <div className="profile-info-right-sections">
            <h3>Member Since</h3>
            <p>{dateJoined}</p>
          </div>
          <div className="profile-info-right-sections">
            <h3>Nation</h3>
            <p>{nationality}</p>
          </div>
        </div>
      </div>
      <div>
        <h2>Reviews</h2>
        <p>input reviews here if desired</p>
      </div>
      <div>
        <h2>Recently Viewed</h2>
        <p> input recently viewed pages using history from local storage?? display using grid or carousel</p>
      </div>
      <div>
        <h2>Completed Searches</h2>
        <p>enter completed searches here</p>
      </div>

      <CharacterSubmit characterType='protagonist'/>
    </>


  )
}

export default Profile
