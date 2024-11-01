import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const VendorExpenseGraph = () => {
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
        label: "Primary Expenses",
        data: [10, 20, 30, 15, 40, 50, 30, 25, 70, 55, 90, 60],
        backgroundColor: "rgba(88, 85, 255, 0.8)",
      },
      {
        label: "Secondary Expenses",
        data: [5, 10, 15, 10, 20, 25, 20, 15, 35, 30, 40, 35],
        backgroundColor: "rgba(88, 85, 255, 0.3)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // এই অপশনটি যোগ করা হয়েছে
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Expense Graph",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        stacked: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg h-[350px] lg:h-[500px]">
      {" "}
      {/* কন্টেইনারের উচ্চতা নির্ধারণ করা */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default VendorExpenseGraph;
