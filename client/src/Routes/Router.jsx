import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Details from "../Pages/details/Details";

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
]);

export default Router;
