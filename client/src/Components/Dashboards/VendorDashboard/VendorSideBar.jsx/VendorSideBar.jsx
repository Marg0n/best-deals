import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const VendorSideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { user } = useAuth();

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 overflow-auto">

      <div className="p-4 text-lg font-bold">
        <span className="text-red-500">{user?.displayName}</span>'s Dashboard
      </div>

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

        <ListItem
          button
          component={NavLink}
          to="/vendorDashboard/orderManagement"
        >
          <div
            className={`w-full rounded-lg flex p-2 items-center justify-center ${currentPath === "/vendorDashboard/orderManagement"
              ? "bg-white text-black"
              : "text-white"
              }`}
          >
            <ListItemIcon>
              <ListAltIcon
                className={`${currentPath === "/vendorDashboard/orderManagement"
                  ? "text-black"
                  : "text-white"
                  }`}
              />
            </ListItemIcon>
            <ListItemText primary="Order Management" />
          </div>
        </ListItem>

        <ListItem button component={NavLink} to="/vendorDashboard/userWishlist">
          <div
            className={`w-full rounded-lg flex p-2 items-center justify-center ${currentPath === "/vendorDashboard/userWishlist"
              ? "bg-white text-black"
              : "text-white"
              }`}
          >
            <ListItemIcon>
              <BookmarksIcon
                className={`${currentPath === "/vendorDashboard/userWishlist"
                  ? "text-black"
                  : "text-white"
                  }`}
              />
            </ListItemIcon>
            <ListItemText primary="Wishlist and Favorites" />
          </div>
        </ListItem>

        <ListItem button component={NavLink} to="/vendorDashboard/notifications">
          <div
            className={`w-full rounded-lg flex p-2 items-center justify-center ${currentPath === "/vendorDashboard/notifications"
              ? "bg-white text-black"
              : "text-white"
              }`}
          >
            <ListItemIcon>
              <NotificationsIcon
                className={`${currentPath === "/vendorDashboard/notifications"
                  ? "text-black"
                  : "text-white"
                  }`}
              />
            </ListItemIcon>
            <ListItemText primary="Notifications and Alerts" />
          </div>
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

export default VendorSideBar;
