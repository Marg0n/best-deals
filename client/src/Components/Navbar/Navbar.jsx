import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";


const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <img className="h-16 " src="https://i.ibb.co.com/w0Td3FL/Best-Deal.png" alt="BestDeal" />
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