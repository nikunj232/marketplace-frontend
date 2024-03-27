// import React, { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify/dist'

import { axiosApi } from '../../helper/axiosApi'
import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom/dist"

const VerifyEmailToken = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [token, setToken] = useState()
    const [emailVerificationData, setEmailVerificationData] = useState()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tempToken = searchParams.get('token');
        setToken(tempToken)
    }, [location])

    const verifyEmailToken = async () => {
        try {
            const verifyEmailToken = await axiosApi.post('auth/verify-email', {}, {
                params:{
                    token
                }
            })
            toast.success('Your email successfully verified!')
            if (response.data.success) {
                navigate('/login')
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (token) {
            verifyEmailToken()
        }
    }, [token])

    return (
        <div className='w-full max-w-xl px-10 py-6 py-10 bg-white rounded-lg shadow-xl'>
            <p>You email is successfully vrified.</p>
            <Link className="text-lg font-semibold text-primary" to="/login">Log In</Link>
        </div>
    )
}

export default VerifyEmailToken