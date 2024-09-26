import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PropTypes } from 'prop-types';
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import './StripeCheckoutForm.css';


const StripeCheckoutForm = ({ CheckoutPrice, refetch, closeModal, booking, handleBookNow }) => {

    // strip hooks
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate()

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
        // console.log('clientSecret from server--->', data.clientSecret)
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
            // console.log('confirm payment error ===>', confirmError)
            setPaymentError(confirmError.message)
            setProcessing(false)
            return
        }

        // succeed payment
        if (paymentIntent.status === 'succeeded') {
            // console.log('succeed payment ===>', paymentIntent)
            // 1. Create payment info object
            const paymentInfo = {
                ...booking,
                roomId: booking._id,
                transactionId: paymentIntent.id,
                date: new Date(),
            }
            delete paymentInfo._id
            // console.log(paymentInfo)
            try {
                // 2. save payment info in booking collection (db)
                //   const { data } = await axiosSecure.post('/booking', paymentInfo)
                //   console.log(data)

                // 3. change room status to booked in db
                //   await axiosSecure.patch(`/room/status/${bookingInfo?._id}`, {
                //     status: true,
                //   })

                // update ui
                refetch()
                closeModal()
                toast.success('Room Booked Successfully', { autoClose: 2000, theme: "colored" })
                navigate('/allTestPage')
            } catch (err) {
                // console.log(err)
                toast.error(`Something went Wrong! : ${err.message}`, { autoClose: 2000, theme: "colored" })
            }
        }

        setProcessing(false)

    }

    return (
        <form onSubmit={handleSubmit}>
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

            {/* error message */}
            {paymentError && <p className="text-red-500 my-2">{paymentError}</p>}

            <button
                type="submit"
                className="btn btn-primary w-full"
                onClick={handleBookNow}
                disabled={!stripe || !clientSecret || processing}>
                {processing ? (
                    <ImSpinner9 className='animate-spin m-auto' size={24} />
                ) : (
                    `Pay ${CheckoutPrice}$`
                )}
            </button>

        </form>
    );
};

StripeCheckoutForm.propTypes = {
    CheckoutPrice: PropTypes.number,
    refetch: PropTypes.func,
    closeModal: PropTypes.func,
    booking: PropTypes.object,
    handleBookNow: PropTypes.func,
    // isOpen: PropTypes.bool,
}

export default StripeCheckoutForm;