import Modal from 'react-modal';
Modal.setAppElement('#root');
import { useState } from "react";
import Invoice from '../Invoice/Invoice';


const CheckOutForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckoutClick = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <form >
                <div className="mt-2">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200 font-semibold">Your Name</label>
                        <input name=""
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200 font-semibold" >Contact Number</label>
                        <input required name="" type="" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>

                    <div className="w-full">
                        <label className="text-gray-700 dark:text-gray-200 font-semibold">Billing Address</label>
                        <textarea required name="feedback" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                </div>

                <div>
                    <h2 className="font-bold mt-4 ">Payment Method</h2>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Cash on delivery"
                            className="radio mt-1"
                        />
                        <span className="ml-2">Cash On Delivery</span>
                    </label>
                    <label className="flex items-center mt-1">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Card"
                            className="radio mt-1"
                        />
                        <span className="ml-2">Debit card / Credit Card</span>
                    </label>
                </div>


                <button onClick={handleCheckoutClick} type="submit" className="mt-8 w-full btn block px-8 py-2.5 bg-[#775050] text-white hover:bg-[#533131]">Proceed to Checkout</button>
            </form>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Order Confirmation Modal"
                className="p-6  bg-[#d9d9d9] rounded-md max-w-7xl w-2/4 mx-auto mt-20 h-[calc(100vh-8rem)] overflow-y-auto top-16 z-30"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
             <Invoice closeModal={closeModal}></Invoice>
            </Modal>
        </div>
    );
};

export default CheckOutForm;