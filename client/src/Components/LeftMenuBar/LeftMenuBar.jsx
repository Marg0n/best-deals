import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

const LeftMenubar = ({ setSearch }) => {
  const [searchText, setSearchText] = useState('');

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
              <Link to="/" className="underline underline-offset-1">
                Home
              </Link>
              <button className="underline underline-offset-1" onClick={handleClearSearch}>Clear search</button>
            </div>
            <div className="ml-5 mt-5">
              <h1>Categories :</h1>
              <ul className="ml-10">
                <li>Mens Products</li>
                <li>Women Products</li>
                <li>Kitchen appliances</li>
                <li>Beauty</li>
                <li>Clothing</li>
                <li>Accessories</li>
                <li>Food</li>
                <li>Toys</li>
                <li>Children Products</li>
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
