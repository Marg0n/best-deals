import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import unknown from "../..//assets/anonymous.png";
import useAuth from "../../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import useUserProfile from "./../../hooks/useUserProfile";
import ThemeController from "../ThemeController/ThemeController";
import { useDispatch, useSelector } from "react-redux";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import toast from "react-hot-toast";
import { removeAllFromCartlist } from "../../features/CartSlice/CartSlice";

const Navbar = ({ toggleTheme, theme }) => {
  const { user, loggedOut } = useAuth();
  const userEmail = user?.email
  const axiosCommon = useAxiosCommon()

  const dispacth = useDispatch()


  // cart data from redux store
  const cart = useSelector((state) => state.cart);

  const cartProducts = cart.cartIteams



  // user profile data
  const { profile } = useUserProfile();

  // State to track whether the dropdown is open or closed
  const [dropdown, setDropdown] = useState(false);

  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const cartItem = { userEmail, cartProducts }
  // console.log(cartItem);



  // logout
  const handleLogout = () => {
    const res = axiosCommon.post(`/cartList`, cartItem)
      .then((res) => {
        // console.log(res.data);
        if (res.data.message) {
          loggedOut()
          toast.success('Logged Out');
          localStorage.clear()
        }
      })
      .catch((error) => {
        // If the error response exists, display the message from the server
        if (error.response) {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage); // Show the server's error message in a toast
        }
      });
  }

  // user lists
  const list = (
    <>
      {/* Admin dashboard */}
      {
        profile[0]?.role === 'Admin'
        && <li>
          <Link to="adminDashboard" className="text-base-100 font-semibold">
            Admin Dashboard
          </Link>
        </li>
      }
      {/* Vendor dashboard */}
      {
        profile[0]?.role === 'Vendor'
        && <li>
          <Link to="vendorDashboard" className="text-base-100 font-semibold">
            Vendor Dashboard
          </Link>
        </li>
      }
      {/* User dashboard */}
      {
        (profile[0]?.role === 'User' || null)
        && <li>
          <Link to="userDashboard" className="text-base-100 font-semibold">
            User Dashboard
          </Link>
        </li>
      }
      <li>
        <Link to="" className="text-base-100 font-semibold">
          Settings
        </Link>
      </li>
      {profile[0]?.role === "User" && (
        <li>
          <Link to="/VendorRegistration" className="text-base-100 font-semibold">
            Be a Vendor
          </Link>
        </li>
      )}
      <li>
        <Link to="" className="text-base-100 font-semibold">
          anything!
        </Link>
      </li>
      <li className="rounded-xl p-2 m-2 text-right" onClick={handleLogout}>
        <button className="bg-base-300 hover:bg-[#737373] hover:text-white text-red-400 block text-center text-base font-semibold font-serif">
          Logout
        </button>
      </li>
    </>
  );

  return (
    <div
      className={`supports-backdrop-blur:bg-[#775050]/90 sticky top-0 z-40 w-full backdrop-blur-lg ${theme === "light" ? "bg-[#775050]/40" : "bg-[#ACBCDF]/40"
        }`}
    >
      <div className="navbar  container mx-auto">
        {/* logo */}
        <div className="flex-1">
          <Link to='/'>
            <img
              className="h-10 lg:h-16"
              src="https://i.ibb.co.com/rtTfZsH/Bestdeal-white-text-log.png"
              alt="BestDeal"
            />
          </Link>
        </div>

        <div className="flex-none lg:space-x-4 space-x-2">
          {/* Dark mode light mode buttone */}
          <button>
            <ThemeController theme={theme} toggleTheme={toggleTheme} />
          </button>
          {/* <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button> */}

          {/* nav bar search */}
          {/* <fieldset className="w-full space-y-1 dark:text-gray-800 lg:hidden flex">
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
          </fieldset> */}

          {/* cart */}
          <div className="dropdown dropdown-end lg:flex hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <FiShoppingCart className="text-gray-700" size={30} />
                <span className="badge badge-sm indicator-item">
                  {cart?.cartIteams?.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className={`card card-compact dropdown-content bg-base-100 z-[1] mt-12 w-52 shadow ${theme === "light" ? "bg-[#0cc0df]/80" : "bg-[#737373]/80"
                } glass`}
            >
              <div className="card-body">
                <p className="text-lg font-bold">
                  {/* items count of wishlists */}
                  <span className=" text-red-600 mr-2">
                    {cart?.cartIteams?.length}
                  </span>
                  Items
                </p>
                {/* simple wishlists */}
                <div className="text-sm font-semibold p-4">
                  {cart?.cartIteams?.length === 0 ? (
                    "Noting Here!😥"
                  ) : (
                    <ul className="list-decimal">
                      {cart?.cartIteams?.map((product) => (
                        <li key={product?._id}>{product?.productName}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <Link to="/cartlist">
                  <p
                    className={
                      cart?.cartIteams?.length === 0
                        ? `hidden`
                        : `font-semibold text-red-500 animate-pulse hover:animate-none`
                    }
                  >
                    View Carts Details
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {!user ? (
            <>
              <Link to="/login">
                {" "}
                <FaUserAlt
                  size={25}
                  className="p-1 btn btn-ghost btn-circle btn-outline bg-[#775050] avatar animate-pulse hover:animate-none"
                >
                  {" "}
                </FaUserAlt>
              </Link>
            </>
          ) : (
            <>
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
                      data-tooltip-content={`${user?.displayName || profile[0]?.name
                        }`}
                      referrerPolicy="no-referrer"
                      src={
                        user?.photoURL
                          ? user?.photoURL
                          : profile[0]?.photo
                            ? profile[0]?.photo
                            : unknown
                      }
                    />
                    <Tooltip id="name-tooltip" />
                  </div>
                </div>

                {dropdown && (
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[2] p-2 shadow-2xl menu menu-sm dropdown-content  rounded-box w-64 bg-[#0cc0df]/90 glass"
                  >
                    <li>
                      <p className="flex justify-center items-center font-medium text-base-100">
                        Hi,
                        <span
                          className={`${profile[0]?.role !== "Admin"
                            ? profile[0]?.role === "User"
                              ? "text-[#423f3f] font-mono badge badge-neutral badge-outline"
                              : "text-base badge badge-neutral font-mono "
                            : "text-base badge badge-primary font-mono "
                            }`}
                        >
                          {profile[0]?.role ? profile[0]?.role : "User"}
                        </span>
                        <span className=" text-[#333333] font-serif font-bold">
                          {user?.displayName || profile[0]?.name}
                        </span>
                      </p>
                    </li>
                    <div className="divider divider-[#ff914d] my-0"></div>
                    {list}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
