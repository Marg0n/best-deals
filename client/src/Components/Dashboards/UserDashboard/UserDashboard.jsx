import PropTypes from 'prop-types';
import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSideBar from './UserSideBar';

// mui components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

// icons
import { RiMenuUnfoldFill } from "react-icons/ri";


const drawerWidth = 240;

const UserDashboard = (props) => {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (

        <UserSideBar />

    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <div className='relative flex'>
                {/* burger menu */}
                <button
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className='btn btn-ghost absolute left-1 top-1 md:hidden'
                >
                    <RiMenuUnfoldFill size={25} color='red' />
                </button>


                {/* side nav drawer */}
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>

                {/* outlet */}
                <div
                    className='w-full bg-[#0cc0df]/90'
                    component="main"
                >
                    <Outlet />
                </div>
            </div>
        </>

    );
};

UserDashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default UserDashboard;