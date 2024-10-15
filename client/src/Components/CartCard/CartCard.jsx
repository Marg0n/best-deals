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
            <div className='flex flex-col md:flex-row lg:flex-row justify-between items-center gap-2 bg-[#D9D9D9] p-3 rounded-[22px] mb-3'>

                {/* prodcut image , name and price box */}
                <div className="flex  flex-col md:flex-row justify-between items-center gap-4 w-full">
                    {/* image */}
                    <img className='w-24  h-20 rounded-[27px]' src={productImage} alt="image" />

                    {/* name & price */}
                    <div className=" flex flex-1 gap-4 w-full">
                        <p className='text-[#020202] text-base font-bold w-1/2 '>{productName}</p>

                        <div className='flex items-center justify-between w-1/2'>
                            <span className="text-xs font-medium tracking-widest uppercase text-[#1d2236] flex items-center gap-2">
                                ${price}
                            </span>
                        </div>
                    </div>
                </div>

                {/* quantity and delete button box */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col lg:flex-row justify-between gap-5 bg-[#775050] rounded-[3rem] p-1">
                        <div>
                            <ProductsCounter
                                key={product._id}
                                product={product}
                            ></ProductsCounter>
                        </div>
                    </div>
                    {/* remove from cart button */}
                    <button><TiDeleteOutline onClick={() => handleDelete(product._id)} className="w-8 h-8 text-[#775050]" /></button>
                </div>
            </div>

        </div>
    );
};

export default CartCard;