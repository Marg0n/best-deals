import React from 'react';
import VendorStats from './VendorStats/VendorStats';
import VendorGraph from './VendorGraph/VendorGraph';
import VendorProducts from '../VendorProducts/VendorProducts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';

const VendorHome = () => {


  const {user} = useAuth()
  const vendorProducts = useAxiosSecure();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["vendorProductsForVendorDashboard"],
        queryFn: async () => {
            const res = await vendorProducts.get('/allVendorProducts');
            return res.data; // Ensure you handle the data correctly here
        },
    });

    const { data: allOrders = [] } = useQuery({
        queryKey: ["allOrdersForHome"],
        queryFn: async () => {
            const res = await vendorProducts.get('/all-orders');
            console.log(res.data);
            return res.data; // Ensure you handle the data correctly here
        },
    });

    const allVendorOrders = allOrders?.filter(product => product?.vendorEmail === user?.email);

    const allVendorProducts = products?.filter(product => product?.email === user?.email);

    
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
                <VendorStats title="Total Products" value={stats.totalProducts} />
                <VendorStats title="Total Orders" value={stats.totalOrders} />
                <VendorStats title="Total Earnings" value={stats.totalEarnings} />
            </div>

            {/* Revenue Graph */}
            <VendorGraph />

            <VendorProducts/>
        </div>
    );
};

export default VendorHome;