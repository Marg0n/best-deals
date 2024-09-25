import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const LeftMenubar = ({ setSearch, setSelectedCategory}) => {
  const [searchText, setSearchText] = useState('');
  const [clickeCategory, setClickedCategory] = useState('')

  // This fetch is for get all categories from mongoDB
  const axiosCommon = useAxiosCommon();
  const { data: products} = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosCommon.get(`/all-products`);
      console.log(res.data);

      return res.data;
    },
  });

  // Extracting all unique categories from the products array
  const allCategories = products
    ? [...new Set(products.map(product => product.category))]
    : [];

    console.log(allCategories);
    

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  // Handle cleat the search 
  const handleClearSearch = (e) => {
    e.preventDefault();
    setSearchText('')
    setSearch('')
    setClickedCategory('')
    setSelectedCategory('')
  }

  const handleSelectCategory = (category) => {
    setSelectedCategory(category)
    setClickedCategory(category)
  }

  return (
    <div className="sticky top-16 h-[calc(100vh-8rem)] z-30 overflow-y-auto">
      {/* Left Side menubar / categorybar */}
      <div className="lg:flex-1 hidden lg:block py-5">
        <form onSubmit={handleSearch}>
          {/* SearchBar */}
          <div className="w-3/4 mx-auto">
            <label className="input input-bordered flex items-center gap-2">
              <input
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                type="text"
                className="w-full px-3 py-1"
                placeholder="Search"
              />
              <button>
                <CiSearch className="h-10 w-10" />
              </button>
            </label>
          </div>

          <div>
            <div className="flex justify-between mt-1 px-3">
              <div className="flex">
                <Link to="/" className="underline underline-offset-1">
                  Home
                </Link>{clickeCategory.length > 0 ? '>' : ''}<p>{clickeCategory}</p>
              </div>
              <button className="underline underline-offset-1" onClick={handleClearSearch}>View All</button>
            </div>
            <div className="ml-5 mt-5">
              <h1>Categories :</h1>
              <ul className="ml-10">
                {
                  allCategories.map((category, index) =>
                    <li key={index}><button onClick={() => handleSelectCategory(category)} className=" mt-1">{category}</button></li>
                  )
                }
              </ul>
            </div>
          </div>
          <hr className="w-3/4 mx-auto my-5" />
          <div>
            <div className="ml-5 mt-5">
              <h1>My List :</h1>
              <ul className="ml-10">
                <li>My Orders</li>
                <li>My Wish list</li>
                <li>My token</li>
                <li>Favorite Vendor</li>
                <li>
                  <Link to="/invoiceHistory">Invoice History</Link>
                </li>
              </ul>
            </div>
          </div>
          <hr className="w-3/4 mx-auto my-5" />
          <div>
            <div className="ml-5 mt-5">
              <ul className="ml-10">
                <li>Account Settings</li>
                <li>About Us</li>
                <li>Feedback</li>
                <li>Complain Vendor</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeftMenubar;
