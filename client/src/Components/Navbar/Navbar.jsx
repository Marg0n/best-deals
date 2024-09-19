import { useContext, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
<<<<<<< HEAD


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
=======
import { ClimbingBoxLoader } from "react-spinners";
import { FiShoppingCart } from "react-icons/fi";
import { AuthContext } from "../../AuthProvider/AuthProvider";
const Navbar = () => {
    
  const { user, loggedOut } = useContext(AuthContext);
>>>>>>> e02d41220a98fa14d3653ef7967f9fb9d9cbf856

  return (
    <div className="bg-gray-100 fixed w-full">
      <div className="navbar py-6">
        <div className="flex-1">
          <img
            className="h-10 lg:h-16"
            src="https://i.ibb.co.com/w0Td3FL/Best-Deal.png"
            alt="BestDeal"
          />
        </div>
        <div className="flex-none lg:space-x-4 space-x-2">
          {user ? (
            <>
              <fieldset className="w-full space-y-1 dark:text-gray-800 lg:hidden flex">
                <label htmlFor="Search" className="hidden">
                  Search
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button
                      type="button"
                      title="search"
                      className="p-1 focus:outline-none focus:ring"
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 dark:text-gray-800"
                      >
                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    name="Search"
                    placeholder="Search..."
                    className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-violet-600"
                  />
                </div>
              </fieldset>
              <button className="bg-[#34394c] text-white font-semibold px-8 lg:flex hidden rounded-full py-[15px]">
                Be a vendor
              </button>
              <div className="dropdown dropdown-end lg:flex hidden">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <FiShoppingCart size={30} />
                    <span className="badge badge-sm indicator-item">1</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">1 Items</span>
                    <span className="text-base font-semibold">
                      Content Here
                    </span>
                  </div>
                </div>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="lg:w-12 w-10 rounded-full">
                    <img alt="profile" src={user?.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="text-base font-semibold">
                      {user?.displayName}
                    </a>
                  </li>
                  <li>
                    <a className="text-base font-semibold">Settings</a>
                  </li>
                  <li>
                    <a>
                      <button className="text-red-500 text-base font-semibold">
                        Logout
                      </button>
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            ""
          )}
          {/* <button className="bg-[#34394c] text-white font-semibold px-8 rounded-full py-[15px]">
            Be a vendor
          </button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <FiShoppingCart size={30} />
                <span className="badge badge-sm indicator-item">1</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">1 Items</span>
                <span className="text-base font-semibold">Content Here</span>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full">
                <img alt="profile" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="text-base font-semibold">{user?.displayName}</a>
              </li>
              <li>
                <a className="text-base font-semibold">Settings</a>
              </li>
              <li>
                <a>
                  <button className="text-red-500 text-base font-semibold">
                    Logout
                  </button>
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
