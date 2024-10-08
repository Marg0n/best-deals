import React from 'react';
import StatCard from '../../Shared/StatCard';
import ProfileInfo from '../../Shared/ProfileInfo';
import useUserProfile from '../../../../hooks/useUserProfile';

const UserHome = () => {

    const { profile } = useUserProfile();
    console.log('billing',profile[0]?.billingAddress)
    console.log('buy',profile[0]?.purchaseHistory)

    return (
        <div className="p-8 bg-gray-50 min-h-screen space-y-4">
        {/* stat section */}
        <StatCard/>

        {/* profile info */}
        <ProfileInfo/>

        {/* Account settings */}

        {/* Chart section */}
            
        </div>
    );
};

export default UserHome;