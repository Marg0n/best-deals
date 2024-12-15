import React from 'react';
import { Bar } from 'react-chartjs-2'

const BarChart = ({ data }) => {

    const labels = Object.keys(data);
    const values = Object.values(data);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Amount Bought',
                data: values,
                backgroundColor: ['rgba(75, 192, 192, 0.6)','pink'],
                borderColor: ['pink','rgba(75, 192, 192, 1)'],
                borderWidth: 2,
            },
        ],
    };

    return (
        <Bar
            data={chartData}
        />
    );
};

export default BarChart;