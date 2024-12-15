import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Pagination from "../../Components/Pagination/Pagination";
import OrdersRow from "./OrdersRow";
import { ClimbingBoxLoader } from "react-spinners";

const AllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [orders, setOrders] = useState([])

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allOrders', searchText, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-orders', {
                params: {
                    search: searchText,
                    page: currentPage,
                    limit: 10
                }
            });
            setOrders(res.data.orders)
            return res.data;
        },
    });

    console.log(data);


    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        refetch();
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    // // loader
    // if (isLoading) {
    //     return <div className="flex justify-center items-center h-screen">
    //         <ClimbingBoxLoader color="#36d7b7" />
    //     </div>;
    // }

    return (
        <div>
            {/* Search bar */}
            <div className="p-5 mx-auto lg:mt-5 max-w-[500px]">
                <form onSubmit={handleSearch}>
                    <label className="input input-bordered flex w-full pr-0 items-center bg-gray-200">
                        <input
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Enter Customer Name/Number"
                            type="text"
                            className="w-full"
                        />
                        <button type="submit" className="btn btn-primary">Seach</button>
                    </label>
                </form>
            </div>

            <div className="overflow-x-auto lg:ml-4">
                <table className="table w-full min-w-max">
                    {/* head */}
                    <thead >
                        <tr >
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Customer Name</th>
                            <th>Number</th>
                            <th>Address</th>
                            <th>Total Bill</th>
                            <th>Order Status</th>
                            <th>Payment</th>
                            <th>View Details</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map(order => <OrdersRow
                                key={order._id}
                                order={order}
                                refetch={refetch}
                            ></OrdersRow>)
                        }
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={data?.totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default AllOrders;
