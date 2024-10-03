import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import './StripeCheckoutForm.css';
import Swal from "sweetalert2";
import InvoiceModal from "../Invoice/InvoiceModal";
import { useDispatch } from "react-redux";
import { removeAllFromCartlist } from "../../features/CartSlice/CartSlice";


const StripeCheckoutForm = ({ CheckoutPrice, contactInfo, closeModal, booking, handleClearCartList,setChangeInvoice }) => {

    const dispatch= useDispatch()

    // strip hooks
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    // invoice state
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [paymentInfoForInvoice, setPaymentInfoForInvoice] = useState({});

    // set invoice state
    setChangeInvoice(showInvoiceModal)

    // error handling
    const [paymentError, setPaymentError] = useState('');

    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        // fetch client secret
        if (CheckoutPrice && CheckoutPrice > 0) {
            // console.log(CheckoutPrice && CheckoutPrice > 0)
            getClientSecret({ price: CheckoutPrice })
        }
    }, [CheckoutPrice]);

    // get client secret / payment intent secret
    const getClientSecret = async price => {
        // Create PaymentIntent as soon as the page loads
        const { data } = await axiosSecure.post("/create-payment-intent", price)
        console.log('clientSecret from server--->', data.clientSecret)
        setClientSecret(data.clientSecret);
    }

    // handle submission
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        setProcessing(true);

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how to find your CardElement because there can only ever be one of each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('[error]', error);
            setPaymentError(error.message);
            setProcessing(false)
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            // clear error
            setPaymentError('');
            setProcessing(false)
        }

        // confirm payment
        const { error: confirmError, paymentIntent } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email,
                        name: user?.displayName,
                    },
                },
            })

        // payment error
        if (confirmError) {
            console.log('confirm payment error ===>', confirmError)
            setPaymentError(confirmError.message)
            setProcessing(false)
            return
        }

        // succeed payment
        if (paymentIntent.status === 'succeeded') {
            // console.log('succeed payment ===>', paymentIntent)
            // 1. Create payment info object
            const billingAddress = contactInfo;
            const paymentInfo = {
                ...booking,
                transactionId: paymentIntent.id,
            };
            setPaymentInfoForInvoice(paymentInfo);
            delete paymentInfo._id
            // console.log(paymentInfo)
            try {
                // 2. save payment info in booking collection (db)
                const { data: data1 } = await axiosSecure.post(`/purchaseHistory/${user?.email}`, paymentInfo)
                const { data: data2 } = await axiosSecure.post(`/billingAddress/${user?.email}`, billingAddress)
                console.log('from stripe checkout =>', data1, data2)

                // update ui
                // refetch()
                if (data1 && data2) {
                    Swal.fire({
                        title: `Successfully Payed!`,
                        text: `Your Payment is successful! 🎉`,
                        icon: 'success',
                        confirmButtonText: 'Cool!'
                    }).then((result) => {
                        dispatch(removeAllFromCartlist())
                        // toast.success('You might want to clear the wishlist!', { autoClose: 2000, theme: "colored" })
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Do you want to Have your Invoice?",
                                showDenyButton: true,
                                showCancelButton: true,
                                confirmButtonText: "Yes!",
                                denyButtonText: `Nope`
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    // Swal.fire("Saved!", "", "success");
                                    setShowInvoiceModal(true);
                                    navigate('/cartlist');
                                }
                                else if (result.isDenied) {
                                    Swal.fire("We understand your choice!", "", "info");
                                    setShowInvoiceModal(true);
                                }
                            });

                        }
                        // refetch()
                    });
                } else {
                    toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" })
                    // refetch()
                }

                closeModal()

            } catch (err) {
                // console.log(err)
                toast.error(`Something went Wrong! : ${err.message}`, { autoClose: 2000, theme: "colored" })
            }
        }

        setProcessing(false)

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {!showInvoiceModal && (
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                )}


                {/* error message */}
                {paymentError && <p className="text-red-500 my-2">{paymentError}</p>}

                {!showInvoiceModal && (
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        // onClick={handleInvoice}
                        disabled={!stripe || !clientSecret || processing}>
                        {processing ? (
                            <ImSpinner9 className='animate-spin m-auto' size={24} />
                        ) : (
                            `Pay ${CheckoutPrice}$`
                        )}
                    </button>
                )}


            </form>

            {/* invoice */}
            {showInvoiceModal && (
                <InvoiceModal
                    handleClearCartList={handleClearCartList}
                    CheckoutPrice={CheckoutPrice}
                    contactInfo={contactInfo}
                    paymentInfo={paymentInfoForInvoice}
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

StripeCheckoutForm.propTypes = {
    CheckoutPrice: PropTypes.number,
    // refetch: PropTypes.func,
    closeModal: PropTypes.func,
    booking: PropTypes.object,
    contactInfo: PropTypes.object,
    handleClearCartList: PropTypes.func,
    setChangeInvoice: PropTypes.func,
    // isOpen: PropTypes.bool,
}

export default StripeCheckoutForm;