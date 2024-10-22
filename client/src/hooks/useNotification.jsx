import React from 'react';
import useAxiosCommon from './useAxiosCommon';
import useAuth from './useAuth';
import { useDispatch } from 'react-redux';
import { addNotification, clearNotification } from '../features/CartSlice/notificationSlice';

const useNotification = () => {
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();
    const dispatch = useDispatch();

    // display the notification
    const displayNotification = (type, message, timeout) => {
        dispatch(addNotification({ type, message, timeout }));
    };

    // clear the notification
    const closeNotification = () => {
        dispatch(clearNotification());
    };

    return { displayNotification, closeNotification };
};

export default useNotification;
