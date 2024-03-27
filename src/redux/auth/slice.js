
import {  createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { axiosApi } from "../../helper/axiosApi.js"
import initialStates from "./state"
import { setProfileComplateStatus, setAccessToken } from "../../helper/authFunctions"
import _ from "lodash"

// ** Login Post
export const loginUser = (data) => async (dispatch) => {
    try {
        dispatch(setAuthState(
            {key: 'loading', value:true}
        ))
        const response = await axiosApi.post('auth/login', {...data})
        if (response) {
            setAccessToken(response.data.tokens.access.token)
            setProfileComplateStatus(false)
            axiosApi.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${response?.data?.tokens?.access?.token}`
        }
        setTimeout(() => {
            toast.success(response.data.message)
            dispatch(setAuthState([
                {key: 'loading', value:false},
                {key: 'loginData', value:response.data?.user}
            ]))
        }, 1000);
    } catch (error) {
        if (!error) {
            throw error.response
        }
        toast.error(error.response?.data.message)
        dispatch(setAuthState([
            {key: 'loading', value: false},
            {key: 'loginData', value: null},
            {key: 'error', value: false}
        ]))
    }
}

// ** Login Post
export const getProfileUser = () => async (dispatch) => {
    try {
        dispatch(setAuthState(
            {key: 'profileData.loading', value:true},
            {key: 'profileData.data', value:null},
            {key: 'profileData.error', value:false}
        ))
        const response = await axiosApi.get('auth/access-token')
        setTimeout(() => {
            dispatch(setAuthState([
                {key: 'profileData.loading', value:false},
                {key: 'profileData.data', value:response.data?.data}
            ]))
        }, 1000);
    } catch (error) {
        if (!error) {
            throw error.response
        }
        toast.error(error.response?.data.message)
        dispatch(setAuthState([
            {key: 'profileData.loading', value: false},
            {key: 'profileData.data', value: null},
            {key: 'profileData.error', value: false}
        ]))
    }
}

// ** Login Post
export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(setAuthState(
            {key: 'logoutData.loading', value:true},
            {key: 'logoutData.data', value:null},
            {key: 'logoutData.error', value:false}
        ))
        const response = await axiosApi.post('auth/logout')
        setTimeout(() => {
            // toast.success(response.data.message ?? "You're successfully logged out!")
            dispatch(setAuthState([
                {key: 'logoutData.loading', value:false},
                {key: 'logoutData.data', value:response.data?.data},
                {key: 'loginData', value:{}}
            ]))
        }, 1000);
    } catch (error) {
        if (!error) {
            throw error.response
        }
        dispatch(setAuthState([
            {key: 'logoutData.loading', value: false},
            {key: 'logoutData.data', value: null},
            {key: 'logoutData.error', value: false}
        ]))
    }
}


export const authSlice = createSlice({
    name: 'auth',
    initialState: initialStates,
    reducers: {
        setAuthState: (state, { payload }) => {
            if (Array.isArray(payload)) {
                for (const obj of payload) {
                    _.set(state, obj.key, obj.value)
                }
            } else {
                _.set(state, payload.key, payload.value)
            }
        }
    }
})

const { reducer } = authSlice
export const { setAuthState } = authSlice.actions
export default reducer