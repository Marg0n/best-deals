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

  const { user } = useAuth();
  const vendorProducts = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["vendorProductsForVendorDashboard"],
    queryFn: async () => {
      const res = await vendorProducts.get('/allVendorProducts');
      return res.data;
    },
  });

  const { data: allOrders = [] } = useQuery({
    queryKey: ["allOrdersForHome"],
    queryFn: async () => {
      const res = await vendorProducts.get('/all-orders');
      return res.data;
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

  const { profile } = useUserProfile();
  const [totalSpending, setTotalSpending] = useState();

  useEffect(() => {
    if (profile && profile[0]?.purchaseHistory) {
      const total = profile[0]?.purchaseHistory
        ?.map(purchase => purchase?.totalAmount)
        .reduce((sum, amount) => sum + amount, 0);
      setTotalSpending(total);
    }
  }, [profile]);

  const userData = profile[0]?.purchaseHistory;

  const transformData = (data) => {
    return data?.map(order => ({
      orderDate: order.orderDate,
      totalAmount: order.totalAmount
    }));
  };

  const purchaseHistory = transformData(userData);

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

  // State to manage input for expense and selected month
  const [expense, setExpense] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    console.log(`Expense: ${expense}, Month: ${selectedMonth}`);
    // Here you can add logic to handle the expense submission
    setExpense('');
    setSelectedMonth('');
  };

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <div className="p-8 min-h-screen space-y-4">
      {/* Helmet */}
      <Helmet>
        <title>Best Deal | Vendor Dashboard</title>
      </Helmet>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center justify-center">
        <StatCard title="Total Products" value={stats.totalProducts} />
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Total Earnings" value={stats.totalEarnings} />
        <StatCard title={'Total Times Buy'} value={profile[0]?.purchaseHistory?.length} />
        <StatCard title={'Total Spendings'} value={totalSpending} />
      </div>

      {/* Expense Input Section */}
      <div className="my-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Record Monthly Expense</h2>
        <form onSubmit={handleExpenseSubmit} className="flex flex-col gap-4 max-w-md">
          <input
            type="number"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
            placeholder="Enter Expense Amount"
            className="input input-bordered w-full"
          />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select Month</option>
            {Array.from({ length: 12 }, (_, i) => {
              const month = new Date(0, i).toLocaleString('default', { month: 'long' });
              return (
                <option key={i} value={month}>
                  {month}
                </option>
              );
            })}
          </select>
          <button type="submit" className="btn btn-primary w-full">Submit Expense</button>
        </form>
      </div>

      {/* Profile Info */}
      <ProfileInfo />

      {/* Chart section */}
      <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-base-300" data-aos="fade-up" data-aos-duration="1500">
        <h1 className='font-semibold my-4'>Monthly Purchase Totals</h1>
        <BarChart data={monthlyTotals} />
      </div>

      {/* Revenue Graph */}
      <VendorGraph />

      {/* Vendor Products */}
      <VendorProducts />
    </div>
  );
};

VendorHome.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};

export default VendorHome;
