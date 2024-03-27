
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import _ from "lodash"
import { axiosApi } from "../../helper/axiosApi.js"
import initialStates from "./state.js"
import { setProfileComplateStatus, setAccessToken } from "../../helper/authFunctions.js"

// ** cartItem list
export const getCartItemList = (data) => async (dispatch) => {
    try {
        dispatch(setCartState(
            {key: 'cartItemList.loading', value:true},
            {key: 'cartItemList.error', value:false},
            {key: 'cartItemList.data', value:null}
        ))
        const response = await axiosApi.post('cart/get-cart-item')
        toast.success(response.data.message)
        dispatch(setCartState([
            {key: 'cartItemList.loading', value:false},
            {key: 'cartItemList.data', value:response.data}
        ]))
    } catch (error) {
        if (error) {
            throw error
        }
        toast.error(error.response?.data.message)
        dispatch(setCartState([
            {key: 'cartItemList.loading', value: false},
            {key: 'cartItemList.data', value: null},
            {key: 'cartItemList.error', value: true}
        ]))
    }
}
// ** add to cart
export const addProductToCart = (productId) => async (dispatch) => {
    try {
        dispatch(setCartState(
            {key: 'addToCartItemData.loading', value:true},
            {key: 'addToCartItemData.error', value:false},
            {key: 'addToCartItemData.data', value:null}
        ))
        const response = await axiosApi.post(`cart/add-to-cart/${productId}`)
        toast.success(response.data.message)
        dispatch(setCartState([
            {key: 'addToCartItemData.loading', value:false},
            {key: 'addToCartItemData.data', value:response.data}
        ]))
    } catch (error) {
        if (error) {
            throw error
        }
        toast.error(error.response?.data.message)
        dispatch(setCartState([
            {key: 'addToCartItemData.loading', value: false},
            {key: 'addToCartItemData.data', value: null},
            {key: 'addToCartItemData.error', value: true}
        ]))
    }
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialStates,
    reducers: {
        setCartState: (state, { payload }) => {
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

const { reducer } = cartSlice
export const { setCartState } = cartSlice.actions
export default reducer