import React, { useEffect, useState } from "react";
import ProfilePopup from "../../components/ProfilePopup";
import { cartPng, mainLogo } from "../../assets/images/index";
import { isUserLoggedIn, getAccessToken, userLogout, removeAccessToken } from '../../helper/authFunctions.js'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setAuthState } from "../../redux/auth/slice";

const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { profileData, profileDataError, profileDataLoading } = useSelector((store) => ({
    profileData: store.authSlice.profileData.data,
    profileDataLoading: store.authSlice.profileData.loading,
    profileDataError: store.authSlice.profileData.error
  }))

  const makeUserLogout = () => {
    removeAccessToken()
    // dispatch(logoutUser())
    dispatch(setAuthState([
      {key: 'loginData', value:{}}
    ]))
    navigate('/')
  }
  return (
    <header className="z-[999] container sticky flex items-center justify-between px-8 py-4 mx-auto mt-4 mb-10 bg-white rounded-md top-5 shadow-theme">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start gap-8">
          <Link to="/" className="text-xl font-semibold">
            <img className="w-48 h-16" src={mainLogo} alt="main logo" />
          </Link>
          <ul className="flex items-center justify-start font-semibold">
            <li className="px-4 border-l-2 border-dark-gray">
              <Link className="text-base hover:underline" to="/">All Products</Link>
            </li>
            {
              (isUserLoggedIn() && profileData?.user) &&
              <li className="px-4 border-l-2 border-dark-gray">
                <Link className="text-base hover:underline" to="my-product">My Products</Link>
              </li>
            }
          </ul>
        </div>
        <div className="flex items-center justify-end gap-4">
          {
            (profileDataLoading && !profileData?.user)
            ?<></>
            :<div className="flex items-center justify-end">
              {
                (isUserLoggedIn() && profileData?.user)
                  ? <>
                    <button className='flex items-center justify-end gap-4'>
                      <div className='block'>
                        <p className='text-base font-medium text-end'>{profileData.user?.username}</p>
                        <p className='text-xs font-medium text-end'>{profileData.user?.email}</p>
                      </div>
                      <span className='flex items-center justify-center w-12 h-12 font-bold rounded-full bg-gray'>{String(profileData.user?.username).slice(0, 1)}</span>
                    </button>
                    <div className="flex items-center mx-6">
                      <span className="py-3 border-l-2 border-dark-gray"></span>
                      <Link to="/cart" className="relative px-4">
                        <img width={35} src={cartPng} alt="cart" />
                        <span className="absolute right-0 flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-black rounded-full leading-0 -top-2">
                          {profileData.cartListCount ?? 0}
                        </span>
                      </Link>
                    </div>
                    <button onClick={makeUserLogout} className="pl-4 text-base font-semibold border-l-2 hover:underline border-dark-gray">Log Out</button>
                  </>
                  : <>
                    <Link className="border-l-2 btn-primary border-dark-gray" to="/login">Log In</Link>
                  </>
              }
            </div>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
