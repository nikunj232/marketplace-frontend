
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import _ from "lodash"
import { axiosApi } from "../../helper/axiosApi.js"
import initialStates from "./state.js"
import { setProfileComplateStatus, setAccessToken } from "../../helper/authFunctions.js"

// ** get my product
export const getMyProduct = ({page, limit}) => async (dispatch) => {
    // const { data, page } = data
    try {
        dispatch(setProductState([
            {key: 'myProductData.loading', value:true},
            {key: 'myProductData.error', value:true}
        ]))
        const response = await axiosApi.get('products/get-my-product-list', {
            params:{
                page, limit
            }
        })
        setTimeout(() => {
            dispatch(setProductState([
                {key: 'myProductData.loading', value:false},
                {key: 'myProductData.data', value:response.data.data}
            ]))
        }, 500);
    } catch (error) {
        toast.error(error.response?.data.message?? "Something went wrong")
        dispatch(setProductState([
            {key: 'myProductData.loading', value: false},
            {key: 'myProductData.data', value: null},
            {key: 'myProductData.error', value: false}
        ]))
    }
}
// ** add product
export const addProduct = (data) => async (dispatch) => {
    // const { data, page } = data
    try {
        dispatch(setProductState([
            {key: 'addProductData.loading', value:true},
            {key: 'addProductData.data', value:null},
            {key: 'addProductData.error', value:false}
        ]))
        const response = await axiosApi.post('products/create-product', data, {
        })
        setTimeout(() => {
            toast.success(response?.data?.message)
            dispatch(setProductState([
                {key: 'addProductData.loading', value:false},
                {key: 'addProductData.data', value:response?.data?.data}
            ]))
        }, 1000);
    } catch (error) {
        toast.error(error.response?.data.message?? "Something went wrong")
        dispatch(setProductState([
            {key: 'addProductData.loading', value: false},
            {key: 'addProductData.data', value: null},
            {key: 'addProductData.error', value: false}
        ]))
    }
}
// ** delete product
export const deleteProduct = (productId) => async (dispatch) => {
    // const { data, page } = data
    try {
        dispatch(setProductState([
            {key: 'deleteProductData.loading', value:true},
            {key: 'deleteProductData.data', value:null},
            {key: 'deleteProductData.error', value:false}
        ]))
        const response = await axiosApi.delete(`products/delete-product/${productId}`)
        setTimeout(() => {
            toast.success(response?.data?.message)
            dispatch(setProductState([
                {key: 'deleteProductData.loading', value:false},
                {key: 'deleteProductData.data', value:{success:true, productId}}
            ]))
        }, 500);
    } catch (error) {
        toast.error(error.response?.data.message?? "Something went wrong")
        dispatch(setProductState([
            {key: 'deleteProductData.loading', value: false},
            {key: 'deleteProductData.data', value: null},
            {key: 'deleteProductData.error', value: false}
        ]))
    }
}

export const productSlice = createSlice({
    name: 'product',
    initialState: initialStates,
    reducers: {
        setProductState: (state, { payload }) => {
            if (Array.isArray(payload)) {
                for (const obj of payload) {
                    if (obj.key === "myProductData.data" && obj?.value?.page > 1) {
                        _.set(state, obj.key, {
                            ...state.myProductData.data,
                            results:[
                                ...state.myProductData?.data?.results,
                                ...obj.value.results
                            ]
                        })
                    }else{
                        _.set(state, obj.key, obj.value)
                    }
                }
            } else {
                _.set(state, payload.key, payload.value)
            }
        }
    }
})

const { reducer } = productSlice
export const { setProductState } = productSlice.actions
export default reducer