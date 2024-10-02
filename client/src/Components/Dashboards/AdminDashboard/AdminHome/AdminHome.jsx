import React from 'react';
import StatCard from './StatCard';
import OverviewChart from './OverviewChart';

const AdminHome = () => {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Transaction"
                    value="$50,213.54"
                    percentage={25.2}
                    increase={true}
                    description="$43,722.22"
                />
                <StatCard
                    title="Revenue"
                    value="$12,233.21"
                    percentage={-14.3}
                    increase={false}
                    description="$15,312.22"
                />
                <StatCard
                    title="Users"
                    value="630"
                    percentage={-20}
                    increase={false}
                    description="750"
                />
                <StatCard
                    title="Vendors"
                    value="25"
                    percentage={15}
                    increase={true}
                    description="18"
                />
            </div>

            {/* Overview Section */}
            <OverviewChart />
        </div>
    );
};

export default AdminHome;