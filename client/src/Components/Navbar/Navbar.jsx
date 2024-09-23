import { Tooltip } from "@mui/material";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import unknown from "../..//assets/anonymous.png";
import useAuth from "../../hooks/useAuth";


const Navbar = () => {
  const { user, loggedOut } = useAuth();
  const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];


  // State to track whether the dropdown is open or closed
  const [dropdown, setDropdown] = useState(false);

  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  // user lists
  const list = <>

    <li>
      <Link to='' className="text-base font-semibold">Settings</Link>
    </li>
    {user?.role === 'User' && <li>
      <Link to='' className="text-base font-semibold">Be a Vendor</Link>
    </li>
    }
    <li>
      <Link to='' className="text-base font-semibold">anything!</Link>
    </li>
    <li
      className="rounded-xl p-2 m-2 text-right"
      onClick={loggedOut}
    >
      <button className='bg-base-300 hover:bg-[#737373] hover:text-white block text-center text-base font-semibold'>Logout</button>
    </li>
  </>

  return (
    <div className="supports-backdrop-blur:bg-[#775050]/90 sticky top-0 z-40 w-full bg-[#775050]/40 backdrop-blur-lg">
      <div className="navbar  container mx-auto">
        {/* logo */}
        <div className="flex-1">
          <img
            className="h-10 lg:h-16"
            src="https://i.ibb.co.com/rtTfZsH/Bestdeal-white-text-log.png"
            alt="BestDeal"
          />
        </div>

        <div className="flex-none lg:space-x-4 space-x-2">

          {/* nav bar search */}
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

          {/* cart */}
          <div className="dropdown dropdown-end lg:flex hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <FiShoppingCart size={30} />
                <span className="badge badge-sm indicator-item">{cartProducts.length}</span>
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
                <Link to="/cartlist"> <h1>View Carts Details</h1></Link>
              </div>
            </div>
          </div>

          {!user ? (<>

            <Link to="/login">
              {" "}
              <FaUserAlt size={25} className="p-1 btn btn-ghost btn-circle btn-outline avatar animate-pulse hover:animate-none"> </FaUserAlt>
            </Link>

          </>) : (<>
            <div className="dropdown dropdown-end" onClick={toggleDropdown}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className=" btn btn-ghost btn-circle btn-outline avatar">
                  <img
                    alt="profile"
                    data-tooltip-id="name-tooltip"
                    data-tooltip-content={`${user?.displayName || user?.name}`}
                    referrerPolicy="no-referrer"
                    src=
                    {
                      user?.photoURL ? user?.photoURL
                        : (user?.photo ? user?.photo : unknown)
                    }
                  />
                  <Tooltip id="name-tooltip" />
                </div>
              </div>

              {dropdown && (
                <ul
                  tabIndex={0}
                  className="mt-3 z-[2] p-2 shadow-2xl menu menu-sm dropdown-content  rounded-box w-64 bg-[#0cc0df]/90 "
                >
                  <li>
                    <p className="flex justify-center items-center">
                      Hi,
                      <span className="text-info badge-outline">{user?.role ? user?.role : ""}</span>
                      <span className=" text-blue-500 font-serif">
                        {
                          user?.displayName || user?.name
                        }
                      </span>
                    </p>
                  </li>
                  <div className="divider divider-[#ff914d] my-0" ></div>
                  {list}
                </ul>
              )}
            </div>
          </>)}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
