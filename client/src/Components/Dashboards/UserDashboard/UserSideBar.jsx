import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import MessageIcon from "@mui/icons-material/Message";
import useUserProfile from "../../../hooks/useUserProfile";
import useAuth from "../../../hooks/useAuth";

const UserSideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { user } = useAuth();

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white fixed top-0 left-0">
      <div className="p-4 text-lg font-bold">
        <span className="text-red-500">{user?.displayName}</span>'s Dashboard
      </div>

      <List>
        {/* dashboard */}
        <ListItem button component={NavLink} to="/userDashboard">
          <div
            className={`w-full rounded-lg flex p-2 items-center justify-center ${currentPath === "/userDashboard"
                ? "bg-white text-black"
                : "text-white"
              }`}
          >
            <ListItemIcon>
              <DashboardIcon
                className={`${currentPath === "/userDashboard" ? "text-black" : "text-white"
                  }`}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </div>
        </ListItem>

        {/* order management table */}
        <ListItem
          button
          component={NavLink}
          to="/userDashboard/orderManagement"
        >
          <div
            className={`w-full rounded-lg flex p-2 items-center justify-center ${currentPath === "/userDashboard/orderManagement"
                ? "bg-white text-black"
                : "text-white"
              }`}
          >
            <ListItemIcon>
              <ListAltIcon
                className={`${currentPath === "/userDashboard/orderManagement"
                    ? "text-black"
                    : "text-white"
                  }`}
              />
            </ListItemIcon>
            <ListItemText primary="Order Management" />
          </div>
        </ListItem>

        {/* wishlists */}
        <ListItem button component={NavLink} to="/userDashboard/userWishlist">
          <div
            className={`w-full rounded-lg flex p-2 items-center justify-center ${currentPath === "/userDashboard/userWishlist"
                ? "bg-white text-black"
                : "text-white"
              }`}
          >
            <ListItemIcon>
              <BookmarksIcon
                className={`${currentPath === "/userDashboard/userWishlist"
                    ? "text-black"
                    : "text-white"
                  }`}
              />
            </ListItemIcon>
            <ListItemText primary="Wishlist and Favorites" />
          </div>
        </ListItem>

        {/* notification */}
        <ListItem button component={NavLink} to="/userDashboard/notifications">
          <div
            className={`w-full rounded-lg flex p-2 items-center justify-center ${currentPath === "/userDashboard/notifications"
                ? "bg-white text-black"
                : "text-white"
              }`}
          >
            <ListItemIcon>
              <NotificationsIcon
                className={`${currentPath === "/userDashboard/notifications"
                    ? "text-black"
                    : "text-white"
                  }`}
              />
            </ListItemIcon>
            <ListItemText primary="Notifications and Alerts" />
          </div>
        </ListItem>

        {/* inbox */}
        <ListItem
          button
          component={NavLink}
          to="/userDashboard/customerSupport"
        >
          <div
            className={`w-full rounded-lg flex p-2 items-center justify-center ${currentPath === "/userDashboard/customerSupport"
                ? "bg-white text-black"
                : "text-white"
              }`}
          >
            <ListItemIcon>
              <MessageIcon
                className={`${currentPath === "/userDashboard/customerSupport"
                    ? "text-black"
                    : "text-white"
                  }`}
              />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </div>
        </ListItem>

        {/* exit */}
        <ListItem className="place-self-end" button component={Link} to="/">
          <div className="w-full p-2 flex items-center justify-center">
            <ListItemIcon>
              <ExitToAppIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Exit" />
          </div>
        </ListItem>
      </List>
    </div>
  );
};

export default UserSideBar;
