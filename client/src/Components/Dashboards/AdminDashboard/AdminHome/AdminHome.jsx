import React, { useState, useEffect } from 'react';
import StatCard from '../../Shared/StatCard';
import OverviewChart from './OverviewChart';
import useAxiosSecure from '../../../../hooks/useAxiosSecure'; // Assuming this is your Axios hook
import { Typography } from '@mui/material';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const [totalUsers, setTotalUsers] = useState(null);
    const [totalVendors, setTotalVendors] = useState(null);
    const [totalTransactions, setTotalTransactions] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch users and vendors count
                const usersResponse = await axiosSecure.get('/totalUsers');
                const vendorsResponse = await axiosSecure.get('/totalVendors');

                // Fetch total transactions and total revenue (totalAmount)
                const transactionsResponse = await axiosSecure.get('/totalTransactionss');

                // Set state for each data fetched
                setTotalUsers(usersResponse.data.totalUsers);
                setTotalVendors(vendorsResponse.data.totalVendors);
                setTotalTransactions(transactionsResponse.data.totalTransactions);
                setTotalRevenue(transactionsResponse.data.totalAmount);
                setIsLoading(false); // Stop loading after fetching data
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [axiosSecure]);

//revenue calculation
    const rvenue = totalRevenue?.toFixed(2)* .1 || 0;

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    
    return (
        <div className="p-8 min-h-screen">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Transaction"
                    value={`$${totalRevenue?.toFixed(2) || '0.00'}`}
                    percentage={25.2}  
                    increase={true}  
                    description={`Total Transactions: ${totalTransactions || '0'}`} // Show total transactions
                />
                <StatCard
                    title="Revenue"
                    value={`$ ${rvenue}`} 
                    percentage={-14.3}  
                    increase={false}  
                    description={`Previous: $15,312.22`} 
                />
                <StatCard
                    title="Users"
                    value={totalUsers || '0'} 
                    percentage={-20}
                    increase={false}
                    description="Previous: 750" 
                />
                <StatCard
                    title="Vendors"
                    value={totalVendors || '0'} count
                    percentage={15}
                    increase={true}
                    description="Previous: 18" 
                />
            </div>

            {/* Overview Section */}
            <OverviewChart />
        </div>
    );
};

export default AdminHome;
