import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../../Components/CartCard/CartCard";
import CheckOutForm from "../../Components/CheckOutForm/CheckOutForm";
import LeftMenubar from "../../Components/LeftMenuBar/LeftMenuBar";
import PaymentModal from "../../Components/Modals/PaymentModal";
import NoData from "../../Components/NoData/NoData";
import { ScrollRestoration } from "react-router-dom";
import { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { removeAllFromCartlist } from "../../features/CartSlice/CartSlice";
import Swal from "sweetalert2";




const CartPage = () => {

    // cart data from redux store
    const cart = useSelector((state) => state.cart)

    const dispacth = useDispatch()


    // Calculate total quantity and total amount
    const totalQuantity = cart.cartIteams.reduce((total, item) => total + item.cartQuantity, 0);

    const totalAmount = cart.cartIteams.reduce((total, item) => total + (item.cartQuantity * item.price), 0);

    // Apply discount 
    const discount = 0.00 * totalAmount;
    const grandTotal = totalAmount - discount;

    // state for contact information
    const [contactInfo, setContactInfo] = useState({})

    // contact info
    const onSubmit = async (data) => {

        // fetch data from the form
        const { address, contact, name, paymentMethod } = data;

        setContactInfo(data);
    }

    // clear all products from cartList

    const handleClearCartList = () => {

        Swal.fire({
            title: `Are you sure?`,
            text: ` It will remove ${cart.cartIteams.length} items from your cart `,
            imageUrl: "https://i.ibb.co.com/rpHtZmy/oh-no-message-bubble-sticker-vector-removebg-preview.png",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Custom image",
            showCancelButton: true,
            confirmButtonColor: "#1D2236",
            cancelButtonColor: "#775050",
            confirmButtonText: "Yes, Delete All!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Cart is Empty",
                    icon: "success"
                });
                dispacth(removeAllFromCartlist())
            }
        });
    }

    return (
        <div className=" flex p-5 gap-y-5 md:gap-5">
            <Helmet>
                <title>Best Deal | Cart list</title>
            </Helmet>
            <ScrollRestoration></ScrollRestoration>

            {/*Left Side menubar / categorybar  */}
            <div className="flex-1">
                <LeftMenubar></LeftMenubar>
            </div>

            {/* cart list */}
            <div className="w-full lg:w-3/4 flex flex-col lg:flex-row gap-5 justify-around ">
                <div className="w-full lg:w-[65%] ">
                    {
                        cart.cartIteams.length === 0 ?
                            <div><NoData></NoData></div> :
                            <div>
                                <div>
                                    {cart.cartIteams?.map(product => (
                                        <CartCard
                                            key={product._id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                                <div onClick={handleClearCartList} className="flex btn items-center dark:text-white gap-2 text-lg  dark:bg-[#1D2236] dark:hover:bg-[#4e6386] bg-[#775050] text-white hover:bg-[#533131]">
                                    <MdDeleteSweep />
                                    <h1>Clear Cartlist</h1>
                                </div>
                            </div>
                    }
                </div>

                {/* Total bill Table */}
                <div className="flex-grow" >
                    <div className=" bg-[rgb(217,217,217)] dark:bg-[#34394C] dark:text-white  h-fit">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="text-white dark:text-black dark:bg-[#D6DFF2] bg-[#775050]">Quantity</th>
                                        <th className="text-white dark:text-black dark:bg-[#D6DFF2] bg-[#775050]">Total Amounts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Quantity & Total Amounts */}
                                    <tr>
                                        <td>{totalQuantity}</td>
                                        <td>$ {totalAmount.toFixed(2)}</td>
                                    </tr>
                                    {/* Discount */}
                                    <tr>
                                        <td>Discount</td>
                                        <td>0%</td>
                                    </tr>
                                    {/* Grand Total */}
                                    <tr>
                                        <td>Grand Total</td>
                                        <td>$ {grandTotal.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>


                        {(contactInfo !== undefined || contactInfo !== null)
                            ? <CheckOutForm onSubmit={onSubmit}></CheckOutForm>
                            : <div className="disabled:">
                                <CheckOutForm onSubmit={onSubmit}></CheckOutForm>
                            </div>
                        }


                        {/* payment method */}
                        {
                            contactInfo?.paymentMethod === "Card"
                            && <PaymentModal
                                CheckoutPrice={parseInt(grandTotal.toFixed(2))}
                                contactInfo={contactInfo}
                            />
                        }

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartPage;