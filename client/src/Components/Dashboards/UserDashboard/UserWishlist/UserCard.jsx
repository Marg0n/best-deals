import React from 'react';
import { useDispatch } from 'react-redux';

const UserCard = ({ product }) => {

    const dispatch = useDispatch();

    const { productName,
        productImage,
        description,
        price,
        category,
        ratings,
        cartQuantity,
        creationDateTime, _id } = product

    return (
        <div>
            <div className='flex flex-col md:flex-row lg:flex-row justify-between items-center gap-2 bg-[#D9D9D9] p-3 rounded-md mb-3'>

                {/* prodcut image , name and price box */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
                    {/* image */}
                    <img className='w-24 h-20 rounded-[27px]' src={productImage} alt="image" />

                    {/* name, quantity & price */}
                    <div className=" flex flex-1 gap-4 w-full">
                        <p className='text-[#020202] text-base font-bold w-1/2 '>{productName}</p>

                        <div className='flex items-center justify-between w-1/2'>
                            <span className="text-xs font-semibold tracking-widest  text-[#1d2236] text-center w-1/2">
                                {cartQuantity ? cartQuantity : quality} items
                            </span>
                            <span className="text-xs font-semibold tracking-widest uppercase text-[#1d2236] flex items-center gap-2 w-1/2">
                                ${price}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserCard;