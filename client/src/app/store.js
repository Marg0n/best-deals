import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../features/CartSlice/CartSlice";
import notificationReducer  from "../features/NotificationSlice/notificationSlice";
import { loadState, saveState } from "../utils/localStorage";


// Load the state from localStorage (if it exists)
const persistedState = loadState();

const store = configureStore({
    reducer: {
        cart: CartReducer,
        notification: notificationReducer,
    },
    // Use preloaded state from localStorage if available
    preloadedState: persistedState,

});

// Save the state to localStorage whenever the store changes
store.subscribe(() => {
    saveState({
        // Only persist the 'cart' slice of the state
        cart: store.getState().cart,
    });
});


export default store;