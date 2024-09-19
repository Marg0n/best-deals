import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-[#775050] dark:text-gray-900 ">
                <div className="navbar-start">
                    <img className="h-16 " src="https://i.ibb.co.com/jg7qSw4/Best-Deal-final-logo.png" alt="BestDeal" />
                </div>
                <div className="navbar-center hidden lg:flex">
                </div>
                <div className="navbar-end">
                    {/* TODO : This button will toggole */}
                    <Link to='/login' className="btn"><FaUserAlt></FaUserAlt></Link>
                </div>
            </div>

        </div>
    );
};

export default Navbar;