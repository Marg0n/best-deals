import React, { useEffect } from 'react';
import useAxiosCommon from './useAxiosCommon';
import useAuth from './useAuth';
import { useDispatch } from 'react-redux';
import { addNotification, clearNotification } from '../features/CartSlice/notificationSlice';

const useNotification = () => {
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch notifications on load
        axiosCommon.get(`/notification/${user.email}`).then(response => {
            response.data.forEach(notification => {
                dispatch(addNotification({
                    type: 'info',
                    message: notification.message,
                    timeout: 5000
                }));
            });
        });
    }, [dispatch, user]);

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
