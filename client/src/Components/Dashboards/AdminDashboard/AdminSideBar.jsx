import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import ReportIcon from '@mui/icons-material/Report';
import { Link } from 'react-router-dom';

const AdminSideBar = () => {

    const [selected, setSelected] = useState(1);

    return (
        <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0">
            <div className="p-4 text-lg font-bold">Admin Dashboard</div>
            <List>
                <ListItem onClick={() => setSelected(1)} button component={Link} to="/adminDashboard">
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

                <ListItem onClick={() => setSelected(2)} button component={Link} to="/adminDashboard/allUsers">
                    {
                        selected === 2 ? <div className="text-black bg-white w-full rounded-lg flex p-2" ><ListItemIcon>
                            <GroupIcon className='text-black text-4xl' />
                        </ListItemIcon>
                            <ListItemText primary="All Users" /></div> : <div className='flex align-middle'><ListItemIcon>
                                <GroupIcon className="text-white" />
                            </ListItemIcon>
                            <ListItemText primary="All Users" className='text-2xl' /></div>
                    }
                </ListItem>

                <ListItem onClick={() => setSelected(3)} button component={Link} to="/adminDashboard/allVendors">
                    {
                        selected === 3 ? <div className="text-black bg-white w-full rounded-lg flex p-2" ><ListItemIcon>
                            <StoreIcon className='text-black text-4xl' />
                        </ListItemIcon>
                            <ListItemText primary="All Vendors" /></div> : <div className='flex align-middle'><ListItemIcon>
                                <StoreIcon className="text-white" />
                            </ListItemIcon>
                            <ListItemText primary="All Vendors" className='text-2xl' /></div>
                    }
                </ListItem>

                <ListItem onClick={() => setSelected(4)} button component={Link} to="/adminDashboard/vendorRequest">
                    {
                        selected === 4 ? <div className="text-black bg-white w-full rounded-lg flex p-2" ><ListItemIcon>
                            <DomainAddIcon className='text-black text-4xl' />
                        </ListItemIcon>
                            <ListItemText primary="Vendor Request" /></div> : <div className='flex align-middle'><ListItemIcon>
                                <DomainAddIcon className="text-white" />
                            </ListItemIcon>
                            <ListItemText primary="Vendor Request" className='text-2xl' /></div>
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

export default AdminSideBar;