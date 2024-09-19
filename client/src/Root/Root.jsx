import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Root = () => {
  useEffect(() => {
    AOS.init({
      duration : 500
    });
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <Outlet />
      <h1>Footer</h1>
    </div>
  );
};

export default Root;
