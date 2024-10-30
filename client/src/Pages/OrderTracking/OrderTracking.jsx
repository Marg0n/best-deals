import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../Components/ReUsableComponent/SectionHeader";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useState } from "react";

const OrderTracking = () => {
    const [trackinID, setTrackingID] = useState("");
    const [order , setOrder] = useState([])
    const axiosCommon = useAxiosCommon();

    const handleTracking = async(e) => {
        e.preventDefault();
        console.log(trackinID);
        const res = await axiosCommon.get(`/order-track/${trackinID}`);
        console.log(res.data[0]);
        
    };

    

    return (
        <div>
            <div className="my-10 lg:my-20"><SectionHeader title={'Track your order'} /></div>

            {/* Search bar */}
            <div className="p-5 mx-auto lg:mt-5 max-w-[500px]">
                <form onSubmit={handleTracking}>
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

        </div>
    );
};

export default OrderTracking;
