import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Play, Pause, SkipForward, RotateCcw, 
  ChevronRight, ChevronLeft, Plus, Minus, Clock, Target
} from 'lucide-react';
import { exercises, workoutPlans, muscleGroups, equipmentTypes, difficultyLevels } from '../../data/exercises';
import { workoutHistory } from '../../utils/storage';
import WorkoutPlayer from '../workout/WorkoutPlayer';
import ExerciseList from '../workout/ExerciseList';
import WorkoutPlanSelector from '../workout/WorkoutPlanSelector';
import FilterPanel from '../workout/FilterPanel';

const WorkoutPage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    muscleGroups: [],
    equipment: [],
    difficulty: [],
    searchTerm: ''
  });
  const [viewMode, setViewMode] = useState('exercises'); // 'exercises' or 'plans'
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectExercise = (exercise) => {
    setIsLoadingVideo(true);
    setSelectedExercise(null); // Clear previous exercise
    // Simulate API call to generate and fetch video
    setTimeout(() => {
      setSelectedExercise(exercise);
      setIsLoadingVideo(false);
    }, 1500);
  };

  const handleStartWorkout = (plan) => {
    setSelectedPlan(plan);
    setViewMode('exercises');
  };

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         exercise.muscleGroups.some(group => group.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    
    const matchesMuscleGroups = filters.muscleGroups.length === 0 || 
                               exercise.muscleGroups.some(group => filters.muscleGroups.includes(group));
    
    const matchesEquipment = filters.equipment.length === 0 || 
                           filters.equipment.includes(exercise.equipment);
    
    const matchesDifficulty = filters.difficulty.length === 0 || 
                            filters.difficulty.includes(exercise.difficulty);

    return matchesSearch && matchesMuscleGroups && matchesEquipment && matchesDifficulty;
  });

  const clearFilters = () => {
    setFilters({
      muscleGroups: [],
      equipment: [],
      difficulty: [],
      searchTerm: ''
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-success-500 mb-2">Workout</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose your exercises and start training
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('exercises')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'exercises'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Exercises
            </button>
            <button
              onClick={() => setViewMode('plans')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'plans'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Workout Plans
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <FilterPanel 
          filters={filters}
          setFilters={setFilters}
          onClear={clearFilters}
          muscleGroups={muscleGroups}
          equipmentTypes={equipmentTypes}
          difficultyLevels={difficultyLevels}
        />
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Workout Player */}
        <div className="lg:col-span-2">
          <WorkoutPlayer 
            exercise={selectedExercise} 
            isLoading={isLoadingVideo}
            selectedPlan={selectedPlan}
          />
        </div>

        {/* Exercise Library / Workout Plans */}
        <div className="space-y-4">
          {viewMode === 'exercises' ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Exercise Library
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredExercises.length} exercises
                </div>
              </div>
              <ExerciseList 
                exercises={filteredExercises}
                onSelectExercise={handleSelectExercise}
                selectedId={selectedExercise?.id}
              />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Workout Plans
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {workoutPlans.length} plans
                </div>
              </div>
              <WorkoutPlanSelector 
                plans={workoutPlans}
                onSelectPlan={handleStartWorkout}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPage; 