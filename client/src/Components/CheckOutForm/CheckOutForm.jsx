
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';


const CheckOutForm = ({ onSubmit, contactInfo }) => {

    // react form
    const {
        register,
        handleSubmit,
        // watch,
        reset,
        formState: { errors },
    } = useForm();



    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-2">

                    {/* name */}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200 font-semibold">Receiver Name</label>
                        <input name="name"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            type='text'
                            {...register("name", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.name && <span className="text-red-500">Please fill up Name field</span>}
                        </div>
                    </div>

                    {/* contacts */}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200 font-semibold" >Contact Number</label>
                        <input
                            name="contact"
                            type='number'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            {...register("contact", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.contact && <span className="text-red-500">Please fill up contact field</span>}
                        </div>
                    </div>

                    {/* address */}
                    <div className="w-full">
                        <label className="text-gray-700 dark:text-gray-200 font-semibold">Billing Address</label>
                        <textarea
                            name="address"
                            type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            {...register("address", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.address && <span className="text-red-500">Please fill up address field</span>}
                        </div>
                    </div>
                </div>

                {/* payment method */}
                <div className="dark:text-white ">
                    <h2 className="font-bold mt-4 ">Payment Method</h2>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Cash on delivery"
                            className="radio mt-1"
                            disabled={contactInfo !==null && contactInfo?.paymentMethod ==="Card"}
                            {...register("paymentMethod", { required: true })}
                        />
                        <span className="ml-2">Cash On Delivery</span>
                    </label>
                    <label className="flex items-center mt-1">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Card"
                            className="radio mt-1"
                            disabled={contactInfo !==null && contactInfo?.paymentMethod ==="Cash on delivery"}
                            defaultChecked
                            {...register("paymentMethod", { required: true })}
                        />
                        <span className="ml-2 ">Debit card / Credit Card</span>
                    </label>

                    <div className="mt-1 animate-pulse">
                        {errors.paymentMethod && <span className="text-red-500">Please fill up Payment Method field</span>}
                    </div>
                </div>

                {(contactInfo == null)
                    && <button type="submit" className="mt-8 w-full btn block px-8 py-2.5  dark:bg-[#1D2236] dark:hover:bg-[#4e6386] bg-[#775050] text-white hover:bg-[#533131]"
                    // onClick={() => reset()}
                    >
                        Confirm
                    </button>
                }




            </form>
        </div>
    );
};

CheckOutForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    contactInfo: PropTypes.object,
};

export default CheckOutForm;