import React from 'react';
import DashboardCard from '../components/dashboard/DashboardCard';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Recommendations', value: 120, color: 'bg-primary' },
    { title: 'Health Tips', value: 85, color: 'bg-secondary' },
    { title: 'Courses', value: 45, color: 'bg-green-600' },
    { title: 'Social Posts', value: 300, color: 'bg-blue-600' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} title={stat.title} value={stat.value} color={stat.color} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;