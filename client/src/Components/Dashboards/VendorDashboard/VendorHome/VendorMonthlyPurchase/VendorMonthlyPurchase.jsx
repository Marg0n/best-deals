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
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VendorMonthlyPurchase = ({ data }) => {

  // উদাহরণ ডেটা তৈরি করা
  const exampleData = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  // যদি ডেটা প্রপস না পাওয়া যায়, তাহলে উদাহরণ ডেটা ব্যবহার করা হবে
  const purchaseData = data || exampleData;

  const labels = Object.keys(purchaseData);
  const values = Object.values(purchaseData);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Amount Bought",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(201, 203, 207, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(201, 203, 207, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // নিশ্চিত করে যে প্রস্থ এবং উচ্চতা অটোমেটিক্যালি মানানসই হবে
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
        },
      },
      title: {
        display: true,
        text: "Monthly Purchase Totals",
        font: {
          size: 16,
          weight: "bold",
        },
        color: "#4B5563",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg h-[350px] lg:h-[500px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

VendorMonthlyPurchase.propTypes = {
  data: PropTypes.object, // PropTypes.Object should be PropTypes.object
};

export default VendorMonthlyPurchase;
