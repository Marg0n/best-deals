import PropTypes from 'prop-types';
import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSideBar from './UserSideBar';

// mui components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

// icons
import { FaCaretRight } from 'react-icons/fa6';


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
                    className='absolute left-0 top-10 md:hidden py-6 px-0 bg-gray-700 rounded-r-xl'
                >
                    <FaCaretRight className="md:text-xl"></FaCaretRight>
                </button>


                {/* side nav drawer */}
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
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
                    className='w-full bg-[#0cc0df]/90 min-h-screen'
                    component="main"
                >
                    <Outlet />
                </div>
            </div>
        </>

    );
};

UserDashboard.propTypes = {
    window: PropTypes.func,
};

export default UserDashboard;