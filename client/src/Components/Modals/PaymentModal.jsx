import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from 'react';
import StripeCheckoutForm from '../Payments/StripeCheckoutForm';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from 'react-icons/tb';


// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY_CLIENT);

const PaymentModal = ({ CheckoutPrice, contactInfo, handleClearCartList }) => {

    // user info from firebase
    const { user } = useAuth();

    // state of invoice button
    const [changeInvoice, setChangeInvoice] = useState(false);

    // modal close/open
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    // loading
    const [loading, setLoading] = useState(false);

    // custom axios request
    const axiosSecure = useAxiosSecure();

    // cart data from redux store
    const cart = useSelector((state) => state.cart);

    // Calculate total quantity and total amount
    const totalQuantity = cart?.cartIteams?.reduce((total, item) => total + item?.cartQuantity, 0);

    const totalAmount = cart?.cartIteams?.reduce((total, item) => {
        const price = item?.price;
        const discount = item?.discount ? item.price * (item.discount / 100) : 0; // Calculate discount if available
        const finalPrice = price - discount;
        return total + (item?.cartQuantity * finalPrice);
    }, 0);

    // insert checkout data into purchaseHistory
    // const orderId = Date.now();
    const orderDate = new Date().toUTCString();
    const items = [cart.cartIteams];
    const status = 'Payed';
    const paymentMethod = contactInfo.paymentMethod;

    const booking = { orderDate, items, totalAmount, status, paymentMethod };

    // const userAddress = contactInfo;


    // const handleInvoice = async () => {

    //     console.log('invoice related ==>', booking, contactInfo, user?.email);

    //     try {
    //         // loading
    //         setLoading(true);

    //         const { data1 } = await axiosSecure.post(`/purchaseHistory/${user?.email}`, booking)
    //         const { data2 } = await axiosSecure.post(`/billingAddress/${user?.email}`, userAddress)

    //         if (data1 && data2) {
    //             Swal.fire({
    //                 title: `Successfully Payed!`,
    //                 text: `Your Payment is successful! 🎉`,
    //                 icon: 'success',
    //                 confirmButtonText: 'Cool!'
    //             }).then(() => {
    //                 // loader
    //                 setLoading(false)
    //                 toast('You might want to clear the wishlist!', { autoClose: 2000, theme: "colored" })
    //                 // refetch()
    //             });
    //         } else {
    //             toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" })
    //             // loader
    //             setLoading(false)
    //             // refetch()
    //         }

    //     }
    //     catch (err) {
    //         // loader
    //         setLoading(false);
    //         toast.error(err.response.data, { autoClose: 5000, theme: "colored" });
    //         // refetch()
    //     }
    // }


    return (
        <div>
            <dialog id="my_modal_1" className="modal" open={isOpen} onClose={closeModal}>

                <div className="modal-box">
                    {
                        !changeInvoice ? <>
                            <h3 className="font-bold text-lg text-center mb-4">Pay to Proceed!</h3>
                        </> : <>
                            <h3 className="font-bold text-lg text-center mb-4">Your Invoice!</h3>
                        </>
                    }

                    {/* stripe payment */}
                    <Elements stripe={stripePromise}>
                        <StripeCheckoutForm
                            CheckoutPrice={CheckoutPrice}
                            contactInfo={contactInfo}
                            closeModal={closeModal}
                            booking={booking}
                            handleClearCartList={handleClearCartList}
                            setChangeInvoice={setChangeInvoice}
                        />
                    </Elements>

                    <div className="modal-action">
                        <form method="dialog" className="w-full">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-error w-full">Close</button>
                        </form>
                    </div>
                </div>

            </dialog>

            <button
                className="mt-8 w-full btn block px-8 py-2.5  dark:bg-[#1D2236] dark:hover:bg-[#4e6386] bg-[#775050] text-white hover:bg-[#533131]"
                onClick={() => setIsOpen(true)}
            >
                {(loading) ? <TbFidgetSpinner size={20} className="animate-spin w-full" /> : (!changeInvoice ? <span className="animate-pulse text-red-600">Checkout</span> : <span className="animate-pulse text-yellow-200">Invoice</span>)}
            </button>

        </div>
    );
};

PaymentModal.propTypes = {
    CheckoutPrice: PropTypes.number,
    contactInfo: PropTypes.object,
    handleClearCartList: PropTypes.func,
}

export default PaymentModal;