

const CheckOutForm = () => {

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

                <div className="dark:text-white ">
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
                            defaultChecked 
                        />
                        <span className="ml-2 ">Debit card / Credit Card</span>
                    </label>
                </div>

                <button  type="submit" className="mt-8 w-full btn block px-8 py-2.5 bg-[#775050] text-white hover:bg-[#533131] dark:bg-[#1D2236] dark:hover:bg-[#4e6386]">Proceed to Checkout</button>
            </form>

        </div>
    );
};

export default CheckOutForm;