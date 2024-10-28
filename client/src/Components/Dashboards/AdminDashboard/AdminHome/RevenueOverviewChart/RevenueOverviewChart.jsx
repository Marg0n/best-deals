import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueOverviewChart = () => {
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
        data: [30, 40, 25, 45, 35, 50, 60, 55, 45, 50, 65, 70],
        backgroundColor: "orange",
        type: "bar",
        barThickness: 12, // Slightly thicker bars
        yAxisID: "y",
      },
      {
        label: "Expense",
        data: [20, 30, 25, 35, 30, 40, 45, 40, 35, 38, 50, 55],
        borderColor: "blue",
        backgroundColor: "blue",
        pointBackgroundColor: "blue",
        pointBorderColor: "#fff",
        borderWidth: 3, // Slightly thicker line
        pointRadius: 4, // Slightly larger points
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
          size: 16, // Set font size to 20px
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
      y1: {
        display: false, // Hide right-side y-axis
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
