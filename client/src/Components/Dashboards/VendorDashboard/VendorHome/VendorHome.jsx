import { useQuery } from '@tanstack/react-query';
import AOS from 'aos';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useUserProfile from '../../../../hooks/useUserProfile';
import BarChart from '../../Shared/BarChart';
import ProfileInfo from '../../Shared/ProfileInfo';
import StatCard from '../../Shared/StatCard';
import VendorProducts from '../VendorProducts/VendorProducts';
import VendorGraph from './VendorGraph/VendorGraph';
import PropTypes from 'prop-types';

const VendorHome = () => {


  const { user } = useAuth()
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

  const allVendorProducts = products?.filter(product => product?.vendorEmail === user?.email);


  let total = allVendorOrders?.reduce((previousValue, currentValue) => {
    return (previousValue + (currentValue.itemsCount * currentValue.totalAmount));
  }, 0);

  const stats = {
    totalProducts: allVendorProducts.length,
    totalOrders: allVendorOrders.length,
    totalEarnings: Math.round(total) || 0,
  };

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

  return (
    <div className="p-8 min-h-screen space-y-4">
      {/* helmet */}
      <Helmet>
        <title>Best Deal | Vendor Dashboard</title>
      </Helmet>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 place-items-center mx-auto">

      </div>
      {/* stat section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center justify-center' data-aos="fade-up">
        <StatCard title="Total Products" value={stats.totalProducts} />
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Total Earnings" value={stats.totalEarnings} />
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

      {/* Revenue Graph */}
      <VendorGraph />

      <VendorProducts />
    </div>
  );
};

VendorHome.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  // percentage: PropTypes.number,
  // increase: PropTypes.bool,
  // description: PropTypes.string,
};

export default VendorHome;