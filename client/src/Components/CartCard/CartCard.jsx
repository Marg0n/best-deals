import { Rating } from "@mui/material";
import { useState } from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

const CartCard = () => {
    
    const [count, setCount] = useState(0)

    const handleIncrement = () => {
        setCount(count + 1)
    }
    const handleDecrement = () => {
        if (count === 0) {
            setCount(0)
        }
        else {
            setCount(count - 1)
        }
    }
    return (
        <div>
            <div className='flex items-center gap-2 bg-[#D9D9D9] p-3 rounded-[22px] mb-3'>
                <img className='w-24 h-20 rounded-[27px]' src={''} alt="image" />
                <div className="flex-1">
                    <p className='text-[#020202] text-base font-normal pb-5'>{'Test product'}</p>
                    <div className='flex items-center justify-between w-full'>
                        <span className="text-xs font-medium tracking-widest uppercase text-[#1d2236] flex items-center gap-2">

                            <Rating name="half-rating" size="small" defaultValue={'ratings'} precision={0.1} />
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
            </div>

        </div>
    );
};

export default CartCard;