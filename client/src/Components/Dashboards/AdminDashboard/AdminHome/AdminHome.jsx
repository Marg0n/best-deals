import React, { useState, useEffect } from "react";
import StatCard from "../../Shared/StatCard";
import OverviewChart from "./OverviewChart";
import useAxiosSecure from "../../../../hooks/useAxiosSecure"; // Assuming this is your Axios hook
import { Typography } from "@mui/material";
import useUserProfile from "../../../../hooks/useUserProfile";
import AOS from "aos";
import ProfileInfo from "../../Shared/ProfileInfo";
import BarChart from "../../Shared/BarChart";
import PropTypes from "prop-types";
import {
  MdOutlineAccessTime,
  MdTrendingUp,
  MdTrendingDown,
} from "react-icons/md";
import {
  FaMoneyBillWave,
  FaUsers,
  FaStore,
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaUser,
} from "react-icons/fa";
import ProjectStatusChart from "./ProjectStatusChart/ProjectStatusChart";
import MonthlyPurchaseChart from "./MonthlyPurchaseChart/MonthlyPurchaseChart";
import RevenueOverviewChart from "./RevenueOverviewChart/RevenueOverviewChart";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const [totalUsers, setTotalUsers] = useState(null);
  const [totalVendors, setTotalVendors] = useState(null);
  const [totalTransactions, setTotalTransactions] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users and vendors count
        const usersResponse = await axiosSecure.get("/totalUsers");
        const vendorsResponse = await axiosSecure.get("/totalVendors");

        // Fetch total transactions and total revenue (totalAmount)
        const transactionsResponse = await axiosSecure.get(
          "/totalTransactionss"
        );

        // Set state for each data fetched
        setTotalUsers(usersResponse.data.totalUsers);
        setTotalVendors(vendorsResponse.data.totalVendors);
        setTotalTransactions(transactionsResponse.data.totalTransactions);
        setTotalRevenue(transactionsResponse.data.totalAmount);
        setIsLoading(false); // Stop loading after fetching data
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  console.log(totalUsers, totalVendors, totalTransactions);

  //revenue calculation
  const rvenue = totalRevenue * 0.1 || 0;

  // profile info
  const { profile } = useUserProfile();

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

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  const stats = [
    {
      id: 1,
      icon: <FaChartLine />,
      value: `${totalRevenue?.toFixed(2) || "0.00"}   $`,
      label: "Total Transactions",
      hoverColor: "hover:bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      icon: <FaDollarSign />,
      value: `${rvenue?.toFixed(2)} $`,
      label: "Revenue",
      hoverColor: "hover:bg-green-100",
      iconColor: "text-green-500",
    },
    {
      id: 3,
      icon: <FaUsers />,
      value: `${totalUsers || "0"}`,
      label: "Users",
      hoverColor: "hover:bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      id: 4,
      icon: <FaStore />,
      value: `${totalVendors || "0"}`,
      label: "Vendors",
      hoverColor: "hover:bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      id: 5,
      icon: <FaShoppingCart />,
      value: `${profile[0]?.purchaseHistory?.length || 0}`,
      label: "Total Times Buy",
      hoverColor: "hover:bg-red-100",
      iconColor: "text-red-500",
    },
    {
      id: 6,
      icon: <FaMoneyBillWave />,
      value: `${totalSpending || 0} $`,
      label: "Total Spendings",
      hoverColor: "hover:bg-teal-100",
      iconColor: "text-teal-500",
    },
  ];

  const salesData = [
    {
      country: "United States",
      amount: "$8,567k",
      change: "25.8%",
      flag: "/united-states.png",
      increase: true,
    },
    {
      country: "Brazil",
      amount: "$2,415k",
      change: "6.2%",
      flag: "/brazil-flag.png",
      increase: false,
    },
    {
      country: "India",
      amount: "$865k",
      change: "12.4%",
      flag: "/india.png",
      increase: true,
    },
    {
      country: "Australia",
      amount: "$745k",
      change: "11.9%",
      flag: "/australia.png",
      increase: false,
    },
    {
      country: "France",
      amount: "$45k",
      change: "16.2%",
      flag: "/france.png",
      increase: true,
    },
    {
      country: "China",
      amount: "$12k",
      change: "14.8%",
      flag: "/china.png",
      increase: true,
    },
  ];

  const DeliveryData = [
    {
      icon: <FaBox className="text-purple-500" size={24} />,
      label: "Packages in transit",
      value: "10k",
      trend: <MdTrendingUp className="text-green-500" />,
      trendValue: "25.8%",
      trendColor: "text-green-500",
    },
    {
      icon: <FaTruck className="text-blue-500" size={24} />,
      label: "Packages out for delivery",
      value: "5k",
      trend: <MdTrendingUp className="text-green-500" />,
      trendValue: "4.3%",
      trendColor: "text-green-500",
    },
    {
      icon: <FaCheckCircle className="text-green-500" size={24} />,
      label: "Packages delivered",
      value: "15k",
      trend: <MdTrendingDown className="text-red-500" />,
      trendValue: "12.5%",
      trendColor: "text-red-500",
    },
    {
      icon: <FaCheckCircle className="text-yellow-500" size={24} />,
      label: "Delivery success rate",
      value: "95%",
      trend: <MdTrendingUp className="text-green-500" />,
      trendValue: "35.6%",
      trendColor: "text-green-500",
    },
    {
      icon: <MdOutlineAccessTime className="text-gray-400" size={24} />,
      label: "Average delivery time",
      value: "2.5 Days",
      trend: <MdTrendingDown className="text-red-500" />,
      trendValue: "2.15%",
      trendColor: "text-red-500",
    },
    {
      icon: <FaUser className="text-pink-500" size={24} />,
      label: "Customer satisfaction",
      value: "4.5/5",
      trend: <MdTrendingUp className="text-green-500" />,
      trendValue: "5.7%",
      trendColor: "text-green-500",
    },
  ];

  return (
    <div className="p-8 min-h-screen space-y-4">
      {/* Stats Section */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Transaction"
          value={`$ ${totalRevenue?.toFixed(2) || "0.00"}`}
          // percentage={25.2}
          // increase={true}
          // description={`Total Transactions: ${totalTransactions || '0'}`} // Show total transactions
        />
        <StatCard title="Revenue" value={`$ ${rvenue?.toFixed(2)}`} />
        <StatCard title="Users" value={totalUsers || "0"} />
        <StatCard title="Vendors" value={totalVendors || "0"} count />
        <StatCard
          title={"Total Times Buy"}
          value={profile[0]?.purchaseHistory?.length}
        />
        <StatCard title={"Total Spendings"} value={totalSpending} />
      </div> */}

      <div>
        {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 font-rajdhani">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`flex items-center py-6 px-8 bg-white cursor-pointer shadow rounded transition-colors duration-300 ease-in-out ${stat.hoverColor}`}
            >
              <div className={`mr-4 text-3xl ${stat.iconColor}`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl text-gray-600 font-bold">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-semibold text-base">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* sale by country */}
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="">
            <div className="bg-white shadow-md rounded-md px-6 py-4 max-w-[500px] lg:max-w-full md:ml-4 font-rajdhani ">
              <h3 className="text-[20px] font-semibold">Sales by Countries</h3>
              <p className="text-[15px] text-gray-400 font-semibold">
                Monthly Sales Overview
              </p>
              <ul className="mt-4 space-y-4">
                {salesData.map((data, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        <img src={data.flag} alt="" className="w-[50px]" />
                      </span>
                      <div>
                        <p className="text-gray-600 text-lg font-semibold">
                          {data.amount}
                        </p>
                        <p className="text-base font-semibold text-gray-500">
                          {data.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center font-semibold space-x-1">
                      {data.increase ? (
                        <FaArrowUp className="text-green-500" />
                      ) : (
                        <FaArrowDown className="text-red-500" />
                      )}
                      <span
                        className={`text-base ${
                          data.increase ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {data.change}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* project status chart  */}
          <div>
            <div>
              <ProjectStatusChart />
            </div>
          </div>
          {/* delivery performance  */}
          <div>
            <div className="bg-white p-6 font-rajdhani max-w-[500px] lg:max-w-full rounded-lg shadow-md">
              <h2 className="text-[20px] font-semibold  mb-2">
                Delivery Performance
              </h2>
              <p className="text-gray-400 font-semibold text-base mb-4">
                12% increase in this month
              </p>
              <ul className="space-y-4">
                {DeliveryData.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full bg-gray-100">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-gray-500 text-base  font-semibold">
                          {item.label}
                        </p>
                        <div className="flex items-center text-sm">
                          {item.trend}
                          <span
                            className={`ml-1 text-[16px] font-semibold ${item.trendColor}`}
                          >
                            {item.trendValue}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-400 text-lg font-semibold">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Purchase Totals */}

      <div className="grid grid-cols-1 gap-4 font-rajdhani lg:grid-cols-2 mx-auto md:ml-4">
        <div className="col-span-1">
          <MonthlyPurchaseChart data={monthlyTotals} />
        </div>
        <div className="col-span-1 ">
          <RevenueOverviewChart />
        </div>
      </div>

      {/* profile info */}
      {/* <ProfileInfo /> */}

      {/* Chart section */}
      {/* <div
        className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-base-300"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <h1 className="font-semibold my-4">Monthly Purchase Totals</h1>
        <BarChart data={monthlyTotals} />
      </div> */}

      {/* Overview Section */}
      {/* <div
        className="text-base-300"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <OverviewChart />
      </div> */}
    </div>
  );
};

AdminHome.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  // percentage: PropTypes.number,
  // increase: PropTypes.bool,
  // description: PropTypes.string,
};

export default AdminHome;
