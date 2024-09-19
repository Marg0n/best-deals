<<<<<<< HEAD
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const ProductsCard = ({ product }) => {
	const { productName, brandName, productImage, description, price, category, ratings, creationDateTime, _id } = product

	return (
		
		<div className='items-center mt-20'>
			<div className=" rounded-md shadow-md bg-gray-900 text-gray-100">
				<img src={productImage} alt="" className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500" />
				<div className="flex flex-col justify-between">
					<div className="">
						<h2 className="text-xl font-semibold ">{productName}</h2>
						
					</div>
					<Link to={`/details/${_id}`}>
					<button type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-default-400 text-gray-100">Read more</button></Link>
				</div>
			</div>
		</div>
	);
};

ProductsCard.propTypes = {
	product: PropTypes.object.isRequired
}
=======
import PropTypes from "prop-types";
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
  } = product;

  return (
    <div className="p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
      <img
        src={productImage}
        alt=""
        className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
      />
      <div className="mt-6 mb-2">
        <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">
          Quisque
        </span>
        <h2 className="text-xl font-semibold tracking-wide">
          Nam maximus purus
        </h2>
      </div>
      <p className="dark:text-gray-800">
        Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed
        feugiat mi. Etiam ut lacinia dui.
      </p>
    </div>
  );
};

ProductsCard.propTypes = {
  product: PropTypes.object.isRequired,
};
>>>>>>> 140e59cbf615aa02fdd265e7eb80da25a5973bee

export default ProductsCard;
