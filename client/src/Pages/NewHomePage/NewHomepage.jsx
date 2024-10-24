import { Link } from "react-router-dom";
import Banner from "../../Components/Banner/Banner";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";
import OurCategories from "../../Components/OurCategories/OurCategories";
import Services from "../../Components/Services/Services";
import TopSales from "../../Components/TopSales/TopSales";
import { Helmet } from "react-helmet-async";

const NewHomepage = () => {
    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Best Deals | Home</title>
            </Helmet>
            <div className="my-10">
                {/* banner */}
                <Banner />
            </div>
            <div className="mb-20">
                <Services />
            </div>

            {/* Top sales */}
            <div className="mb-20">
                <TopSales />
            </div>
            {/* image and all procuts button */}
            <div className="relative mb-20">
                <Link to='/all'><img className="rounded-2xl" src="https://i.ibb.co.com/smP1ydX/Green-Business-Coach-Work-Place-Linkedin-Banner-1.gif" alt="" srcset="" /> </Link>
                <div className='flex  w-full h-full '>
                    <Link to='/all' className=' absolute translate -translate-y-full w-full  py-4 mt-4 text-sm  font-medium '>
                        <button className="btn btn-block  bg-transparent border-none hover:bg-green-800 btn-orange-300 text-white">All Products</button>
                    </Link>

                </div>

            </div>

            {/* Featured prodcuts */}
            <div className="mb-20">
                <FeaturedProducts />
            </div>
        </div>
    );
};

export default NewHomepage;