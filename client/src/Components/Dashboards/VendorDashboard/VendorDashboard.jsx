import React from 'react';
import { Outlet } from 'react-router-dom';
import VendorSideBar from './VendorHome/VendorSideBar.jsx/VendorSideBar';

const VendorDashboard = () => {
  return (
    <div className="flex">
      <VendorSideBar />
      <div className="flex-grow ml-64 p-5">
         <Outlet/>
      </div>
    </div>
  );
};

export default VendorDashboard;