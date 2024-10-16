import React, { useEffect, useState } from 'react';
import useUserProfile from '../../../../hooks/useUserProfile';
import PurchaseHistoryTable from './PurchaseHistoryTable ';
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';

const OrderManagement = () => {

    // profile info
    const { profile } = useUserProfile();

    // get purchase History
    const purchaseHistory = profile[0]?.purchaseHistory || [];

    // console.log(purchaseHistory[0]?.items)

    // aos animation use effect
    useEffect(() => {
        AOS.init({
            duration: 500
        });
    }, []);

    return (
        <div className="p-8 min-h-screen space-y-4" data-aos='fade-up-left'>

            <Helmet>
                <title>Best Deal | Order Management</title>
            </Helmet>

            <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-base-300 min-h-[90vh]">
                {/* headline */}
                <h1 className='font-bold my-4 underline underline-offset-2' data-aos='fade-up-left' data-aos-duration="500">Purchase History</h1>
                
                {/* tanstack table */}
                <div className='p-2 w-full' data-aos='fade-up-left' data-aos-duration="1500">
                    <PurchaseHistoryTable data={purchaseHistory} />
                </div>
            </div>

        </div>
    );
};

export default OrderManagement;