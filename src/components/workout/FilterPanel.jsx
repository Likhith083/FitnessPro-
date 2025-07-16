import React from 'react';
import { X, Filter } from 'lucide-react';

const FilterPanel = ({ filters, setFilters, onClear, muscleGroups, equipmentTypes, difficultyLevels }) => {
  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const hasActiveFilters = () => {
    return filters.muscleGroups.length > 0 || 
           filters.equipment.length > 0 || 
           filters.difficulty.length > 0 ||
           filters.searchTerm !== '';
  };

  return (
    <div className="card p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-primary-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        </div>
        {hasActiveFilters() && (
          <button
            onClick={onClear}
            className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
          >
            <X size={16} /> Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Muscle Groups */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Muscle Groups</h4>
          <div className="space-y-2">
            {muscleGroups.map(group => (
              <label key={group} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.muscleGroups.includes(group)}
                  onChange={() => handleFilterChange('muscleGroups', group)}
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {group}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Equipment</h4>
          <div className="space-y-2">
            {equipmentTypes.map(equipment => (
              <label key={equipment} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.equipment.includes(equipment)}
                  onChange={() => handleFilterChange('equipment', equipment)}
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {equipment}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Difficulty</h4>
          <div className="space-y-2">
            {difficultyLevels.map(difficulty => (
              <label key={difficulty} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.difficulty.includes(difficulty)}
                  onChange={() => handleFilterChange('difficulty', difficulty)}
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {difficulty}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.muscleGroups.map(group => (
              <span key={group} className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-xs px-2 py-1 rounded-full">
                {group}
              </span>
            ))}
            {filters.equipment.map(equipment => (
              <span key={equipment} className="bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200 text-xs px-2 py-1 rounded-full capitalize">
                {equipment}
              </span>
            ))}
            {filters.difficulty.map(difficulty => (
              <span key={difficulty} className="bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200 text-xs px-2 py-1 rounded-full capitalize">
                {difficulty}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel; 