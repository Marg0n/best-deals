import { useLoaderData, useParams } from "react-router-dom";
import CartCard from "../../Components/CartCard/CartCard";

const SingleProductCheckoutPage = () => {
    const products = useLoaderData();
    const { _id } = useParams();
    const product = products.find(product => product._id === _id);
    
    return (
        <div>
            <CartCard
            key={product.product?._id}
            product={product}
            ></CartCard>
        </div>
    );
};

export default SingleProductCheckoutPage;