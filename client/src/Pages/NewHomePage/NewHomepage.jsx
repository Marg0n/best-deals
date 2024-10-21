import Banner from "../../Components/Banner/Banner";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";
import OurCategories from "../../Components/OurCategories/OurCategories";

const NewHomepage = () => {
    return (
        <div>
            <div className="my-10">
                {/* banner */}
                <Banner />
            </div>
            {/* Our categories */}
            <div>
                <OurCategories/>
            </div>
            {/* Top sales */}
            <div>
            </div>
            {/* Featured prodcuts */}
            <div>
                <FeaturedProducts/>
            </div>
        </div>
    );
};

export default NewHomepage;