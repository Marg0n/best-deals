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
        creationDateTime, _id, veriation } = product

    // console.log(product);



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
                    <img className='md:w-24 w-56 md:h-20 h-40 rounded-[27px]' src={productImage} alt="image" />

                    {/* details */}
                    <div className=" flex flex-col md:flex-row flex-1 gap-4 w-full">
                        <p className='text-[#020202] text-base text-center md:text-left font-bold md:w-1/2 '>{productName}</p>

                        <div className='flex flex-col text-center md:text-left md:w-1/2 '>
                            <h1 className='text-[#020202] text-base font-normal'>{product?.veriation}</h1>
                            <span className="text-xs font-medium tracking-widest uppercase text-[#1d2236] gap-2">
                                ${price}
                            </span>
                        </div>
                    </div>

                </div>

                {/* quantity and delete button box */}
                <div className="flex justify-between items-center w-2/3 md:w-auto">
                    <div className="flex flex-col lg:flex-row justify-between gap-5 bg-[#775050] rounded-[3rem] p-1 w-full md:w-auto">
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