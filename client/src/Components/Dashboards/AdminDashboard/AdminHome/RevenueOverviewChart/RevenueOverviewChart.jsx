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

const RevenueOverviewChart = ({ TotalRevenue, TotalTransaction }) => {
  // Assuming TotalRevenue and TotalTransaction are single values for the total revenue and total transaction
  const monthlyRevenue = TotalRevenue / 12; // Average monthly revenue
  const monthlyExpense = TotalTransaction / 12; // Average monthly expense

  // Prepare the data for the chart
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: Array(12).fill(monthlyRevenue), // Fill with average revenue
        backgroundColor: "orange",
        type: "bar",
        barThickness: 12, // Slightly thicker bars
        yAxisID: "y",
      },
      {
        label: "Expense",
        data: Array(12).fill(monthlyExpense), // Fill with average expense
        borderColor: "blue",
        backgroundColor: "blue",
        borderWidth: 3, // Slightly thicker line
        type: "line",
        yAxisID: "y",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Revenue Overview",
        font: {
          size: 16, // Set font size to 16px
        },
      },
      subtitle: {
        display: true,
        text: "Avg. Yearly Profit",
        padding: { top: 5, bottom: 15 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        position: "left",
        ticks: {
          callback: (value) => value, // Show numbers without %
        },
      },
    },
  };

  return (
    <div
      style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}
      className="rounded-md shadow-md font-rajdhani"
    >
      <Bar data={data} options={options} height={205} />
    </div>
  );
};

export default RevenueOverviewChart;
