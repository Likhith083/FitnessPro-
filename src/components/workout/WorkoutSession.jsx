import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, X, Plus, Minus, Timer, Target, Dumbbell } from 'lucide-react';
import WorkoutTimer from './WorkoutTimer';

const WorkoutSession = ({ 
  exercise, 
  onComplete, 
  onCancel,
  initialStats = null 
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

  const totalSets = currentStats.sets;
  const isWorkoutComplete = completedSets.length >= totalSets;

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

  const handleFinishWorkout = () => {
    const workoutData = {
      exercise: exercise,
      sets: completedSets,
      totalDuration: 0, // Will be calculated from timer
      completedAt: new Date().toISOString(),
      notes: notes
    };
    onComplete(workoutData);
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

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{exercise?.name}</h2>
        <p className="text-gray-400">Set {currentSet} of {totalSets}</p>
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
            onClick={handleFinishWorkout}
            className="flex-1 bg-cyan-500 text-white py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle size={20} />
            Finish Workout
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