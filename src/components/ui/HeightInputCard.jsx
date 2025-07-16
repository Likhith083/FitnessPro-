import React from 'react';
import { Plus, Minus } from 'lucide-react';

const HeightInputCard = ({ icon, label, height, setHeight }) => {
  const incrementInches = () => {
    setHeight(h => {
      let newInches = h.inches + 1;
      let newFeet = h.feet;
      if (newInches >= 12) {
        newInches = 0;
        newFeet += 1;
      }
      return { feet: newFeet, inches: newInches };
    });
  };

  const decrementInches = () => {
    setHeight(h => {
      let newInches = h.inches - 1;
      let newFeet = h.feet;
      if (newInches < 0) {
        newInches = 11;
        newFeet = Math.max(0, newFeet - 1);
      }
      if (newFeet === 0 && newInches < 0) return h;
      return { feet: newFeet, inches: newInches };
    });
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary-500/20 text-primary-600 dark:text-primary-400">
            {icon}
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {height.feet}' {height.inches}"
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={decrementInches} 
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Minus size={16} />
          </button>
          <button 
            onClick={incrementInches} 
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeightInputCard; 