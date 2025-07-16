import React, { useState } from 'react';
import { Search, ChevronRight, Dumbbell, Target } from 'lucide-react';

const ExerciseList = ({ exercises, onSelectExercise, selectedId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredExercises = exercises.filter(ex => 
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.muscleGroups.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getEquipmentIcon = (equipment) => {
    switch (equipment) {
      case 'dumbbells':
        return <Dumbbell size={16} />;
      case 'barbell':
        return <Target size={16} />;
      case 'machine':
        return <Target size={16} />;
      case 'bodyweight':
        return <Target size={16} />;
      default:
        return <Target size={16} />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="card p-4 flex flex-col h-[600px]">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input 
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-3 pl-10 pr-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Exercise List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredExercises.length > 0 ? (
          filteredExercises.map(exercise => (
            <button 
              key={exercise.id}
              onClick={() => onSelectExercise(exercise)}
              className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                selectedId === exercise.id 
                  ? 'bg-primary-500/20 border border-primary-300 dark:border-primary-600' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700 border border-transparent'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-primary-500/20 text-primary-600 dark:text-primary-400">
                    {getEquipmentIcon(exercise.equipment)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {exercise.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {exercise.muscleGroups.join(', ')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {exercise.equipment}
                  </span>
                </div>
              </div>
              
              <ChevronRight 
                size={20} 
                className={`text-gray-400 group-hover:text-primary-500 transition-colors ${
                  selectedId === exercise.id ? 'text-primary-500' : ''
                }`} 
              />
            </button>
          ))
        ) : (
          <div className="text-center py-8">
            <Target size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'No exercises found matching your search.' : 'No exercises available.'}
            </p>
          </div>
        )}
      </div>

      {/* Results Count */}
      {filteredExercises.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Showing {filteredExercises.length} of {exercises.length} exercises
          </p>
        </div>
      )}
    </div>
  );
};

export default ExerciseList; 