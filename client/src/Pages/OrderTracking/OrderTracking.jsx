import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../Components/ReUsableComponent/SectionHeader";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const OrderTracking = () => {
    const [trackinID, setTrackingID] = useState("");
    const [order, setOrder] = useState([])
    const axiosCommon = useAxiosCommon();
    const location = useLocation();


    // Fetch tracking ID from URL
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const trackingID = queryParams.get("trackingID");
        if (trackingID) {
            setTrackingID(trackingID);
            handleTracking(trackingID);
        }
    }, [location]);

    const handleTracking = async (trackingID) => {
        try {
            const res = await axiosCommon.get(`/order-track/${trackingID}`);
            setOrder(res?.data[0]);
        } catch (error) {
            console.error('Error fetching tracking information:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(trackinID);
        const res = await axiosCommon.get(`/order-track/${trackinID}`);
        setOrder(res?.data[0])

    };



    return (
        <div>
            <div className="my-10"><SectionHeader title={'Track your order'} /></div>

            {/* Search bar */}
            <div className="p-5 mx-auto lg:mt-5 max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <label className="input input-bordered flex w-full pr-0 items-center bg-gray-200">
                        <input
                            value={trackinID}
                            onChange={(e) => setTrackingID(e.target.value)}
                            type="text"
                            className="w-full"
                            placeholder="Enter tracking ID"
                        />
                        <button type="submit" className="btn btn-primary">Track Now</button>
                    </label>
                </form>
            </div>

            {/* Order Tracking Steps */}
            <div>
                <div className="flex flex-col my-10  items-center gap-[10px] justify-center w-full">
                    {order && order.statusHistory ? (
                        order.statusHistory.slice().reverse().map((status, index) => {
                            // Format date and time
                            const dateObj = new Date(status.date);
                            const formattedDate = dateObj.toLocaleDateString('en-GB');  // Formats as dd/mm/yyyy
                            const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); // Formats as 10:30 PM

                            return (
                                <div key={index} className="flex flex-1  items-start gap-[20px]">
                                    <div className="flex   flex-col items-center">
                                        <p className={`w-[35px]  h-[35px] flex items-center justify-center rounded-full text-white text-[1rem] ${index <= order.statusHistory.length ? 'bg-primary' : 'bg-gray-200 text-gray-500'}`}>
                                            {order.statusHistory.length - index}  {/* Steps in reverse order */}
                                        </p>
                                        {index < order.statusHistory.length - 1 && (
                                            <div className={`w-[4px] h-[70px] mt-[10px] ${index < order.statusHistory.length ? 'bg-primary' : 'bg-gray-300'}`}></div>
                                        )}
                                    </div>
                                    <div className="">
                                        <h1 className="text-[1.1rem] text-gray-700 dark:text-white ">{status.status}</h1>
                                        <p className="text-[0.9rem] text-gray-500 dark:text-white">{formattedDate}, {formattedTime}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500 mt-5">No order found with this ID or no tracking information available.</p>
                    )}
                </div>
            </div>


        </div>
    );
};

export default OrderTracking;
