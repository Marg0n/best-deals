import React, { useEffect, useState } from 'react';
import StatCard from '../../Shared/StatCard';
import ProfileInfo from '../../Shared/ProfileInfo';
import useUserProfile from '../../../../hooks/useUserProfile';
import PropTypes from 'prop-types';

const UserHome = () => {

    // profile info
    const { profile } = useUserProfile();
    console.log('billing', profile[0]?.billingAddress)
    console.log('buy', profile[0]?.purchaseHistory)

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


    return (
        <div className="p-8 min-h-screen space-y-4">
            {/* stat section */}
            <div className='flex gap-2 shadow-lg rounded-md items-center justify-center'>
                <StatCard
                    title={'Total Times Buy'}
                    value={profile[0]?.purchaseHistory.length}
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

        </div>
    );
};

UserHome.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    percentage: PropTypes.number,
    increase: PropTypes.bool,
    description: PropTypes.string,
};

export default UserHome;