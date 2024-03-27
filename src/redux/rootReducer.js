import { combineReducers } from "redux";
import authSlice from "./auth/slice";
import productSlice  from "./product/slice";
import cartSlice  from "./cart/slice";

const rootReducer = {
    authSlice,
    cartSlice,
    productSlice
}

export default rootReducer