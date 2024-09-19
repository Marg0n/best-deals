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

export default ProductsCard;