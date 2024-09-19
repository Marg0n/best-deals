import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Details from "../Pages/details/Details";
import Login from "../Pages/Authentication/Login";
import Registration from "../Pages/Authentication/Registration";

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
        loader: () => fetch("https://needscart-server.vercel.app/all")
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
]);

export default Router;
