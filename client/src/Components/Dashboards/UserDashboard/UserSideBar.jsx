import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { Link, NavLink } from 'react-router-dom';
import useUserProfile from '../../../hooks/useUserProfile';
import useAuth from '../../../hooks/useAuth';

const UserSideBar = () => {

    const [selected, setSelected] = useState(1);

    // user profile data
    const { profile } = useUserProfile();
    const { user } = useAuth();


    return (
        <div className="w-64 min-h-screen bg-gray-800 text-white fixed top-0 left-0">
            {/* display user name */}
            <div className="p-4 text-lg font-bold"><span className='text-red-500'>{user?.displayName}</span>'s Dashboard</div>
            
            <List>
                <ListItem onClick={() => setSelected(1)} button component={NavLink} to="/userDashboard">
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

                <ListItem onClick={() => setSelected(2)} button component={NavLink} to="/userDashboard/orderManagement">
                    {
                        selected === 2 ? <div className="text-black bg-white w-full rounded-lg flex p-2" ><ListItemIcon>
                            <ListAltIcon className='text-black text-4xl' />
                        </ListItemIcon>
                            <ListItemText primary="Order Management" /></div> : <div className='flex align-middle'><ListItemIcon>
                                <ListAltIcon className="text-white" />
                            </ListItemIcon>
                            <ListItemText primary="Order Management" className='text-2xl' /></div>
                    }
                </ListItem>

                <ListItem onClick={() => setSelected(3)} button component={NavLink} to="/userDashboard/userWishlist">
                    {
                        selected === 3 ? <div className="text-black bg-white w-full rounded-lg flex p-2" ><ListItemIcon>
                            <BookmarksIcon className='text-black text-4xl' />
                        </ListItemIcon>
                            <ListItemText primary="Wishlist and Favorites" /></div> : <div className='flex align-middle'><ListItemIcon>
                                <BookmarksIcon className="text-white" />
                            </ListItemIcon>
                            <ListItemText primary="Wishlist and Favorites" className='text-2xl' /></div>
                    }
                </ListItem>

                <ListItem onClick={() => setSelected(4)} button component={NavLink} to="/userDashboard/notifications">
                    {
                        selected === 4 ? <div className="text-black bg-white w-full rounded-lg flex p-2" ><ListItemIcon>
                            <NotificationsIcon className='text-black text-4xl' />
                        </ListItemIcon>
                            <ListItemText primary="Notifications and Alerts" /></div> : <div className='flex align-middle'><ListItemIcon>
                                <NotificationsIcon className="text-white" />
                            </ListItemIcon>
                            <ListItemText primary="Notifications and Alerts" className='text-2xl' /></div>
                    }
                </ListItem>

                <ListItem onClick={() => setSelected(5)} button component={NavLink} to="/userDashboard/customerSupport">
                    {
                        selected === 5 ? <div className="text-black bg-white w-full rounded-lg flex p-2" ><ListItemIcon>
                            <SupportAgentIcon className='text-black text-4xl' />
                        </ListItemIcon>
                            <ListItemText primary="Customer Support" /></div> : <div className='flex align-middle'><ListItemIcon>
                                <SupportAgentIcon className="text-white" />
                            </ListItemIcon>
                            <ListItemText primary="Customer Support" className='text-2xl' /></div>
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

export default UserSideBar;