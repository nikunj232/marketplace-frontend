import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import { isUserLoggedIn } from '../../helper/authFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileUser } from '../../redux/auth/slice'

const DefaultLayout = ({ children }) => {

  const dispatch = useDispatch()
  const location = useLocation();
  const [isHeaderVisible, setisHeaderVisible] = useState(true)

  const { isProfileLoading, profileData } = useSelector((store) => ({
    isLoginLoading: store.profileSlice?.loading,
    profileData: store.profileSlice?.loginData
  }))

  useEffect(() => {
    if (isUserLoggedIn()) {
      dispatch(getProfileUser())
    }
  }, [])

  React.useEffect(() => {
    console.log('Route changed:', location.pathname);
  }, [location]);


  useEffect(() => {
    console.log("location changes");
    let path = location.pathname
    if (path.includes('login') || path.includes('signup') || path.includes('verify-email')) {
      setisHeaderVisible(false)
    }else{
      setisHeaderVisible(true)
    }
  }, [location])

  return (
    <>
      {
        isHeaderVisible
        && <Header />
      }
      <Outlet/>
    </>
  )
}

export default DefaultLayout