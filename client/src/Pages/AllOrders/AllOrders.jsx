import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import OrdersRow from "./OrdersRow";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import toast from "react-hot-toast";

const AllOrders = () => {


    const axiosCommon = useAxiosCommon()
    const { data: allOrders, isLoading, refetch } = useQuery({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const res = axiosCommon.get('/all-orders')
            return (await res).data;
        }
    })


    return (
        <div className="p-8">
            <Helmet>
                <title>
                    Best Deal | Orders
                </title>
            </Helmet>
            <div className="">
                <table className="table">
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
                            allOrders?.map(order => <OrdersRow
                                key={order._id}
                                order={order}
                                refetch={refetch}
                            ></OrdersRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;