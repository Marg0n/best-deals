import React from 'react';
import { Helmet } from 'react-helmet-async';

const UserAlert = () => {
    return (
        <div className="p-8 min-h-screen space-y-4">
            <Helmet>
                <title>Best Deal | Notification & Alerts</title>
            </Helmet>

            <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-base-300 min-h-[90vh]">
                Notification
            </div>

        </div>
    );
};

export default UserAlert;