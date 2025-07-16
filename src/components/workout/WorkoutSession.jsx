import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, X, Plus, Minus, Timer, Target, Dumbbell, Video, SkipForward, ChevronLeft, ChevronRight } from 'lucide-react';
import WorkoutTimer from './WorkoutTimer';
import ExerciseVideo from './ExerciseVideo';

const WorkoutSession = ({ 
  exercise, 
  onComplete, 
  onCancel,
  initialStats = null,
  template = null,
  currentExerciseIndex = 0,
  onNextExercise = null,
  onPreviousExercise = null
}) => {
  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStats, setCurrentStats] = useState(
    initialStats || {
      sets: exercise?.defaultSets || 3,
      reps: exercise?.defaultReps || 10,
      weight: exercise?.defaultWeight || 0
    }
  );
  const [notes, setNotes] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  const totalSets = currentStats.sets;
  const isWorkoutComplete = completedSets.length >= totalSets;
  const isTemplateWorkout = template !== null;
  const isLastExercise = isTemplateWorkout && currentExerciseIndex >= template.exercises.length - 1;

  const handleStartSet = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseSet = () => {
    setIsPaused(!isPaused);
  };

  const handleCompleteSet = () => {
    const newSet = {
      setNumber: currentSet,
      reps: currentStats.reps,
      weight: currentStats.weight,
      completedAt: new Date().toISOString(),
      notes: notes
    };

    setCompletedSets(prev => [...prev, newSet]);
    setNotes('');
    
    if (currentSet < totalSets) {
      setCurrentSet(prev => prev + 1);
    }
    
    setIsActive(false);
    setIsPaused(false);
  };

  const handleSkipSet = () => {
    if (currentSet < totalSets) {
      setCurrentSet(prev => prev + 1);
    }
  };

  const handleFinishExercise = () => {
    const exerciseData = {
      exercise: exercise,
      sets: completedSets,
      totalDuration: 0, // Will be calculated from timer
      completedAt: new Date().toISOString(),
      notes: notes
    };

    if (isTemplateWorkout && !isLastExercise) {
      // Move to next exercise in template
      onNextExercise?.(exerciseData);
    } else {
      // Complete the workout (single exercise or last exercise in template)
      onComplete(exerciseData);
    }
  };

  const handleSkipExercise = () => {
    if (isTemplateWorkout && !isLastExercise) {
      onNextExercise?.();
    } else {
      onComplete?.({
        exercise: exercise,
        sets: [],
        totalDuration: 0,
        completedAt: new Date().toISOString(),
        notes: 'Skipped'
      });
    }
  };

  const handleCancelWorkout = () => {
    if (window.confirm('Are you sure you want to cancel this workout? All progress will be lost.')) {
      onCancel();
    }
  };

  const updateStats = (key, value) => {
    setCurrentStats(prev => ({
      ...prev,
      [key]: Math.max(0, value)
    }));
  };

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 max-w-4xl mx-auto">
      {/* Template Progress Header */}
      {isTemplateWorkout && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-200">{template.name}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={onPreviousExercise}
                disabled={currentExerciseIndex === 0}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm text-gray-400">
                Exercise {currentExerciseIndex + 1} of {template.exercises.length}
              </span>
              <button
                onClick={() => onNextExercise?.()}
                disabled={isLastExercise}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          {/* Template Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentExerciseIndex + 1) / template.exercises.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Exercise Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{exercise?.name}</h2>
        <p className="text-gray-400">Set {currentSet} of {totalSets}</p>
        {exercise?.muscleGroups && (
          <p className="text-sm text-gray-500 mt-1">{exercise.muscleGroups.join(', ')}</p>
        )}
      </div>

      {/* Video Section */}
      <div className="mb-6">
        <ExerciseVideo 
          exercise={exercise}
          isVisible={showVideo}
          onToggle={toggleVideo}
        />
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm text-gray-400">{completedSets.length}/{totalSets} sets completed</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSets.length / totalSets) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Set Stats */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Current Set Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <label className="text-sm text-gray-400 mb-2 block">Weight (lbs)</label>
            <div className="flex items-center justify-center gap-2">
              <button 
                onClick={() => updateStats('weight', currentStats.weight - 5)}
                className="p-2 rounded-full bg-gray-600 hover:bg-red-500 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-2xl font-bold w-16">{currentStats.weight}</span>
              <button 
                onClick={() => updateStats('weight', currentStats.weight + 5)}
                className="p-2 rounded-full bg-gray-600 hover:bg-green-500 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <label className="text-sm text-gray-400 mb-2 block">Reps</label>
            <div className="flex items-center justify-center gap-2">
              <button 
                onClick={() => updateStats('reps', currentStats.reps - 1)}
                className="p-2 rounded-full bg-gray-600 hover:bg-red-500 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-2xl font-bold w-16">{currentStats.reps}</span>
              <button 
                onClick={() => updateStats('reps', currentStats.reps + 1)}
                className="p-2 rounded-full bg-gray-600 hover:bg-green-500 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <label className="text-sm text-gray-400 mb-2 block">Sets</label>
            <div className="flex items-center justify-center gap-2">
              <button 
                onClick={() => updateStats('sets', currentStats.sets - 1)}
                className="p-2 rounded-full bg-gray-600 hover:bg-red-500 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-2xl font-bold w-16">{currentStats.sets}</span>
              <button 
                onClick={() => updateStats('sets', currentStats.sets + 1)}
                className="p-2 rounded-full bg-gray-600 hover:bg-green-500 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="mb-6">
        <WorkoutTimer
          isActive={isActive}
          onStart={handleStartSet}
          onPause={handlePauseSet}
          onReset={() => setIsActive(false)}
          showRestTimer={true}
          restTime={90}
        />
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="text-sm text-gray-400 mb-2 block">Notes for this set</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about this set..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          rows={3}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {!isWorkoutComplete ? (
          <>
            <button
              onClick={handleCompleteSet}
              className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              Complete Set
            </button>
            <button
              onClick={handleSkipSet}
              className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <X size={20} />
              Skip Set
            </button>
          </>
        ) : (
          <button
            onClick={handleFinishExercise}
            className="flex-1 bg-cyan-500 text-white py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle size={20} />
            {isTemplateWorkout && !isLastExercise ? 'Next Exercise' : 'Finish Workout'}
          </button>
        )}
        
        {isTemplateWorkout && (
          <button
            onClick={handleSkipExercise}
            className="bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
          >
            <SkipForward size={20} />
            Skip Exercise
          </button>
        )}
        
        <button
          onClick={handleCancelWorkout}
          className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
        >
          <X size={20} />
          Cancel
        </button>
      </div>

      {/* Completed Sets Summary */}
      {completedSets.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">Completed Sets</h3>
          <div className="space-y-2">
            {completedSets.map((set, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">Set {set.setNumber}</span>
                  <div className="flex items-center gap-2">
                    <Dumbbell size={16} className="text-gray-400" />
                    <span className="text-white">{set.weight} lbs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-gray-400" />
                    <span className="text-white">{set.reps} reps</span>
                  </div>
                </div>
                <CheckCircle size={16} className="text-green-500" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutSession; 