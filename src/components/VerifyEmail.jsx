import React, { useEffect, useState } from 'react'

const VerifyEmail = ({resendTime, sendEmail}) => {
    const [resendEmailTime, setResendEmailTime] = useState(120)

    useEffect(() => {
        if (resendEmailTime !== 0) {
            setTimeout(() => {
              setResendEmailTime(resendEmailTime - 1)
            }, 960);
        }
    }, [resendEmailTime])

    return (
        <div className='w-full max-w-xl px-10 py-6 py-10 bg-white rounded-lg shadow-xl'>
            <p>we had sended you verification email, verify you email</p>
            <p>resend Email after <span>{resendEmailTime ? Math.floor(resendEmailTime/60) : 0}</span>:<span>{resendEmailTime? (resendEmailTime%60) :0}</span></p>
            <button className='btn-primary' onClick={sendEmail}>Resend Email</button>
        </div>
    )
}

export default VerifyEmail