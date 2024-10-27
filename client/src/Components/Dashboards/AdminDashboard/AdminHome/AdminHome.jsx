import React, { useState, useEffect } from 'react';
import StatCard from '../../Shared/StatCard';
import OverviewChart from './OverviewChart';
import useAxiosSecure from '../../../../hooks/useAxiosSecure'; // Assuming this is your Axios hook
import { Typography } from '@mui/material';
import useUserProfile from '../../../../hooks/useUserProfile';
import AOS from 'aos';
import ProfileInfo from '../../Shared/ProfileInfo';
import BarChart from '../../Shared/BarChart';
import PropTypes from 'prop-types';

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
    const rvenue = totalRevenue * .1 || 0;

    // profile info
    const { profile } = useUserProfile();

    // total spending stat
    const [totalSpending, setTotalSpending] = useState();


    // looping through all purchases amount
    useEffect(() => {
        if (profile && profile[0]?.purchaseHistory) {
            const total = profile[0]?.purchaseHistory
                ?.map(purchase => purchase?.totalAmount)
                .reduce((sum, amount) => sum + amount, 0);
            setTotalSpending(total);
        }
    }, [profile]);

    // get purchase History
    const userData = profile[0]?.purchaseHistory;

    const transformData = (data) => {
        return data?.map(order => ({
            orderDate: order.orderDate,
            totalAmount: order.totalAmount
        }));
    };

    const purchaseHistory = transformData(userData);

    // get monthly total amount
    const getMonthlyTotals = (history) => {
        const totals = {};

        history?.forEach(order => {
            const date = new Date(order.orderDate);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            const key = `${month} ${year}`;

            if (!totals[key]) {
                totals[key] = 0;
            }
            totals[key] += order.totalAmount;
        });

        return totals;
    };

    const monthlyTotals = getMonthlyTotals(purchaseHistory);

    // aos animation use effect
    useEffect(() => {
        AOS.init({
            duration: 500
        });
    }, []);

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }


    return (
        <div className="p-8 min-h-screen space-y-4">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Transaction"
                    value={`$ ${totalRevenue?.toFixed(2) || '0.00'}`}
                // percentage={25.2}
                // increase={true}
                // description={`Total Transactions: ${totalTransactions || '0'}`} // Show total transactions
                />
                <StatCard
                    title="Revenue"
                    value={`$ ${rvenue?.toFixed(2)}`}
                />
                <StatCard
                    title="Users"
                    value={totalUsers || '0'}
                />
                <StatCard
                    title="Vendors"
                    value={totalVendors || '0'} count
                />
                <StatCard
                    title={'Total Times Buy'}
                    value={profile[0]?.purchaseHistory?.length}
                />
                <StatCard
                    title={'Total Spendings'}
                    value={totalSpending}
                />
            </div>

            {/* profile info */}
            <ProfileInfo />

            {/* Chart section */}
            <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-base-300" data-aos="fade-up" data-aos-duration="1500">
                <h1 className='font-semibold my-4'>Monthly Purchase Totals</h1>
                <BarChart data={monthlyTotals} />
            </div>

            {/* Overview Section */}
            <OverviewChart />
        </div>
    );
};

AdminHome.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    // percentage: PropTypes.number,
    // increase: PropTypes.bool,
    // description: PropTypes.string,
};

export default AdminHome;
