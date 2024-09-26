import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from "../Components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const Root = () => {
  // Dark mode light mode control
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Effect for toggle dark and light mode
  useEffect(() => {
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log(userPrefersDark);
    

    if (!localStorage.getItem('theme')) {
      setTheme(userPrefersDark ? 'dark' : 'light');
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    AOS.init({
      duration: 500
    });
  }, []);

  return (
    <div className=" dark:bg-[#2F4161]">
      <Toaster />
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <div className="max-w-[1440px] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
