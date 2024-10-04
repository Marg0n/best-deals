import React from 'react';
import AdminSideBar from './AdminSideBar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSideBar/>
      <div className="flex-grow ml-64 p-5">
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminDashboard;
