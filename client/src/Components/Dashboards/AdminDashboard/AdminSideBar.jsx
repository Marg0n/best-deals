import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import { Link, useLocation } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

const AdminSideBar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(1);

  // Set selected based on current path
  useEffect(() => {
    switch (location.pathname) {
      case "/adminDashboard":
        setSelected(1);
        break;
      case "/adminDashboard/allUsers":
        setSelected(2);
        break;
      case "/adminDashboard/allVendors":
        setSelected(3);
        break;
      case "/adminDashboard/vendorRequest":
        setSelected(4);
        break;
      case "/adminDashboard/all-orders":
        setSelected(5);
        break;
      case "/adminDashboard/orderManagement":
        setSelected(6);
        break;
      case "/adminDashboard/userWishlist":
        setSelected(7);
        break;
      case "/adminDashboard/notifications":
        setSelected(8);
        break;
      case "/adminDashboard/inbox":
        setSelected(9);
        break;
      default:
        setSelected(1);
    }
  }, [location.pathname]);

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0">
      <div className="p-4 text-lg font-bold">Admin Dashboard</div>
      <List>
        {/* dashboard */}
        <ListItem button component={Link} to="/adminDashboard">
          <div
            className={
              selected === 1
                ? "text-black bg-white w-full rounded-lg flex p-2"
                : "flex align-middle"
            }
          >
            <ListItemIcon>
              <DashboardIcon
                className={
                  selected === 1 ? "text-black text-4xl" : "text-white"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              className={selected === 1 ? "" : "text-2xl"}
            />
          </div>
        </ListItem>

        {/* order management table */}
        <ListItem button component={Link} to="/adminDashboard/orderManagement">
          <div
            className={
              selected === 6
                ? "text-black bg-white w-full rounded-lg flex p-2"
                : "flex align-middle"
            }
          >
            <ListItemIcon>
              <ListAltIcon
                className={
                  selected === 6 ? "text-black text-4xl" : "text-white"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="Order Management"
              className={selected === 1 ? "" : "text-2xl"}
            />
          </div>
        </ListItem>

        {/* user Wishlist */}
        <ListItem button component={Link} to="/adminDashboard/userWishlist">
          <div
            className={
              selected === 7
                ? "text-black bg-white w-full rounded-lg flex p-2"
                : "flex align-middle"
            }
          >
            <ListItemIcon>
              <BookmarksIcon
                className={
                  selected === 7 ? "text-black text-4xl" : "text-white"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="Wishlist and Favorites"
              className={selected === 1 ? "" : "text-2xl"}
            />
          </div>
        </ListItem>

        {/* notification */}
        <ListItem button component={Link} to="/adminDashboard/notifications">
          <div
            className={
              selected === 8
                ? "text-black bg-white w-full rounded-lg flex p-2"
                : "flex align-middle"
            }
          >
            <ListItemIcon>
              <NotificationsIcon
                className={
                  selected === 8 ? "text-black text-4xl" : "text-white"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="Notifications and Alerts status"
              className={selected === 1 ? "" : "text-2xl"}
            />
          </div>
        </ListItem>

        {/* all users */}
        <ListItem button component={Link} to="/adminDashboard/allUsers">
          <div
            className={
              selected === 2
                ? "text-black bg-white w-full rounded-lg flex p-2"
                : "flex align-middle"
            }
          >
            <ListItemIcon>
              <GroupIcon
                className={
                  selected === 2 ? "text-black text-4xl" : "text-white"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="All Users"
              className={selected === 2 ? "" : "text-2xl"}
            />
          </div>
        </ListItem>

        {/* all vendors */}
        <ListItem button component={Link} to="/adminDashboard/allVendors">
          <div
            className={
              selected === 3
                ? "text-black bg-white w-full rounded-lg flex p-2"
                : "flex align-middle"
            }
          >
            <ListItemIcon>
              <StoreIcon
                className={
                  selected === 3 ? "text-black text-4xl" : "text-white"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="All Vendors"
              className={selected === 3 ? "" : "text-2xl"}
            />
          </div>
        </ListItem>

        {/* vendor request */}
        <ListItem button component={Link} to="/adminDashboard/vendorRequest">
          <div
            className={
              selected === 4
                ? "text-black bg-white w-full rounded-lg flex p-2"
                : "flex align-middle"
            }
          >
            <ListItemIcon>
              <RequestQuoteIcon
                className={
                  selected === 4 ? "text-black text-4xl" : "text-white"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="Vendor Request"
              className={selected === 4 ? "" : "text-2xl"}
            />
          </div>
        </ListItem>

        {/* all orders */}
        <ListItem button component={Link} to="/adminDashboard/all-orders">
          <div
            className={
              selected === 5
                ? "text-black bg-white w-full rounded-lg flex p-2"
                : "flex align-middle"
            }
          >
            <ListItemIcon>
              <DomainAddIcon
                className={
                  selected === 5 ? "text-black text-4xl" : "text-white"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="Orders"
              className={selected === 5 ? "" : "text-2xl"}
            />
          </div>
        </ListItem>

        {/* inbox */}
        <ListItem button component={Link} to="/adminDashboard/inbox">
          <div
            className={
              selected === 9
                ? "text-black bg-white w-full rounded-lg flex p-2"
                : "flex align-middle"
            }
          >
            <ListItemIcon>
              <MessageIcon
                className={
                  selected === 9 ? "text-black text-4xl" : "text-white"
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="Inbox"
              className={selected === 5 ? "" : "text-2xl"}
            />
          </div>
        </ListItem>

        {/* exit */}
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

export default AdminSideBar;
