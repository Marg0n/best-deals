import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import useNotification from '../../../hooks/useNotification';
import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector((state) => state.notification);
    const { closeNotification } = useNotification();

    const vertical = 'top';
    const horizontal = 'center';

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        closeNotification();
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={notification.open}
                autoHideDuration={notification.timeout}
                onClose={handleClose}
                key={notification.message + vertical + horizontal} // Ensure unique key
            >
                <Alert
                    variant='filled'
                    onClose={handleClose}
                    severity={notification.type}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Notification;
