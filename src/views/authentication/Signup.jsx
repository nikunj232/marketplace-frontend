import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { hidePng, mainLoaderGif, mainLogo, visiblePng } from "../../assets/images/index.js";
import { axiosApi } from "../../helper/axiosApi.js";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import CustomLoader from '../../components/CustomLoader.jsx';

const signupValidationSchema = Yup.object().shape({
  email: Yup.string().trim().required("Email is required"),
  username: Yup.string().trim().min(3, "Username must required 3 character!").required("Username is required"),
  password: Yup.string().min(8, 'Password must be atleast 8 character.').trim().required("Password is required"),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required("Confirm password is required")
})
const Signup = () => {
  const [formikState, setFormikState] = useState({
    email:'',
    username:'',
    password:'',
    confirmPassword:''
  })
  const [isPasswordView, setisPasswordView] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmPasswordView, setIsConfirmPasswordView] = useState(false)
  const [signupResData, setSignupResData] = useState()
  const navigate = useNavigate()
  const handlePasswordViewChange = () => {
    setisPasswordView(!isPasswordView)
  }

  const handleConfirmPasswordViewChange = () => {
    setIsConfirmPasswordView(!isConfirmPasswordView)
  }
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur
  } = useFormik({
    initialValues:formikState,
    validationSchema:signupValidationSchema,
    onSubmit:(data, {resetForm}) => signupUser(data, resetForm)
  })

  const signupUser = async (data, resetForm) => {
    setIsLoading(true)
    let signupFormData = new FormData()
    const {username, email, password} = data
    try {
      const signupData = await axiosApi.post("auth/register", {username, email, password})
      navigate('/login')
      setTimeout(() => {
        toast.success(signupData.data.message)
        // toast.success("We have sended you one email verification link on your email!")
        setIsLoading(false)
      }, 500);
    } catch (error) {
      toast.error(error.response.data.message ?? 'Something went wrong...!')
      setIsLoading(false)
    }
  }

  return (
    <>
        {
          isLoading
          &&<CustomLoader/>
        }
      <div className="relative flex items-center justify-center w-full h-screen">
        <div className="w-full max-w-[600px] px-10 py-6 bg-white rounded-lg shadow-xl">
          <div className='flex items-center justify-center mb-10'>
            <Link to="/">
              <img src={mainLogo} alt="Logo" />
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <h1 className="mb-6 text-3xl font-semibold">Signup</h1>
            <div className="mb-4">
              <label className="block text-lg font-semibold" htmlFor="emailField">
                Email
              </label>
              <div className="relative border-2 rounded-lg focus:border-dark-gray border-gray">
                <input
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border-none rounded-lg border-gray"
                  id="emailField"
                  type="email"
                />
              </div>
              <p className="text-sm text-red">{errors.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold" htmlFor="usernameField">
                Fullname
              </label>
              <div className="relative border-2 rounded-lg focus:border-dark-gray border-gray">
                <input
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border-none rounded-lg border-gray"
                  id="usernameField"
                  type="text"
                />
              </div>
              <p className="text-sm text-red">{errors.user}</p>
            </div>
            <div className='mb-4'>
              <label className="block text-lg font-semibold" htmlFor="passwordField">
                Password
              </label>
              <div className="relative border-2 rounded-lg focus:border-dark-gray border-gray">
                <input
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 !border-none rounded-lg"
                  id="passwordField"
                  type={isPasswordView ? "text" : "password"}
                />
                <button onClick={handlePasswordViewChange} className="z-[9999] absolute top-1/2 right-4 -translate-y-1/2">
                  <img className="w-6" src={isPasswordView ? hidePng : visiblePng} alt="view" />
                </button>
              </div>
              <p className="text-sm text-red">{errors.password}</p>
            </div>
            <div className='mb-6'>
              <label className="block text-lg font-semibold" htmlFor="confirmPasswordField">
                Confirm Password
              </label>
              <div className="relative border-2 rounded-lg focus:border-dark-gray border-gray">
                <input
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 !border-none rounded-lg"
                  id="confirmPasswordField"
                  type={isConfirmPasswordView ? "text" : "password"}
                />
                <button onClick={handleConfirmPasswordViewChange} className="z-[9999] absolute top-1/2 right-4 -translate-y-1/2">
                  <img className="w-6" src={isConfirmPasswordView ? hidePng : visiblePng} alt="view" />
                </button>
              </div>
              <p className="text-sm text-red">{errors.confirmPassword}</p>
            </div>
            <div className="flex items-center justify-center mb-4 ">
              <button className="px-6 py-3 font-semibold text-white rounded-lg bg-primary" type="submit">Sign Up</button>
            </div>
          </form>
          <div className="flex items-center justify-center gap-2">
            <p className="text-base">Do you have account?</p>
            <Link className="text-lg font-semibold text-primary" to={"/login"}>Log In</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup