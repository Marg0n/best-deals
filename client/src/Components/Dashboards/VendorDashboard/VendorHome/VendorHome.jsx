import React from 'react';
import VendorStats from './VendorStats/VendorStats';
import VendorGraph from './VendorGraph/VendorGraph';
import VendorProducts from '../VendorProducts/VendorProducts';
import useUserProfile from '../../../../hooks/useUserProfile';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const VendorHome = () => {

  const vendorMail = useUserProfile();
    const vendorProducts = useAxiosSecure();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await vendorProducts.get('/all-products');
            return res.data; // Ensure you handle the data correctly here
        },
    });

    const { data: allOrders = [] } = useQuery({
        queryKey: ["allOrders"],
        queryFn: async () => {
            const res = await vendorProducts.get('/all-orders');
            console.log(res.data);
            return res.data; // Ensure you handle the data correctly here
        },
    });

    const allVendorOrders = allOrders?.filter(product => product?.vendorEmail === vendorMail.profile[0]?.email) || [];

    const allVendorProducts = products?.filter(product => product?.email === vendorMail.profile[0]?.email) || [];

    
    let total = allVendorOrders?.reduce((previousValue, currentValue) => {
      return (previousValue + (currentValue.itemsCount * currentValue.totalAmount));
    }, 0);
  
  const stats = {
    totalProducts: allVendorProducts.length,
    totalOrders: allVendorOrders.length,
    totalEarnings: Math.round(total),
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