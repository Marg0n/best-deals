import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import useUserProfile from '../../../../../hooks/useUserProfile';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';

const VendorExpenseGraph = () => {
    const vendorMail = useUserProfile();
    const vendorProducts = useAxiosSecure();
    const [graphData, setGraphData] = useState({
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        datasets: [
            {
                label: "Expenses",
                data: Array(12).fill(0), // Initial empty data for each month
                backgroundColor: "rgba(88, 85, 255, 0.8)",
            }
        ]
    });

    // Fetch user expenses
    const { data: userExpenses = {} } = useQuery({
        queryKey: ["userExpenses", vendorMail.profile[0]?.email],
        queryFn: async () => {
            const res = await vendorProducts.get(`/userCollection/expense?email=${vendorMail.profile[0]?.email}`);
            return res.data.expense; // Adjust based on your API response structure
        },
    });

    useEffect(() => {
        // Map the fetched expense data to the correct months
        const monthlyExpenses = Array.from({ length: 12 }, (_, i) => {
            const month = new Date(0, i).toLocaleString('default', { month: 'long' });
            return userExpenses[month] || 0; // Default to 0 if no expense for the month
        });

        setGraphData(prevData => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: monthlyExpenses
                }
            ]
        }));
    }, [userExpenses]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
                grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                },
            },
            x: {
                grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                },
            },
        },
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-lg h-[350px] lg:h-[500px]">
            <Bar data={graphData} options={options} />
        </div>
    );
};

export default VendorExpenseGraph;
