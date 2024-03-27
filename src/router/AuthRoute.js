// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Route, redirect as Redirect, Outlet, useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../helper/authFunctions';

const AuthRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    let tempIsLoggedIn = isUserLoggedIn()
    console.log(tempIsLoggedIn);
    setIsLoggedIn(isUserLoggedIn())
    if (isUserLoggedIn()) {
      navigate('')
    }
  }, [])

  return (<>
    {
      !isLoggedIn
      ?<Outlet />
      :null
    }
  </>)
};

export default AuthRoute;
