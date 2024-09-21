import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import HoverdCardDetails from "../HoverdCardDetails/HoverdCardDetails";
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
    _id,
  } = product;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mt-6 ">
      <div className="relative flex">
        <Link to={`/details/${_id}`}>
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="p-6 overflow-hidden rounded-md lg:h-[420px] shadow-md dark:bg-gray-50 dark:text-gray-900"
          >
            <img
              src={productImage}
              alt=""
              className={`object-cover object-center w-full h-72 transition-transform duration-300 ${
                isHovered ? "scale-110" : "scale-100"
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
                <HoverdCardDetails
                  key={product._id}
                  product={product}
                ></HoverdCardDetails>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

ProductsCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductsCard;
