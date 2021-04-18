import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Profile = () => {

  const [user, setUser] = useState(null)

  const userID = 1
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`api/auth/user/${userID}`)
      setUser(data)
    }
    getUser()
  },[])

  if(!user) return null
  console.log('🚀 ~ file: Profile.js ~ line 18 ~ Profile ~ user', user)
  const { username, email, profile_image, date_joined, nationality } = user
  return (
    <>
    <h1>User Profile Page</h1>
    <div className="profile-container">
      <div className="profile-info-left"><img className="profile-pic" src={profile_image} alt={`user profile pic for ${username}`}/></div>
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
          <p>{date_joined}</p>
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
    </>

  )
}

export default Profile
