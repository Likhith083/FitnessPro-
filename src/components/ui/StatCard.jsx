import React from 'react';

const StatCard = ({ icon, title, value, unit, color }) => {
  const colorClasses = {
    primary: 'from-primary-500 to-blue-500',
    success: 'from-success-500 to-teal-500',
    warning: 'from-warning-500 to-orange-500',
    purple: 'from-purple-500 to-indigo-500',
  };

  return (
    <div className="card card-hover p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {value} <span className="text-lg font-normal text-gray-500 dark:text-gray-400">{unit}</span>
          </p>
        </div>
        <div className={`p-3 rounded-full bg-gradient-to-br ${colorClasses[color] || colorClasses.primary}`}>
          {React.cloneElement(icon, { size: 24, className: 'text-white' })}
        </div>
      </div>
    </div>
  );
};

export default StatCard; 