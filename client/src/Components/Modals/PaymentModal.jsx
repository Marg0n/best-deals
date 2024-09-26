import React, { useState } from 'react';
import CheckoutForm from '../Payments/CheckoutForm';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY_CLIENT);

const PaymentModal = () => {


    // modal close/open
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }


    return (
        <div>
            <dialog id="my_modal_1" className="modal" open={isOpen} onClose={closeModal}>

                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center mb-4">Pay to Proceed!</h3>
                    {/* <p className="py-4">Press ESC key or click the button below to close</p> */}

                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            CheckoutPrice={100}
                            // refetch={refetch} 
                            closeModal={closeModal}
                        // booking={booking} 
                        // handleBookNow={handleBookNow} 
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
                className=" w-full btn block px-8 py-2.5 bg-[#775050] text-white hover:bg-[#533131]"
                onClick={() => setIsOpen(true)}
            >
                Checkout
            </button>

        </div>
    );
};

export default PaymentModal;