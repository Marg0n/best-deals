import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useUserProfile from '../../../../../hooks/useUserProfile';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';

const VendorGraph = () => {
    const vendorMail = useUserProfile();
    const vendorProducts = useAxiosSecure();

    // State to hold the graph data
    const [graphData, setGraphData] = useState([]);

    // Fetch all orders
    const { data: allOrders = [] } = useQuery({
        queryKey: ["allOrders"],
        queryFn: async () => {
            const res = await vendorProducts.get('/all-orders');
            return res.data; // Ensure you handle the data correctly here
        },
    });

    // Fetch user expenses
    const { data: userExpenses = {} } = useQuery({
        queryKey: ["userExpenses", vendorMail.profile[0]?.email],
        queryFn: async () => {
            const res = await vendorProducts.get(`/userCollection/expense?email=${vendorMail.profile[0]?.email}`);
            return res.data.expense; 
        },
    });

    // Prepare the graph data when orders and expenses are fetched
    useEffect(() => {
        const expenses = userExpenses || {};

        // Create monthly data
        const monthlyData = Array.from({ length: 12 }, (_, i) => {
            const month = new Date(0, i).toLocaleString('default', { month: 'long' }); // Use 'long' for full month name
            const monthlyExpenses = expenses[month] || 0; // Fetch the expense for the month

            return {
                month,
                earnings: 100, 
                expenses: monthlyExpenses,
            };
        });

        setGraphData(monthlyData);
    }, [userExpenses, vendorMail]);

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Expense Graph</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
                    <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VendorGraph;
