import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./Routes/Router.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import store from "./app/store.js";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <Provider store={store}>
            <RouterProvider router={Router} />
            <ToastContainer />
          </Provider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);
