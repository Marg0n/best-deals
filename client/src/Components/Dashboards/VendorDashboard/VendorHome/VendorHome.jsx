import React from 'react';
import VendorStats from './VendorStats/VendorStats';
import VendorGraph from './VendorGraph/VendorGraph';
import VendorProducts from '../VendorProducts/VendorProducts';

const VendorHome = () => {

    //testing data for stats
  const stats = {
    totalProducts: 50,
    totalOrders: 45580,
    totalEarnings: 51580,
  };

    return (
        <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 place-items-center mx-auto">
                <VendorStats title="Total Products" value={stats.totalProducts} percentage={5.9} />
                <VendorStats title="Total Orders" value={stats.totalOrders} percentage={10.9} />
                <VendorStats title="Total Earnings" value={stats.totalEarnings} percentage={5.9} />
            </div>

            {/* Revenue Graph */}
            <VendorGraph />

            {/* Best Selling Products */}
            <VendorProducts/>
        </div>
    );
};

export default VendorHome;