import PropTypes from "prop-types";
import { useState } from "react";
const ProductsCard = ({ product }) => {
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


  const [isHovered, setIsHovered] = useState(false);


  return (

    <div className="relative flex">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="p-6 overflow-hidden rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
        <img
          src={productImage}
          alt=""
          className={`object-cover object-center w-full h-72 transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"
            }`}
        />
        <div className="mt-6 mb-2">
          <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">
            ${price}
          </span>
          <h2 className="text-xl font-semibold tracking-wide">
            {productName}
          </h2>
        </div>


        {/* Hover effect */}
        <div>
          {isHovered && (
            <div
              data-aos="fade-in"
              data-aos-duration="1500"
              className="absolute hero-overlay bg-opacity-90 z-50 left-full top-10 -ml-20 p-3 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900"
              style={{ maxHeight: '15rem', maxWidth: '15rem' }}
            >
              <div className="mt-4 mb-2 bg-transparent">
                <span className="block text-xs font-medium tracking-widest uppercase text-white ">
                  Ratings : {ratings}
                </span>
                <h2 className="text-xl font-semibold tracking-wide text-white">
                  Brand : {brandName}
                </h2>
              </div>
              <p className="text-white">
                {description.length > 20 ? description.substring(0, 50) + '...' : description}
              </p>
              <Link to={`/details/${_id}`}>
              <button className="btn bg-[#775050] border-none text-white w-full mt-3"> View Details</button>
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

ProductsCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductsCard;
