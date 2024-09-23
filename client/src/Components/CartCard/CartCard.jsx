import { Rating } from "@mui/material";
import { useState } from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";


const CartCard = ({ product }) => {

    const [count, setCount] = useState(1)
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

    const handleDelete = (_id) => {
        const remainProducts = cartProducts.filter(product => product._id !== _id);
        localStorage.setItem('cart', JSON.stringify(remainProducts));
    }

    const { productName,
        brandName,
        productImage,
        description,
        price,
        category,
        ratings,
        creationDateTime } = product

    const handleIncrement = () => {
        setCount(count + 1)
    }
    const handleDecrement = () => {
        if (count === 1) {
            setCount(1)
        }
        else {
            setCount(count - 1)
        }
    }
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
                                <button onClick={handleIncrement} className="btn btn-xs btn-circle mt-1 ">
                                    <FiPlusCircle className="w-full h-full text-[#775050]" />
                                </button>
                            </div>
                            <div className="text-white font-semibold text-lg">{count}</div>
                            <div>
                                <button onClick={handleDecrement} className="btn btn-xs btn-circle mt-1">
                                    <FiMinusCircle className="w-full h-full text-[#775050]" />
                                </button>
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