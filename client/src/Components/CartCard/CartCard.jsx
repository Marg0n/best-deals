import { Rating } from "@mui/material";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../features/CartSlice/CartSlice.js";
import ProductsCounter from "../ProductCounter/ProductsCounter.jsx";


const CartCard = ({ product }) => {
    const dispatch = useDispatch();

    const { productName,
        productImage,
        description,
        price,
        category,
        ratings,
        cartQuantity,
        creationDateTime, _id } = product


    // Delete item from cart
    const handleDelete = () => {
        dispatch(removeFromCart(product._id)); // Dispatch an action to remove item from cart
    };

    return (
        <div>
            <div className='flex items-center gap-2 bg-[#D9D9D9] p-3 rounded-[22px] mb-3'>
                <img className='w-24 h-20 rounded-[27px]' src={productImage} alt="image" />
                <div className=" flex flex-1">
                    <p className='text-[#020202] text-base font-normal pb-5'>{productName}</p>

                    <div className='flex items-center justify-between w-full'>
                        <span className="text-xs font-medium tracking-widest uppercase text-[#1d2236] flex items-center gap-2">

                            <Rating name="half-rating" size="small" defaultValue={ratings} precision={0.1} />
                        </span>



                        <div className="flex justify-between gap-5 bg-[#775050] rounded-[3rem] p-1">
                            <div>
                                <ProductsCounter
                                    key={product._id}
                                    product={product}
                                ></ProductsCounter>
                            </div>
                        </div>
                    </div>
                </div>
                {/* remove from cart button */}
                <button><TiDeleteOutline onClick={() => handleDelete(product._id)} className="w-8 h-8 text-[#775050]" /></button>
            </div>

        </div>
    );
};

export default CartCard;