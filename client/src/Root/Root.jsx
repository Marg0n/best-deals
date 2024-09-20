import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from "../Components/Footer/Footer";

const Root = () => {
  useEffect(() => {
    AOS.init({
      duration: 500
    });
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-[1440px] mx-auto">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
