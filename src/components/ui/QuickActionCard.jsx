import React from 'react';

const QuickActionCard = ({ title, description, icon, color, action }) => {
  const colorClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600',
    success: 'bg-success-500 hover:bg-success-600',
    warning: 'bg-warning-500 hover:bg-warning-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
  };

  return (
    <button
      onClick={action}
      className={`${colorClasses[color] || colorClasses.primary} text-white rounded-lg p-4 text-left transition-all duration-200 transform hover:scale-105 active:scale-95`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-xs opacity-90 mt-1">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default QuickActionCard; 