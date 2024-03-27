import React from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import { isUserLoggedIn } from '../../helper/authFunctions'

const AuthLayout = ({children}) => {

    return (
        <>
            {children
            }
        </>
    )
}

export default AuthLayout