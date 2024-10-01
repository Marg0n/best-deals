import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cartIteams: [],
    cartTotalQuantity: 0,
    cartTotalAmmount: 0
}

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {

        // add products in cart list
        addToCart(state, action) {

            // checking the product is already in the cart array?
            const iteamIndex = state.cartIteams.findIndex(
                (item) => item._id === action.payload._id
            )
            if (iteamIndex >= 0) {
                // state.cartIteams[iteamIndex].cartQuantity++
                toast(`This Iteam Already in Your cart!`, {
                    icon: '👀',
                });
            }
            else {
                const tempProducts = { ...action.payload, cartQuantity: action.payload.cartQuantity };
                toast.success('Added to the cart')
                state.cartIteams.push(tempProducts)
            }
        },

        // increment porduct quantity
        incrementQuantity(state, action) {
            const itemIndex = state.cartIteams.findIndex(
                (item) => item._id === action.payload
            );
            if (state.cartIteams[itemIndex].cartQuantity >= 1) {
                state.cartIteams[itemIndex].cartQuantity++;
            }
        },

        // Decrement item quantity
        decrementQuantity(state, action) {
            const itemIndex = state.cartIteams.findIndex(
                (item) => item._id === action.payload
            );
            if (state.cartIteams[itemIndex].cartQuantity > 1) {
                state.cartIteams[itemIndex].cartQuantity--;
                console.log(state.cartIteams[itemIndex].cartQuantity);   
            }
            else{
                
            }
        },

        // Remove item from cart
        removeFromCart(state, action) {
            const nextCartItems = state.cartIteams.filter(
                (item) => item._id !== action.payload
            );
            state.cartIteams = nextCartItems;
            toast.success('Item removed')
        },



    }
})

export const { addToCart, decrementQuantity, incrementQuantity, removeFromCart } = cartSlice.actions
export default cartSlice.reducer