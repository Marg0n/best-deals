import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Details from "../Pages/details/Details";
import Login from "../Pages/Authentication/Login";
import Registration from "../Pages/Authentication/Registration";
import CartPage from "../Pages/CartPage/CartPage";
import InvoiceHistory from "../Pages/invoiceHistory/InvoiceHistory";
import SingleProductCheckoutPage from "../Pages/SingleProductCheckoutPage/SingleProductCheckoutPage";
import VendorDashboard from "../Components/Dashboards/VendorDashboard/VendorDashboard";
import VendorHome from "../Components/Dashboards/VendorDashboard/VendorHome/VendorHome";
import VendorOrders from "../Components/Dashboards/VendorDashboard/VendorOrders/VendorOrders";
import VendorAddProduct from "../Components/Dashboards/VendorDashboard/VendorAddProduct/VendorAddProduct";
import PrivateRoute from './PrivateRoute';
import AdminDashboard from "../Components/Dashboards/AdminDashboard/AdminDashboard";
import AdminHome from "../Components/Dashboards/AdminDashboard/AdminHome/AdminHome";
import AdminAllUsers from "../Components/Dashboards/AdminDashboard/AdminAllUser/AdminAllUsers";
import AdminAllVendors from "../Components/Dashboards/AdminDashboard/AdminAllVendor/AdminAllVendors";
import AdminVendorRequest from "../Components/Dashboards/AdminDashboard/AdminVendorRequest/AdminVendorRequest";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:_id",
        element: <Details></Details>,
        loader: () => fetch(`${import.meta.env.VITE_SERVER}/all-products`),
      },
      {
        path: "/cartlist",
        element: <PrivateRoute><CartPage/></PrivateRoute> ,
      },
      {
        path: "/InvoiceHistory",
        element: <InvoiceHistory />,
      },
      {
        path: "/single-checkout/:_id",
        element: <SingleProductCheckoutPage />,
        loader: () => fetch(`${import.meta.env.VITE_SERVER}/all-products`),
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
    path: '/vendorDashboard',
    element: <VendorDashboard/>,
    children: [
        {
          path: '/vendorDashboard',
          element: <VendorHome/>
        },
        {
          path: '/vendorDashboard/orders',
          element: <VendorOrders/>
        },
        {
          path: '/vendorDashboard/products',
          element: <VendorAddProduct/>
        }
    ]
  },
  {
    path: '/adminDashboard',
    element: <AdminDashboard/>,
    children: [
      {
        path: '/adminDashboard',
        element: <AdminHome/>
      }, 
      {
        path: '/adminDashboard/allUsers',
        element: <AdminAllUsers/>
      },
      {
        path: '/adminDashboard/allVendors',
        element: <AdminAllVendors/>
      },
      {
        path: '/adminDashboard/vendorRequest',
        element: <AdminVendorRequest/>
      }
    ]
  }
]);

export default Router;
