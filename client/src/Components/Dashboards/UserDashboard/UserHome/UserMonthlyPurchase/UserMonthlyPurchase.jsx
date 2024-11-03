import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserMonthlyPurchase = ({ TotalData }) => {
  // Check if TotalData has a value for November 2024, otherwise default to 0 or any other value you prefer
  const novemberData = TotalData ? TotalData["November 2024"] : 0;

  const data = {
    labels: ["Nov"], // Only November
    datasets: [
      {
        label: "Purchase",
        data: [novemberData],
        backgroundColor: ["#FFA500"], // Single color for November
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Monthly Purchase Totals - November",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5000,
      },
    },
  };

  const containerStyle = {
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyle}>
      <div style={{ height: "500px", width: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default UserMonthlyPurchase;
