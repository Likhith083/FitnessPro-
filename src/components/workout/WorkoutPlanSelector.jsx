import React from 'react';
import { Target, Clock, TrendingUp, Play } from 'lucide-react';

const WorkoutPlanSelector = ({ plans, onSelectPlan }) => {
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

  const getTotalExercises = (plan) => {
    return plan.workouts.reduce((total, workout) => total + workout.exercises.length, 0);
  };

  const getTotalWorkouts = (plan) => {
    return plan.workouts.length;
  };

  return (
    <div className="space-y-4">
      {plans.map(plan => (
        <div key={plan.id} className="workout-plan-card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {plan.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{plan.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target size={16} className="text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{getTotalWorkouts(plan)} workouts</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={16} className="text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{getTotalExercises(plan)} exercises</span>
                </div>
              </div>
            </div>
            
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(plan.difficulty)}`}>
              {plan.difficulty}
            </span>
          </div>

          <div className="space-y-3 mb-4">
            {plan.workouts.map((workout, index) => (
              <div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                  {workout.name}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {workout.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="text-gray-600 dark:text-gray-400">
                      • {exercise.sets} sets × {exercise.reps} reps
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onSelectPlan(plan)}
            className="w-full btn-success flex items-center justify-center gap-2"
          >
            <Play size={16} /> Start Plan
          </button>
        </div>
      ))}
    </div>
  );
};

export default WorkoutPlanSelector; 