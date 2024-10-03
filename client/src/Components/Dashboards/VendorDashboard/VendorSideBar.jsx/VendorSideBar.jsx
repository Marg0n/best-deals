import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';

const VendorSideBar = () => {
    const [selected, setSelected] = useState(1);
    return (
        <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0">
            <div className="p-4 text-lg font-bold">Vendor Dashboard</div>
            <List>
                   
            <ListItem onClick={() => setSelected(1)} button component={Link} to="/vendorDashboard">
                    {
                        selected === 1 ? <div className="text-black bg-white w-full rounded-lg flex p-2" ><ListItemIcon>
                            <DashboardIcon className='text-black text-4xl' />
                        </ListItemIcon>
                            <ListItemText primary="Dashboard" /></div> : <div className='flex align-middle'><ListItemIcon>
                                <DashboardIcon className="text-white" />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" className='text-2xl' /></div>
                    }
            </ListItem>
            
            <ListItem onClick={() => setSelected(2)} button component={Link} to="/vendorDashboard/orders">
                    {
                        selected === 2 ? <div className="text-black bg-white w-full rounded-lg flex p-2" ><ListItemIcon>
                            <ShoppingCartIcon className='text-black text-4xl' />
                        </ListItemIcon>
                            <ListItemText primary="Orders" /></div> : <div className='flex align-middle'><ListItemIcon>
                                <ShoppingCartIcon className="text-white" />
                            </ListItemIcon>
                            <ListItemText primary="Orders" className='text-2xl' /></div>
                    }
                </ListItem>
                
                <ListItem onClick={() => setSelected(3)} button component={Link} to="/vendorDashboard/products">
                    {
                        selected === 3 ? <div className="text-black bg-white w-full rounded-lg flex p-2" ><ListItemIcon>
                            <AddShoppingCartIcon className='text-black text-4xl' />
                        </ListItemIcon>
                            <ListItemText primary="Add Product" /></div> : <div className='flex align-middle'><ListItemIcon>
                                <AddShoppingCartIcon className="text-white" />
                            </ListItemIcon>
                            <ListItemText primary="Add Product" className='text-2xl' /></div>
                    }
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