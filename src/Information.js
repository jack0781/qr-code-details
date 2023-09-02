import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {Data} from './Components/Data'

const Information = () => {
  const location = useLocation()
  const userInfo = location.search
    ? JSON.parse(
        decodeURIComponent(new URLSearchParams(location.search).get('user')),
      )
    : null

  useEffect(() => {
    // Handle the user information, e.g., store it in state or perform any required actions
    if (userInfo) {
      // Do something with userInfo, e.g., set it in state
    }
  }, [userInfo])

  return (
    <div>
      <h2>User Information</h2>
      {userInfo ? <Data data={userInfo} /> : <p>No user information found.</p>}
    </div>
  )
}

export default Information
