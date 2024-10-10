import React from 'react';
import useUserProfile from '../../../../hooks/useUserProfile';
import PurchaseHistoryTable from './PurchaseHistoryTable ';
import { Helmet } from 'react-helmet-async';

const OrderManagement = () => {

    // profile info
    const { profile } = useUserProfile();

    // get purchase History
    const purchaseHistory = profile[0]?.purchaseHistory;

    return (
        <div className="p-8 min-h-screen space-y-4">

            <Helmet>
                <title>Best Deal | Order Management</title>
            </Helmet>

            <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-base-300">
                {/* headline */}
                <h1 className='font-bold my-4 underline underline-offset-2'>Purchase History</h1>

                {/* tanstack table */}
                <div className='p-2'>
                    <PurchaseHistoryTable data={purchaseHistory} />
                </div>
            </div>

        </div>
    );
};

export default OrderManagement;