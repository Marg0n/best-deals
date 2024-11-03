import React, { useEffect, useState } from "react";
import StatCard from "../../Shared/StatCard";
import ProfileInfo from "../../Shared/ProfileInfo";
import useUserProfile from "../../../../hooks/useUserProfile";
import PropTypes from "prop-types";
import BarChart from "../../Shared/BarChart";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import { FiRefreshCw, FiCreditCard } from "react-icons/fi";
import UserMonthlyPurchase from "./UserMonthlyPurchase/UserMonthlyPurchase";
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
        ?.map((purchase) => purchase?.totalAmount)
        .reduce((sum, amount) => sum + amount, 0);
      setTotalSpending(total);
    }
  }, [profile]);

  // get purchase History
  const userData = profile[0]?.purchaseHistory;

  const transformData = (data) => {
    return data?.map((order) => ({
      orderDate: order.orderDate,
      totalAmount: order.totalAmount,
    }));
  };

  const purchaseHistory = transformData(userData);

  // get monthly total amount
  const getMonthlyTotals = (history) => {
    const totals = {};

    history?.forEach((order) => {
      const date = new Date(order.orderDate);
      const month = date.toLocaleString("default", { month: "long" });
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
      duration: 500,
    });
  }, []);

  return (
    <div className="p-8 min-h-screen space-y-4">
      <Helmet>
        <title>Best Deal | User Dashboard</title>
      </Helmet>

      {/* stat section */}

      <div>
        <div className="grid grid-cols-2 gap-4 font-rajdhani">
          {/* Total Times Buy Card */}
          <div className="flex justify-between items-center px-8 py-8 bg-white shadow-md rounded-lg transition-colors duration-300 hover:bg-yellow-50 cursor-pointer">
            <div>
              <h3 className="text-[18px] text-gray-500 font-semibold">
                Total Times Buy
              </h3>
              <p className="text-[26px] text-gray-600 font-bold">
                {profile[0]?.purchaseHistory?.length || 0}
              </p>
            </div>
            <div className="text-yellow-500">
              <FiRefreshCw size={28} />
            </div>
          </div>

          {/* Total Spendings Card */}
          <div className="flex justify-between items-center px-8 py-8 bg-white shadow-md rounded-lg transition-colors duration-300 hover:bg-red-50 cursor-pointer">
            <div>
              <h3 className="text-[18px] font-semibold text-gray-500">
                Total Spendings
              </h3>
              <p className="text-[26px] text-gray-600 font-bold">
                {totalSpending?.toFixed(2) || 0}$
              </p>
            </div>
            <div className="text-red-500">
              <FiCreditCard size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* <div
        className="flex gap-2 items-center justify-center"
        data-aos="fade-up"
      >
        <StatCard
          title={"Total Times Buy"}
          value={profile[0]?.purchaseHistory?.length || 0}
          // percentage={25}
          // increase={true}
          // description={'more'}
        />
        <StatCard
          title={"Total Spendings"}
          value={totalSpending?.toFixed(2) || 0}
          // percentage={25}
          // increase={true}
          // description={'more'}
        />
      </div> */}

      {/* Chart section */}
      <div
        className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-base-300"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <h1 className="font-semibold my-4">Monthly Purchase Totals</h1>
        <BarChart data={monthlyTotals} />
      </div>
      {/* <div>
        <UserMonthlyPurchase TotalData={monthlyTotals} />
      </div> */}

      {/* profile info */}
      <ProfileInfo />

      {/* Account settings */}
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
