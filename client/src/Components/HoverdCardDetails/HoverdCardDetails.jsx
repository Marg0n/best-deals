import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

const HoverdCardDetails = ({ product }) => {
    const {
        productName,
        brandName,
        productImage,
        description,
        price,
        category,
        ratings,
        creationDateTime,
        _id } = product;
    return (
        <div className="hidden lg:block">
            <div
                data-aos="fade-in"
                data-aos-duration="1500"
                className="absolute hero-overlay bg-opacity-90 z-50 right-full top-10 -mr-20 p-3 rounded-md shadow-md"
                style={{ maxHeight: '15rem', maxWidth: '15rem' }}
            >
                <div className="mt-4 mb-2 bg-transparent">
                    <span className="block text-xs font-medium tracking-widest uppercase text-white ">
                        Ratings :{ratings} <Rating name="half-rating" size="small" defaultValue={ratings} precision={0.1} />

                    </span>
                    <h2 className="text-xl font-semibold tracking-wide text-white">
                        Brand : {brandName}
                    </h2>
                </div>
                <p className="text-white">
                    {description.length > 20 ? description.substring(0, 50) + '...' : description}
                </p>
                <Link to={`/details/${_id}`} className="btn bg-[#775050] border-none text-white w-full mt-3">
                    View Details
                </Link>
            </div>

        </div>
    );
};

export default HoverdCardDetails;