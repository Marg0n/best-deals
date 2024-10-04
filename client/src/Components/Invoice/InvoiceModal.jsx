import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { useState } from "react";
import Invoice from './Invoice';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const InvoiceModal = ({ handleClearCartList, CheckoutPrice, contactInfo, paymentInfo, closeModal: closeStripeModal }) => {

    // cart data from redux store
    const cart = useSelector((state) => state.cart)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckoutClick = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
        closeStripeModal();

        // clear cart list
        // { cart.cartIteams.length < 1 && handleClearCartList(); }

    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={handleCheckoutClick} type="submit" className="mt-8 w-full btn block px-8 py-2.5  dark:bg-[#1D2236] dark:hover:bg-[#4e6386] bg-[#775050] text-white hover:bg-[#533131]">Show Invoice</button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Order Confirmation Modal"
                className="p-6  bg-[#d9d9d9] rounded-md max-w-7xl w-2/4 mx-auto mt-20 h-[calc(100vh-8rem)] overflow-y-auto top-16 z-30"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <Invoice
                    closeModal={closeModal}
                    CheckoutPrice={CheckoutPrice}
                    contactInfo={contactInfo}
                    paymentInfo={paymentInfo}
                    handleClearCartList={handleClearCartList}
                ></Invoice>
            </Modal>
        </>
    );
};

InvoiceModal.propTypes = {
    handleClearCartList: PropTypes.func,
    booking: PropTypes.object,
    contactInfo: PropTypes.object,
    CheckoutPrice: PropTypes.number,
    closeStripeModal: PropTypes.func,
};

export default InvoiceModal;