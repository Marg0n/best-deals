import React from 'react';
import { Avatar } from '@mui/material';

const VendorNavbar = () => {
    return (
        <div className="navbar">
            <h3>Good morning, Best Deals!</h3>
            <input type="text" placeholder="Search..." />
            <Avatar alt="Jon Smith" src="/static/images/avatar/1.jpg" />
        </div>
    );
};

export default VendorNavbar;