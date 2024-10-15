import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import NoData from '../../../NoData/NoData';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';

const UserWishlist = () => {

    // cart data from redux store
    const cart = useSelector((state) => state.cart)

    const dispacth = useDispatch()


    // Calculate total quantity and total amount
    const totalQuantity = cart?.cartIteams?.reduce((total, item) => total + item?.cartQuantity, 0);

    const totalAmount = cart?.cartIteams?.reduce((total, item) => total + (item?.cartQuantity * item?.price), 0);

    // Apply discount 
    const discount = 0.00 * totalAmount;
    const grandTotal = totalAmount - discount;

    return (
        <div className="p-8 min-h-screen space-y-4">

            <Helmet>
                <title>Best Deal | User Wishlists</title>
            </Helmet>

            {/* wishlists */}
            <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-base-300">
                <h1 className='font-bold my-4 underline underline-offset-2'>Your Wishlists!</h1>

                {/* wishlists and total amount */}

                <div className="w-full p-2 flex flex-col lg:flex-row gap-5 justify-around ">
                    <div className="w-full lg:w-[65%] ">
                        {
                            cart?.cartIteams?.length === 0 ?
                                <div><NoData></NoData></div> :
                                <div>
                                    {cart?.cartIteams?.map(product => (
                                        <UserCard
                                            key={product?._id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                        }
                    </div>

                    {/* Total bill Table */}
                    <div className="flex-grow" >
                        <div className=" bg-[rgb(217,217,217)] dark:bg-[#34394C] dark:text-white  rounded-md h-fit">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th className="text-white dark:text-black dark:bg-[#D6DFF2] bg-[#775050]">Quantity</th>
                                            <th className="text-white dark:text-black dark:bg-[#D6DFF2] bg-[#775050]">Total Amounts</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-black dark:text-white">
                                        {/* Quantity & Total Amounts */}
                                        <tr>
                                            <td>Item {totalQuantity} pcs</td>
                                            <td>$ {totalAmount?.toFixed(2)}</td>
                                        </tr>
                                        {/* Discount */}
                                        <tr className="dark:bg-[#34394C]">
                                            <td>Discount</td>
                                            <td>0%</td>
                                        </tr>
                                        {/* Grand Total */}
                                        <tr>
                                            <td>Grand Total</td>
                                            <td>$ {grandTotal?.toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* link back to cart list */}
                        <Link
                            className='btn btn-primary mt-2 w-full'
                            to='/cartlist'
                        >
                            Go To Wishlist
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default UserWishlist;