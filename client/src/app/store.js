import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../features/CartSlice/CartSlice";


const store = configureStore({
    reducer: {
        cart: CartReducer,
    }

});




export default store;