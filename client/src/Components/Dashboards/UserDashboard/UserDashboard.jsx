import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSideBar from './UserSideBar';

const UserDashboard = () => {
    return (
        <div className="flex">
            <UserSideBar />
            <div className="flex-grow ml-64 p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default UserDashboard;