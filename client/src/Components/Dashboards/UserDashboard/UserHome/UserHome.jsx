import React, { useEffect, useState } from 'react';
import StatCard from '../../Shared/StatCard';
import ProfileInfo from '../../Shared/ProfileInfo';
import useUserProfile from '../../../../hooks/useUserProfile';
import PropTypes from 'prop-types';
import BarChart from '../../Shared/BarChart';
import { Helmet } from "react-helmet-async";

const UserHome = () => {

    // profile info
    const { profile } = useUserProfile();
    // console.log('billing', profile[0]?.billingAddress)
    // console.log('buy', profile[0]?.purchaseHistory)

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


    return (
        <div className="p-8 min-h-screen space-y-4">

            <Helmet>
                <title>Best Deal | User Dashboard</title>
            </Helmet>

            {/* stat section */}
            <div className='flex gap-2 items-center justify-center'>
                <StatCard
                    title={'Total Times Buy'}
                    value={profile[0]?.purchaseHistory?.length}
                // percentage={25}
                // increase={true}
                // description={'more'}
                />
                <StatCard
                    title={'Total Spendings'}
                    value={totalSpending}
                // percentage={25}
                // increase={true}
                // description={'more'}
                />
            </div>

            {/* profile info */}
            <ProfileInfo />

            {/* Account settings */}

            {/* Chart section */}
            <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-base-300">
                <h1 className='font-semibold my-4'>Monthly Purchase Totals</h1>
                <BarChart data={monthlyTotals} />
            </div>

        </div>
    );
};

UserHome.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    // percentage: PropTypes.number,
    // increase: PropTypes.bool,
    // description: PropTypes.string,
};

export default UserHome;