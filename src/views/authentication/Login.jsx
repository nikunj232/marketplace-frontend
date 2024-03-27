import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { hidePng, mainLogo } from "../../assets/images/index.js";
import { visiblePng } from "../../assets/images/index.js";
import { useDispatch, useSelector } from "react-redux";
import { getProfileUser, loginUser } from "../../redux/auth/slice.js";
import VerifyEmail from "../../components/VerifyEmail.jsx";
import { Link, useNavigate } from "react-router-dom";
import CustomLoader from "../../components/CustomLoader.jsx";
import axios from "axios";
import { axiosApi } from "../../helper/axiosApi.js";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().trim().required(),
  password: Yup.string().trim().required()
})
const Login = () => {
  const [isFormSubmit, setIsFormSubmit] = useState(false)
  const dispatch = useDispatch()
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [formikState, setFormikState] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const [isPasswordView, setisPasswordView] = useState(false)
  const [resendEmailTime, setResendEmailTime] = useState(120)
  const [isLoading, setIsLoading] = useState(false)

  const handlePasswordViewChange = () => {
    setisPasswordView(!isPasswordView)
  }
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur
  } = useFormik({
    initialValues: formikState,
    validationSchema: loginValidationSchema,
    onSubmit: (data, { resetForm }) => postLogIn(data, resetForm)
  })

  const { isLoginLoading, loginData } = useSelector((store) => ({
    isLoginLoading: store.authSlice?.loading,
    loginData: store.authSlice?.loginData
  }))
  const store = useSelector((store) => store)

  useEffect(() => {
    setIsLoading(isLoginLoading)
    if (loginData?.id) {
      console.log("log inside login page in useEffect");
      navigate('/')
      dispatch(getProfileUser())
    } else {
      setIsEmailVerified(false)
      setIsFormSubmit(true)
    }
  }, [isLoginLoading, loginData])

  const sendVerificationemail = async () => {
    try {
      setIsLoading(true)
      const sendEmailData = await axiosApi.post('auth/send-verification-email')
      setResendEmailTime(120)
      setIsLoading(true)
    } catch (error) {
      setResendEmailTime(120)
      setIsLoading(true)
    }
  }
  const postLogIn = async (data, resetForm) => {
    setResendEmailTime(0)
    dispatch(loginUser(data))
    // resetForm()
  }

  return (
    <>
      {
        isLoading
        && <CustomLoader />
      }
      <div className="relative flex items-center justify-center w-full h-screen">
        <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-xl !min-w-[600px]">
          <div className='flex items-center justify-center mb-10'>
            <Link to="/">
              <img src={mainLogo} alt="Logo" />
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <h1 className="mb-6 text-3xl font-semibold">Login</h1>
            <div className="mb-4">
              <label className="block text-lg font-semibold" htmlFor="emailField">
                Email
              </label>
              <div className="relative border-2 rounded-lg focus:border-dark-gray border-gray">
                <input
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="w-full px-4 py-2 border-none rounded-lg border-gray"
                  id="emailField"
                  type="email"
                />
              </div>
              <p className="text-sm text-red">{errors.email}</p>
            </div>
            <div className="mb-6">
              <label className="block text-lg font-semibold" htmlFor="emailField">
                Password
              </label>
              <div className="relative border-2 rounded-lg focus:border-dark-gray border-gray">
                <input
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="w-full px-4 py-2 !border-none rounded-lg"
                  id="passwordField"
                  type={isPasswordView ? "text" : "password"}
                />
                <button type="button" onClick={handlePasswordViewChange} className="z-[9999] absolute top-1/2 right-4 -translate-y-1/2">
                  <img className="w-6" src={isPasswordView ? hidePng : visiblePng} alt="view" />
                </button>
              </div>
              <p className="text-sm text-red">{errors.password}</p>
            </div>
            <div className="flex items-center justify-center mb-4">
              <button className="px-6 py-3 font-semibold text-white rounded-lg bg-primary" type="submit">Login</button>
            </div>
          </form>
          <div className="flex items-center justify-center gap-2">
            <p className="text-base font-medium">Don't you have account?</p>
            <Link className="text-lg font-semibold text-primary" to={"/signup"}>Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
