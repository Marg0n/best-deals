import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MessageIcon from "@mui/icons-material/Message";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const VendorSideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0">
      <div className="p-4 text-lg font-bold">Vendor Dashboard</div>
      <List>
        <ListItem button component={NavLink} to="/vendorDashboard">
          {currentPath === "/vendorDashboard" ? (
            <div className="text-black bg-white w-full rounded-lg flex p-2">
              <ListItemIcon>
                <DashboardIcon className="text-black text-4xl" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </div>
          ) : (
            <div className="flex align-middle">
              <ListItemIcon>
                <DashboardIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" className="text-2xl" />
            </div>
          )}
        </ListItem>

        <ListItem button component={NavLink} to="/vendorDashboard/orders">
          {currentPath === "/vendorDashboard/orders" ? (
            <div className="text-black bg-white w-full rounded-lg flex p-2">
              <ListItemIcon>
                <ShoppingCartIcon className="text-black text-4xl" />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </div>
          ) : (
            <div className="flex align-middle">
              <ListItemIcon>
                <ShoppingCartIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Orders" className="text-2xl" />
            </div>
          )}
        </ListItem>

        <ListItem button component={NavLink} to="/vendorDashboard/products">
          {currentPath === "/vendorDashboard/products" ? (
            <div className="text-black bg-white w-full rounded-lg flex p-2">
              <ListItemIcon>
                <AddShoppingCartIcon className="text-black text-4xl" />
              </ListItemIcon>
              <ListItemText primary="Add Product" />
            </div>
          ) : (
            <div className="flex align-middle">
              <ListItemIcon>
                <AddShoppingCartIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Add Product" className="text-2xl" />
            </div>
          )}
        </ListItem>

        <ListItem button component={NavLink} to="/vendorDashboard/inbox">
          {currentPath === "/vendorDashboard/inbox" ? (
            <div className="text-black bg-white w-full rounded-lg flex p-2">
              <ListItemIcon>
                <MessageIcon className="text-black text-4xl" />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </div>
          ) : (
            <div className="flex align-middle">
              <ListItemIcon>
                <MessageIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Inbox" className="text-2xl" />
            </div>
          )}
        </ListItem>

        <ListItem className="place-self-end" button component={Link} to="/">
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
