import React from 'react';
import VendorStats from './VendorStats/VendorStats';
import VendorGraph from './VendorGraph/VendorGraph';
import VendorBestSelling from './VendorBestSelling/VendorBestSelling';

const VendorHome = () => {

    //testing data for stats
  const stats = {
    totalUsers: 11580,
    totalOrders: 45580,
    totalEarnings: 51580,
  };

  //testing data best selling products
  const testProduct = [
    { id: 1, product: "DJI Mavic Pro 2", category: "Tech gadget", brand: "Apple", price: "$990.00", stock: 20, rating: 4.8 },
    { id: 2, product: "iPad Pro 2017", category: "Tech gadget", brand: "LG", price: "$230.00", stock: 20, rating: 4.8 }
  ]

    return (
        <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 place-items-center">
                <VendorStats title="Total Users" value={stats.totalUsers} percentage={5.9} />
                <VendorStats title="Total Orders" value={stats.totalOrders} percentage={10.9} />
                <VendorStats title="Total Earnings" value={stats.totalEarnings} percentage={5.9} />
            </div>

            {/* Revenue Graph */}
            <VendorGraph />

            {/* Best Selling Products */}
            <VendorBestSelling testProduct={testProduct} />
        </div>
    );
};

export default VendorHome;