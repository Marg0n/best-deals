import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import HoverdCardDetails from "../HoverdCardDetails/HoverdCardDetails";
import ProductStyle from "./ProductCardStyle/ProductCardStyle.module.css";

const ProductsCard = ({ product , showTotalSold }) => {
  const {
    productName,
    brandName,
    productImage,
    description,
    price,
    category,
    ratings,
    creationDateTime,
    _id, totalSold,
  } = product;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full max-w-96 mx-auto">
      <div className="relative ">
        <Link to={`/details/${_id}`}>
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="p-3 overflow-hidden rounded-md shadow-md bg-[#D9D9D9] dark:bg-[#3f629e] dark:text-white"
          >
            <div className={`${ProductStyle.cardProductParent}`}>
              <img
                src={productImage}
                alt=""
                className={`object-fit object-center w-full h-64  duration-300 ${ProductStyle.backProductTransition
                  }  ${isHovered ? `${ProductStyle.cardProduct}` : ``}`}
              />
            </div>
            <div className="mt-6 mb-2 dark:text-white">
              <span className="block text-xs font-medium tracking-widest uppercase ">
                ${price}
              </span>
              <h2 className="text-xl font-semibold tracking-wide">
                {productName}
              </h2>
              {
                showTotalSold ? <h1>Already Sold : {totalSold}</h1> : ''
              }
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
