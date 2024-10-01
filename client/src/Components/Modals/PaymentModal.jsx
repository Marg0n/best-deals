import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from 'react';
import StripeCheckoutForm from '../Payments/StripeCheckoutForm';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useAxiosSecure from "../../hooks/useAxiosSecure";


// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY_CLIENT);

const PaymentModal = ({ CheckoutPrice }) => {


    // modal close/open
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    // loading
    const [ loading, setLoading] = useState(false);

    // custom axios request
    const axiosSecure = useAxiosSecure();

    // cart data from redux store
    const cart = useSelector((state) => state.cart);

    // Calculate total quantity and total amount
    const totalQuantity = cart.cartIteams.reduce((total, item) => total + item.cartQuantity, 0);

    const totalAmount = cart.cartIteams.reduce((total, item) => total + (item.cartQuantity * item.price), 0);

    // insert checkout data into purchaseHistory
    const orderId = Date.now();
    const orderDate = new Date().toUTCString();
    const items = [cart.cartIteams];
    const status = 'Pending';
    const paymentMethod = '';
    const shippingAddress = [];

    const booking = { orderId, orderDate, items, totalAmount, status, paymentMethod,shippingAddress };

    console.log('invoice related ==>',booking);


    const handleInvoice = async () => {

        try {
            // loading
            setLoading(true);

            const { data } = await axiosSecure.post(`/purchaseHistory`, booking)

            if (data) {
                Swal.fire({
                    title: `Successfully Payed!`,
                    text: `Your Payment is successful! 🎉`,
                    icon: 'success',
                    confirmButtonText: 'Cool!'
                }).then(() => {
                    // loader
                    setLoading(false)
                    // refetch()
                });
            } else {
                toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" })
                // loader
                setLoading(false)
                // refetch()
            }

        }
        catch (err) {
            // console.log(err);
            toast.error(err.response.data, { autoClose: 5000, theme: "colored" });
            setLoading(false);
            // refetch()
        }
    }


    return (
        <div>
            <dialog id="my_modal_1" className="modal" open={isOpen} onClose={closeModal}>

                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center mb-4">Pay to Proceed!</h3>

                    {/* stripe payment */}
                    <Elements stripe={stripePromise}>
                        <StripeCheckoutForm
                            CheckoutPrice={CheckoutPrice}
                            // refetch={refetch} 
                            closeModal={closeModal}
                        // booking={booking} 
                        // handleInvoice={handleInvoice} 
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
                className="mt-8 w-full btn block px-8 py-2.5 bg-[#775050] text-white hover:bg-[#533131]"
                onClick={() => setIsOpen(true)}
            >
                Checkout
            </button>

        </div>
    );
};

PaymentModal.propTypes = {
    CheckoutPrice: PropTypes.number,
}

export default PaymentModal;