import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';

const VendorSideBar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0">
            <div className="p-4 text-lg font-bold">Vendor Dashboard</div>
            <List>
                <ListItem button component={Link} to="/vendorDashboard">
                    <ListItemIcon>
                        <DashboardIcon className="text-white" />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>

                <ListItem button component={Link} to="/vendorDashboard/orders">
                    <ListItemIcon>
                        <ShoppingCartIcon className="text-white" />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItem>

                <ListItem button component={Link} to="/vendorDashboard/products">
                    <ListItemIcon>
                        <AddShoppingCartIcon className="text-white" />
                    </ListItemIcon>
                    <ListItemText primary="Add Product" />
                </ListItem>

                <ListItem className='place-self-end' button component={Link} to="/">
                    <ListItemIcon>
                        <ExitToAppIcon className="text-white" />
                    </ListItemIcon>
                    <ListItemText primary="Exit" />
                </ListItem>
            </List>
        </div>
    );
};

export default VendorSideBar;