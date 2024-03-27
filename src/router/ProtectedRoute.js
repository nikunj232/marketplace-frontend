import React, { useEffect, useState } from 'react'
import { isUserLoggedIn } from '../helper/authFunctions'
import { Outlet, useNavigate, useNavigation } from 'react-router-dom'

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn())
    if (!isUserLoggedIn()) {
      navigate('')
    }
  }, [])

  return (
    <>
      {
        isLoggedIn
        ? <Outlet/>
        :null
      }
    </>
  )
}

export default ProtectedRoute