import { createSlice } from "@reduxjs/toolkit";

// Initialize the values
const initialState = {
    open: false,
    type: 'info',
    message: '',
    timeout: 5000
};

// Get email
const userEmail = localStorage.getItem('userEmail');

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        addNotification: (state, action) => {
            state.open = true;
            state.type = action.payload.type || 'info';
            state.message = action.payload.message || '';
            state.timeout = action.payload.timeout || 5000;
        },
        clearNotification: (state) => {
            state.open = false;
            state.type = 'info';
            state.message = '';
            state.timeout = 5000;
        },
    }
});

export const { addNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
