import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { FaDollarSign } from "react-icons/fa";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

const ProjectStatusChart = () => {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [5, 15, 10, 20, 10, 30],
        borderColor: "#FF9F43",
        backgroundColor: "rgba(255, 159, 67, 0.1)", // Gradient effect
        fill: true,
        tension: 0.4, // Smooth curves
        pointRadius: 0, // No points on the line
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 md:w-[510px] md:h-[492px] font-rajdhani">
      <h3 className="text-[20px] font-semibold">Project Status</h3>
      <div className="flex items-center mt-4">
        <div className="flex items-center space-x-2">
          <div className="bg-orange-100 p-3 rounded-full">
            <FaDollarSign className="text-orange-500" size={20} />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-600">$4,3742</p>
            <p className="text-[15px] font-semibold text-gray-500">
              Your Earnings
            </p>
          </div>
        </div>
        <p className="ml-auto text-green-500 font-semibold text-lg">+10.2%</p>
      </div>

      <div className="my-4 md:h-[270px]">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-base font-semibold text-gray-600">Donates</p>
          <div className="flex items-center space-x-1">
            <p className="text-base font-semibold text-gray-500">$756.26</p>
            <p className="text-base text-red-500 font-semibold">-139.34</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-base font-semibold text-gray-600">Podcasts</p>
          <div className="flex items-center space-x-1">
            <p className="text-base font-semibold text-gray-500">$2,207.03</p>
            <p className="text-base font-semibold text-green-500">+576.24</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusChart;
