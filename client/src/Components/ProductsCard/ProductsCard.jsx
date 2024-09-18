import PropTypes from 'prop-types';
const ProductsCard = ({ product }) => {
//fine
    const { productName, brandName, productImage, description, price, category, ratings, creationDateTime } = product

    return (
        <div>
            <div className="card card-compact bg-base-100 w-72 shadow-xl">
                <figure>
                    <img className="h-52"
                        src={productImage}
                        alt={productName}/>
                </figure>
                <div className="card-body">
                    <h2 className="text-xl font-bold">{productName.length > 20 ? productName.substring(0, 20) + '...' : productName}</h2>
                    <h2 className="font-semibold">Brand : {brandName}</h2>
                    <p>{description}</p>
                    <h2 className="font-semibold">Category : {category}</h2>
                    <h2 className="font-semibold">Uploaded at : {creationDateTime}</h2>
                    <div className="card-actions justify-end">
                        <button className="btn bg-orange-300">Rating : {ratings}</button>
                        <button className="btn bg-orange-300">Price : {price}$</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductsCard.propTypes = {
    product: PropTypes.object.isRequired
}

export default ProductsCard;