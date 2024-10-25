import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification, clearNotification } from '../features/NotificationSlice/notificationSlice';
import useAuth from './useAuth';
import useAxiosCommon from './useAxiosCommon';

const useNotification = () => {
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user?.email) return;

        // Fetch notifications on load
        axiosCommon.get(`/notification/${user.email}`).then(response => {
            const { notification, notificationsMatchStatus } = response.data;
            if (notificationsMatchStatus) {
                notification.forEach(notific => {
                    dispatch(addNotification({
                        type: 'info',
                        message: notific.message,
                        timeout: 5000
                    }));
                });
            }
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
