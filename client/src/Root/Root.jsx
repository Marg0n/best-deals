import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from "../Components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { loadState, saveState } from "../utils/localStorage";
import { useDispatch } from "react-redux";
import store from "../app/store";
import { addToCart} from "../features/CartSlice/CartSlice";

const Root = () => {
  // get user id from firebase
  const { user } = useAuth()
  const userID = user?.uid
  console.log(userID);


  const dispatch = useDispatch()

  // Dark mode light mode control
  const [theme, setTheme] = useState(() => {
    // Get the saved theme from localStorage or default to the system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }

    // Get the system theme preference
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return userPrefersDark ? 'dark' : 'light';
  });


  // theme control effect
  useEffect(() => {
    // Apply the theme to the document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save the theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // animation use effect
  useEffect(() => {
    AOS.init({
      duration: 500
    });
  }, []);

  // user data 
  useEffect(() => {
    if (userID) {
      // Load the cart state from localStorage for the specific user
      const persistedState = loadState(userID);
      if (persistedState) {
        // Dispatch the loaded cart state to Redux
        dispatch(addToCart(persistedState.cart.cartIteams));
      }

      // Save the state to localStorage whenever the store changes
      const unsubscribe = store.subscribe(() => {
        saveState({
          cart: store.getState().cart,
        }, userID);
      });

      // Clean up the subscription when the component unmounts
      return () => unsubscribe();
    }
  }, [userID, dispatch]);

  return (
    <div className="bg-gray-200 dark:bg-[#2F4161]">
      <Toaster />
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <div className="mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
