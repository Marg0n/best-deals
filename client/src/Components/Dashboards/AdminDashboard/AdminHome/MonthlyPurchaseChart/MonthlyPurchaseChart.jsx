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

const MonthlyPurchaseChart = ({ data }) => {

  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    // labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    labels: labels,
    datasets: [
      {
        label: "Total Amount Bought",
        data: values,
        // data: [60, 55, 80, 75, 50, 50, 40], // Example data, replace with your actual data
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
        max: 90,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <Bar data={chartData} options={options} width={600} height={400} />
    </div>
  );
};

MonthlyPurchaseChart.propTypes = {
  data: PropTypes.Object
}

export default MonthlyPurchaseChart;
