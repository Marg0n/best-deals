import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminAllUsers from "../Components/Dashboards/AdminDashboard/AdminAllUser/AdminAllUsers";
import AdminAllVendors from "../Components/Dashboards/AdminDashboard/AdminAllVendor/AdminAllVendors";
import AdminDashboard from "../Components/Dashboards/AdminDashboard/AdminDashboard";
import AdminHome from "../Components/Dashboards/AdminDashboard/AdminHome/AdminHome";
import AdminVendorRequest from "../Components/Dashboards/AdminDashboard/AdminVendorRequest/AdminVendorRequest";
import CustomerSupport from "../Components/Dashboards/UserDashboard/CustomerSuport/CustomerSupport";
import UserAlert from "../Components/Dashboards/UserDashboard/Notification/UserAlert";
import OrderManagement from "../Components/Dashboards/UserDashboard/OrderManagement/OrderManagement";
import UserDashboard from "../Components/Dashboards/UserDashboard/UserDashboard";
import UserHome from "../Components/Dashboards/UserDashboard/UserHome/UserHome";
import UserWishlist from "../Components/Dashboards/UserDashboard/UserWishlist/UserWishlist";
import VendorAddProduct from "../Components/Dashboards/VendorDashboard/VendorAddProduct/VendorAddProduct";
import VendorDashboard from "../Components/Dashboards/VendorDashboard/VendorDashboard";
import VendorHome from "../Components/Dashboards/VendorDashboard/VendorHome/VendorHome";
import VendorOrders from "../Components/Dashboards/VendorDashboard/VendorOrders/VendorOrders";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AccountSettings from "../Pages/AccountSettings/AccountSettings";
import Login from "../Pages/Authentication/Login";
import Registration from "../Pages/Authentication/Registration";
import CartPage from "../Pages/CartPage/CartPage";
import Details from "../Pages/details/Details";
import FavoriteVendor from "../Pages/FavoriteVendor/FavoriteVendor";
import Feedback from "../Pages/Feedback/Feedback";
import Home from "../Pages/Home/Home";
import InvoiceHistory from "../Pages/invoiceHistory/InvoiceHistory";
import MyOrders from "../Pages/MyOrders/MyOrders";
import MyToken from "../Pages/MyToken/MyToken";
import MyWishList from "../Pages/MyWishList/MyWishList";
import SingleProductCheckoutPage from "../Pages/SingleProductCheckoutPage/SingleProductCheckoutPage";
import Root from "../Root/Root";
import AdminRoutes from "./AdminRoutes";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute";
import VendorRoute from "./VendorRoute";
import Inbox from "../Components/Inbox/Inbox";
import NewHomepage from "../Pages/NewHomePage/NewHomepage";
import VendorRegistration from "../components/VendorRegistration/VendorRegistration";
import AllOrders from "../Pages/AllOrders/AllOrders";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import OrderTracking from "../Pages/OrderTracking/OrderTracking";
import VendorProfile from "../Components/Dashboards/VendorDashboard/VendorProfile/VendorProfile";
import AdminProfile from "../Components/Dashboards/AdminDashboard/AdminProfile/AdminProfile";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <NewHomepage />,
      },
      {
        path: "/all",
        element: <Home />,
      },
      {
        path: "/track-order",
        element: <OrderTracking />,
      },
      {
        path: "/details/:_id",
        element: <Details></Details>,
        loader: () => fetch(`${import.meta.env.VITE_SERVER}/all-products`),
      },
      {
        path: "/cartlist",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/InvoiceHistory",
        element:  <PrivateRoute><InvoiceHistory /></PrivateRoute>,
      },
      {
        path: "/myOrders",
        element:  <PrivateRoute><MyOrders /></PrivateRoute>,
      },
      {
        path: "/myWishList",
        element:  <PrivateRoute><MyWishList /></PrivateRoute>,
      },
      {
        path: "/myToken",
        element: <MyToken />,
      },
      {
        path: "/favoriteVendor",
        element: <PrivateRoute><FavoriteVendor /></PrivateRoute>,
      },
      {
        path: "/accountSettings",
        element: <PrivateRoute><AccountSettings /></PrivateRoute>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
      {
        path: "/single-checkout/:_id",
        element: <SingleProductCheckoutPage />,
        loader: () => fetch(`${import.meta.env.VITE_SERVER}/all-products`),
      },
      {
        path: "/VendorRegistration",
        element: <VendorRegistration />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/vendorDashboard",
    element: (
      <VendorRoute>
        <VendorDashboard />
      </VendorRoute>
    ),
    children: [
      {
        path: "/vendorDashboard",
        element: <VendorRoute> <VendorHome /></VendorRoute>,
      },
      {
        path: "/vendorDashboard/vendorProfile",
        element: <VendorRoute> <VendorProfile /></VendorRoute>,
      },
      {
        path: "/vendorDashboard/orderManagement",
        element: <VendorRoute><OrderManagement /></VendorRoute>,
      },
      {
        path: "/vendorDashboard/userWishlist",
        element: <VendorRoute><UserWishlist /></VendorRoute>,
      },
      {
        path: "/vendorDashboard/notifications",
        element: <VendorRoute><UserAlert /></VendorRoute>,
      },
      {
        path: "/vendorDashboard/orders",
        element: <VendorRoute><VendorOrders /></VendorRoute>,
      },
      {
        path: "/vendorDashboard/products",
        element: <VendorRoute><VendorAddProduct /></VendorRoute>,
      },
      {
        path: "/vendorDashboard/inbox",
        element: <Inbox />,
      },
    ],
  },
  {
    path: "/adminDashboard",
    element: (
      <AdminRoutes>
        <AdminDashboard />
      </AdminRoutes>
    ),
    children: [
      {
        path: "/adminDashboard",
        element: <AdminRoutes><AdminHome /></AdminRoutes>,
      },
      {
        path: "/adminDashboard/adminProfile",
        element: <AdminRoutes><AdminProfile /></AdminRoutes>,
      },
      {
        path: "/adminDashboard/allUsers",
        element: <AdminRoutes><AdminAllUsers /></AdminRoutes>,
      },
      {
        path: "/adminDashboard/allVendors",
        element: <AdminRoutes><AdminAllVendors /></AdminRoutes>,
      },
      {
        path: '/adminDashboard/vendorRequest',
        element: <AdminRoutes><AdminVendorRequest /></AdminRoutes>,
      },
      {
        path: '/adminDashboard/all-orders',
        element: <AdminRoutes><AllOrders /></AdminRoutes>,
      },
      {
        path: "/adminDashboard/userWishlist",
        element: <AdminRoutes><UserWishlist /></AdminRoutes>,
      },
      {
        path: "/adminDashboard/orderManagement",
        element: <AdminRoutes><OrderManagement /></AdminRoutes>,
      },
      {
        path: "/adminDashboard/notifications",
        element:<AdminRoutes><UserAlert /></AdminRoutes>,
      },
      {
        path: "/adminDashboard/inbox",
        element: <AdminRoutes><Inbox /></AdminRoutes>,
      },
    ]
  },
  {
    path: "/userDashboard",
    element: (
      <UserRoute>
        <UserDashboard />
      </UserRoute>
    ),
    children: [
      {
        index: true,
        element: <UserRoute><UserHome /></UserRoute>,
      },
      {
        path: "/userDashboard/userWishlist",
        element: <UserRoute><UserWishlist /></UserRoute>,
      },
      {
        path: "/userDashboard/orderManagement",
        element: <UserRoute><OrderManagement /></UserRoute>,
      },
      {
        path: "/userDashboard/notifications",
        element: <UserRoute><UserAlert /></UserRoute>,
      },
      {
        path: "/userDashboard/customerSupport",
        element: <UserRoute><CustomerSupport /></UserRoute>,
      },
      {
        path: "/userDashboard/inbox",
        element: <UserRoute><Inbox /></UserRoute>,
      },
    ],
  },
]);

export default Router;
