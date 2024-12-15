import { Link, useNavigate, useNavigation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Drawer from "../Drawer/Drawer";
import { AiOutlineClose } from "react-icons/ai";
import { Slider } from "@mui/material";


const LeftMenubar = ({ setSearch, setSelectedCategory, setPriceRange, setCurrentPage }) => {
  const [searchText, setSearchText] = useState("");
  const [clickeCategory, setClickedCategory] = useState("");
  const [priceRangeFilter, setPriceRangeFilter] = useState([0, 1000]);

  // const navigation = useNavigation()
  // console.log(navigation.state);

  // This fetch is for get all categories from mongoDB
  const axiosCommon = useAxiosCommon();
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosCommon.get(`/all-products`);
      console.log(res.data.all);

      return res.data.all;
    },
  });

  // Extracting all unique categories, handling both strings and arrays
  const allCategories = products
    ? [...new Set(
      products.flatMap((product) =>
        Array.isArray(product.category) ? product.category : [product.category]
      )
    )]
    : [];

  // console.log(allCategories);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  // Handle clean the search
  const handleClearSearch = (e) => {
    setCurrentPage(1)
    e.preventDefault();
    setSearchText("");
    setSearch("");
    setClickedCategory("");
    setSelectedCategory("");
    setPriceRangeFilter([0, 1000]);
    setPriceRange([0, '']);
  };

  // Select category to filter product
  const handleSelectCategory = (category) => {
    setCurrentPage(1)
    setSelectedCategory(category);
    setClickedCategory(category);
  };

  // handle price rage
  const handlePriceChange = (e) => {
    setCurrentPage(1)
    setPriceRangeFilter([0, e.target.value]);
    setPriceRange(priceRangeFilter);
  };

  return (
    <div className="sticky top-16 z-30 bg-none">

      {/* drawer */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden">
            <Drawer></Drawer>
          </label>
        </div>
        <div className="drawer-side mt-16 lg:mt-0">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

          <div className="lg:flex-1 lg:block py-5 bg-gray-200 dark:bg-[#2F4161]">

            {/* Cross Button for small and medium devices */}
            <div className="flex justify-end lg:hidden ">
              <label htmlFor="my-drawer-2" className="cursor-pointer p-4">
                <AiOutlineClose className="text-xl text-white" />
              </label>
            </div>
            <form onSubmit={handleSearch}>
              {/* SearchBar */}
              <div className="px-5 mx-auto lg:mt-5">
                <label className="input input-bordered flex items-center bg-gray-200 gap-2 border-1 border-[#775050]">
                  <input
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    type="text"
                    className="w-full px-3 py-1 "
                    placeholder="Search"
                  />
                  <button>
                    <CiSearch className="h-10 w-10" />
                  </button>
                </label>
              </div>

              <div className="text-[#775050] dark:text-white">
                <div className="flex justify-between mt-1 px-3">
                  <div className="flex">
                    <Link to="/" className="underline underline-offset-1">
                      Home
                    </Link>
                    {/* <Link to="/home2" className="underline underline-offset-1">
                      Home 2
                    </Link> */}
                    {clickeCategory.length > 0 ? ">" : ""}
                    <p>{clickeCategory}</p>
                  </div>
                  <button
                    className="underline underline-offset-1"
                    onClick={handleClearSearch}
                  >
                    View All
                  </button>
                </div>
                <div className="ml-5 mt-5">
                  <h1>Categories :</h1>
                  <ul className="ml-10">
                    {allCategories.map((category, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleSelectCategory(category)}
                          className=" mt-1"
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Price Filter */}
              <h2 className="font-semibold mt-2 px-2 text-[#775050] dark:text-white">
                Price Range
              </h2>
              <div className="flex px-2 items-center gap-2 text-[#775050] dark:text-white">
                <span>${priceRangeFilter[0]}</span>
                <Slider
                  aria-label="Price"
                  min={0}
                  max={1000}
                  value={priceRangeFilter[1]}
                  onChange={handlePriceChange}
                  getAriaValueText={(value) => `Price: ${value}`}
                  color="secondary"
                />
                {/* <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRangeFilter[1]}
                  onChange={handlePriceChange}
                  className="range range-info"
                /> */}
                <span className="px-2">${priceRangeFilter[1]}</span>
              </div>
              {/* <hr className="w-3/4 mx-auto my-5" /> */}
              <div>
                {/* <div className="ml-5 mt-5 text-[#775050] dark:text-white">
                  <h1>My List :</h1>
                  <ul className="ml-10">
                    <li>
                      <Link to="/myOrders">My Orders</Link>
                    </li>
                    <li>
                      <Link to="/myWishList">My Wish list</Link>
                    </li>
                    <li>
                      <Link to="/myToken">My token</Link>
                    </li>
                    <li>
                      <Link to="/favoriteVendor">Favorite Vendor</Link>
                    </li>
                    <li>
                      <Link to="/invoiceHistory">Invoice History</Link>
                    </li>
                  </ul>
                </div> */}
              </div>
              {/* <hr className="w-3/4 mx-auto my-5" /> */}
              {/* <div>
                <div className="ml-5 mt-5 text-[#775050] dark:text-white">
                  <ul className="ml-10">
                    <li>
                      <Link to="/accountSettings">Account Settings</Link>
                    </li>
                    <li>
                      <Link to="/aboutUs">About Us</Link>
                    </li>
                    <li>
                      <Link to="/feedback">Feedback </Link>
                    </li>
                    <li>Complain Vendor</li>
                    <li>
                      <Link to="/accountSettings">Account Settings</Link>
                    </li>
                    <li>
                      <Link to="/aboutUs">About Us</Link>
                    </li>
                    <li>
                      <Link to="/feedback">Feedback </Link>
                    </li>
                    <li>Complain Vendor</li>
                  </ul>
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </div>
      {/* darwer end */}

      {/* Left Side menubar / categorybar */}

    </div>

  );
};

export default LeftMenubar;
