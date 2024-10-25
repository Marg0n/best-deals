import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { toast } from "react-toastify";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import useAxiosCommon from '../../hooks/useAxiosCommon';

const OrdersRow = ({ order, refetch}) => {
    const axiosCommon = useAxiosCommon()

    const [viewDetailsModal, setViewDetailsModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState(order.status);

    const handleViewOrderDetails = () => {
        setViewDetailsModal(true);
    };

    const handleCloseViewOrderDetails = () => {
        setViewDetailsModal(false);
    };

    const handleEditOrder = () => {
        setEditModal(true);
    };

    const handleCloseEditOrder = () => {
        setEditModal(false);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleSave = async () => {
        const updatedStatus = { orderID: order?._id, status: selectedStatus };
        try {
            const res = await axiosCommon.patch('/orderStatus', updatedStatus);

            if (res.status === 200) { 
                handleCloseEditOrder(); 
                refetch()
                toast.success('Order Updated');  
                // setToast(2)
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred while updating the order'); 
        }
    };


    return (
        <>
            {/* Order Row */}
            <tr className='bg-white'>
                <td>{order._id}</td>
                <td>{order.orderDate}</td>
                <td>{order.name}</td>
                <td>{order.contact}</td>
                <td>{order.address}</td>
                <td>{order.totalAmount}</td>
                <td>{order.status === 'Payed' || order.status === 'Ordered' ? 'New Order' : order.status}</td>
                <td>{order.paymentMethod === 'Card' ? 'Paid' : order.paymentMethod}</td>
                <td>
                    <button className='btn bg-[#775050] border-none text-white ' onClick={handleViewOrderDetails}>
                        View details
                    </button>
                </td>
                <td>
                    <div className='btn bg-[#775050] border-none text-white' onClick={handleEditOrder}>
                        <CiEdit />
                    </div>
                </td>
            </tr>

            {/* View Details Modal */}
            <Dialog open={viewDetailsModal} as="div" className="relative z-10" onClose={handleCloseViewOrderDetails}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg duration-300 ease-out">
                            <DialogTitle as="h3" className="text-lg font-medium text-gray-900">
                                Order Details
                            </DialogTitle>
                            <p className="mt-2 text-sm text-gray-600">
                                Order ID : {order._id}
                            </p>
                            <h1>Customer Name : {order.name}</h1>
                            <h1>Number : {order.contact}</h1>
                            <div>
                                {
                                    order?.items?.map((item, index) => (
                                        <div key={index}>
                                            <h1>Items : {item.length}</h1>
                                            <ul>
                                                {
                                                    item?.map((product, innerIndex) => (
                                                        <li key={product._id} className="flex items-center justify-between gap-4 my-2">
                                                            <h1>{innerIndex + 1}. {product.productName} * {product.cartQuantity} = {product.price * product.cartQuantity}</h1>
                                                            <img className='w-16 h-16 object-cover' src={product.productImage} alt={product.productName} />
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner hover:bg-gray-600 focus:outline-none"
                                    onClick={handleCloseViewOrderDetails}
                                >
                                    Done
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            {/* Edit Status Modal */}
            <Dialog open={editModal} as="div" className="relative z-10" onClose={handleCloseEditOrder}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg duration-300 ease-out">
                            <DialogTitle as="h3" className="text-lg font-medium text-gray-900">
                                Edit Order Status
                            </DialogTitle>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Select Order Status:
                                </label>
                                <select
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={selectedStatus}
                                    onChange={handleStatusChange}
                                >
                                    <option value="newOrder">New Order</option>
                                    <option value="inWarehouse">In Warehouse</option>
                                    <option value="onTheWayToDelivery">On the way to delivery</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="canceled">Canceled</option>
                                </select>
                            </div>
                            <div className="mt-6">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner hover:bg-gray-600 focus:outline-none"
                                    onClick={handleSave}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default OrdersRow;
