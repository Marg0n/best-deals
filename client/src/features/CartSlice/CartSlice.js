import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


const initialState = {
    cartIteams: [],
    cartTotalQuantity: 0,
    cartTotalAmmount: 0
}

const userEmail = localStorage.getItem('userEmail')
console.log(userEmail);


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
                state.cartIteams.push(tempProducts)
                const cartItem = { userEmail, cartProducts: state.cartIteams };
                 axios.post(`${import.meta.env.VITE_SERVER}/cartList`, cartItem)
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.message) {
                            // dispacth(removeAllFromCartlist())
                            // loggedOut()
                            toast.success('Added to the cart')
                            // localStorage.clear()
                        }
                    })
                    .catch((error) => {
                        // If the error response exists, display the message from the server
                        if (error.response) {
                            const errorMessage = error.response.data;
                            toast.error(errorMessage); // Show the server's error message in a toast
                        }
                    });
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
            else {

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



        // set cart data from db
        setCartData: (state, action) => {
            state.cartIteams = action.payload; // Update cart items with fetched data
        },
        // Remove all items from cartList
        removeAllFromCartlist(state) {
            state.cartIteams = [];
        },


    }
})

export const { addToCart, decrementQuantity, incrementQuantity, removeFromCart, removeAllFromCartlist, setCartData } = cartSlice.actions
export default cartSlice.reducer