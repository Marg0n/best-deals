import React from 'react';

const StatCard = ({ title, value, percentage, increase, description }) => {
  // const percentageClass = increase ? 'text-green-500' : 'text-red-500';
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-gray-500 font-medium">{title}</div>
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-2xl font-bold">{value}</h2>
        {/* <span className={`text-sm font-semibold ${percentageClass}`}>
          {percentage}%
        </span> */}
      </div>
      {/* <p className="text-gray-400 text-sm mt-1">
        <span className={`${percentageClass} font-semibold`}>{description} </span>
        vs last month
      </p> */}
    </div>
  );
};

export default StatCard;
