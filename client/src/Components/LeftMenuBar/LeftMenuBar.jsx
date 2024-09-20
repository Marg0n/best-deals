import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const LeftMenubar = () => {
  return (
    <div className="mt-[100px] ">
      {/*Left Side menubar / categorybar  */}
      <div className="lg:flex-1  hidden lg:block py-5">
        {/* SearchBar */}
        <div className="w-3/4 mx-auto">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <button>
              <CiSearch className="h-10 w-10"></CiSearch>
            </button>
          </label>
        </div>

        <div>
          <Link className="underline underline-offset-1">Home</Link>
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
      </div>
    </div>
  );
};

export default LeftMenubar;
