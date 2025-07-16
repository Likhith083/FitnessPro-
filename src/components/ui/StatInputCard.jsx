import React from 'react';
import { Plus, Minus } from 'lucide-react';

const StatInputCard = ({ icon, label, value, onIncrement, onDecrement }) => (
  <div className="card p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-primary-500/20 text-primary-600 dark:text-primary-400">
          {icon}
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={onDecrement} 
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <Minus size={16} />
        </button>
        <button 
          onClick={onIncrement} 
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  </div>
);

export default StatInputCard; 