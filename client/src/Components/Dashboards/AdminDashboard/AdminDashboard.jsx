import React from "react";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

// mui components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

// icons
import { FaCaretRight } from "react-icons/fa6";

// drawerWidth
const drawerWidth = 240;

const AdminDashboard = (props) => {
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

  const drawer = <AdminSideBar />;

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="flex relative">
      {/* burger menu */}
      <button
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className="absolute left-0 top-10 md:hidden py-6 px-0 bg-gray-700 rounded-r-xl"
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* outlet */}
      <div className="w-full bg-[#f5f5f9] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

AdminDashboard.propTypes = {
  window: PropTypes.func,
};

export default AdminDashboard;
