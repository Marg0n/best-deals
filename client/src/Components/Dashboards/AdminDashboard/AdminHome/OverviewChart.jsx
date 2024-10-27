import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const OverviewChart = () => {
    const data = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
            {
                label: 'Revenue',
                data: [90, 80, 100, 95, 80, 120, 40, 50, 80, 70, 100, 85],
                backgroundColor: '#34D399',
                barPercentage: 0.5,
                borderRadius: 5,
            },
            {
                label: 'Expense',
                data: [50, 60, 70, 80, 100, 120, 90, 40, 100, 60, 110, 95],
                backgroundColor: '#F87171',
                barPercentage: 0.5,
                borderRadius: 5,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: true,
                    borderDash: [10, 5],
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 50,
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 12,
                    padding: 20,
                },
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-bold">Revenue Overview</h2>
                    <p className="text-gray-400">Avg. Yearly Profit</p>
                </div>
            </div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default OverviewChart;
