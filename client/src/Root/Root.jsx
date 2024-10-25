import AOS from 'aos';
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { setCartData } from "../features/CartSlice/CartSlice";
import useAuth from "../hooks/useAuth";
import useAxiosCommon from "../hooks/useAxiosCommon";
import useCartList from "../hooks/useCartList";
import useUserProfile from "../hooks/useUserProfile";
import useNotification from './../hooks/useNotification';


const Root = () => {

  const { user } = useAuth()
  const { profile } = useUserProfile();
  const axiosCommon = useAxiosCommon();

  // dispatch to redux
  const dispatch = useDispatch()

  // fetch user cartlist data from custom hooks
  const userCartListFromDB = useCartList()
  // console.log(userCartListFromDB);

  const cartlistFromDB = userCartListFromDB?.cartProducts[0]
  // console.log(cartlistFromDB);

  // if user is login and user has cartlist it will set on redux
  if (user && cartlistFromDB && cartlistFromDB.length > 0) {
    dispatch(setCartData(cartlistFromDB))
  }
  else if (user && !cartlistFromDB) {
    dispatch(setCartData([]))
  }
  // if no user it will save a empty array on redux store
  else {
    dispatch(setCartData([]))
  }


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


  // notification handlers
  const { displayNotification, closeNotification } = useNotification(user?.email); // Using email

  const previousStatus = useRef();

  useEffect(() => {
    const currentStatus = profile[0]?.purchaseHistory?.status;
    const email = user?.email;
    if (previousStatus.current && previousStatus.current !== currentStatus) {
      // Display notification
      displayNotification('info', `Status changed to ${currentStatus}`, 5000);
      toast.info(`Status changed to: ${currentStatus}`, { autoClose: 4000, theme: "colored" })

      // Patch request to update notification status
      axiosCommon.patch(`/updateNotification/${email}`, {
        status: currentStatus,
        notification: { notifyStatus: previousStatus.current }
      }).then(response => {
        console.log('Notification status updated:', response.data);
      }).catch(error => {
        console.error('Error updating notification status:', error);
      });
    }
    previousStatus.current = currentStatus;
  }, [profile, displayNotification]);



  // animation use effect
  useEffect(() => {
    AOS.init({
      duration: 500
    });
  }, []);



  return (
    <div className="bg-gray-200 dark:bg-[#2F4161]">
      <Toaster />
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <div className="mx-auto max-w-[1440px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
