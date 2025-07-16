import React from 'react';
import { Clock, Dumbbell, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/storage';

const RecentWorkoutCard = ({ workout }) => {
  const totalExercises = workout.exercises?.length || 0;
  const totalVolume = workout.exercises?.reduce((sum, exercise) => {
    return sum + (exercise.sets * exercise.reps * (exercise.weight || 1));
  }, 0) || 0;

  return (
    <div className="card p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {workout.name || 'Workout'}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(workout.completedAt)}
          </p>
        </div>
        <div className="flex items-center gap-1 text-success-500">
          <Dumbbell size={16} />
          <span className="text-sm font-medium">{totalExercises}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Volume</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {totalVolume.toLocaleString()} lbs
          </span>
        </div>
        
        {workout.duration && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Duration</span>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span className="font-medium text-gray-900 dark:text-white">
                {workout.duration} min
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentWorkoutCard; 