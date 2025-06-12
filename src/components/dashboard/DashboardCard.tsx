import React from 'react';

interface DashboardCardProps {
  title: string;
  value: number;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, color }) => {
  return (
    <div className={`p-6 rounded-lg shadow ${color} text-white`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default DashboardCard;