import React, { useEffect, useState } from 'react';
import useUserProfile from '../../../../hooks/useUserProfile';
import PurchaseHistoryTable from './PurchaseHistoryTable ';
import { Helmet } from 'react-helmet-async';
import AOS from 'aos'
import { TextField } from '@mui/material';

const OrderManagement = () => {

    // profile info
    const { profile } = useUserProfile();

    // get purchase History
    const purchaseHistory = profile[0]?.purchaseHistory || [];

    // state for search query
    const [searchQuery, setSearchQuery] = useState('');
    console.log(purchaseHistory[0]?.items)

    // filter purchase history based on search query
    // const filteredPurchaseHistory = purchaseHistory?.filter(item =>
    //     item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    // );

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
                <h1 className='font-bold my-4 underline underline-offset-2'>Purchase History</h1>

                {/* search input */}
                <TextField
                    type="text"
                    placeholder="Search by product name"
                    label="Search by Product Name"
                    variant="outlined"
                    // fullWidth
                    margin="normal"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4 p-2 border rounded"
                />

                {/* tanstack table */}
                <div className='p-2'>
                    <PurchaseHistoryTable data={purchaseHistory} />
                </div>
            </div>

        </div>
    );
};

export default OrderManagement;