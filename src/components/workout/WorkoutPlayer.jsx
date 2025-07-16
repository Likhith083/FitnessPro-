import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, Pause, SkipForward, RotateCcw, Zap, CheckCircle, 
  Repeat, Clock, Target, Plus, Minus
} from 'lucide-react';
import { workoutHistory } from '../../utils/storage';
import { formatTime } from '../../utils/storage';

const WorkoutPlayer = ({ exercise, isLoading, selectedPlan }) => {
  // Workout parameters state
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(12);
  const [weight, setWeight] = useState(25);
  
  // Timer and workout flow state
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTime, setRestTime] = useState(60);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);

  const videoRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Reset workout state when exercise changes
  useEffect(() => {
    handleEndWorkout();
  }, [exercise]);

  // Video playback logic
  useEffect(() => {
    let isCancelled = false;
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.load();
          await videoRef.current.play();
        } catch (error) {
          if (!isCancelled) {
            console.error("Video play failed:", error);
          }
        }
      }
    };
    playVideo();
    return () => { isCancelled = true; };
  }, [exercise]);

  // Timer countdown logic
  useEffect(() => {
    if (isResting) {
      timerIntervalRef.current = setInterval(() => {
        setRestTime(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            handleRestEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isResting]);

  // Workout timer
  useEffect(() => {
    if (isTimerActive && workoutStartTime) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - workoutStartTime) / 1000);
        setTotalWorkoutTime(elapsed);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerActive, workoutStartTime]);

  const handleStartWorkout = () => {
    setIsTimerActive(true);
    setIsResting(false);
    setWorkoutComplete(false);
    setCurrentSet(1);
    setWorkoutStartTime(Date.now());
  };

  const handleFinishSet = () => {
    if (currentSet < sets) {
      setIsResting(true);
      setRestTime(60); // Reset rest time
    } else {
      setWorkoutComplete(true);
      setIsTimerActive(false);
      // Save workout to history
      if (exercise) {
        const workoutData = {
          name: exercise.name,
          exercises: [{
            exerciseId: exercise.id,
            name: exercise.name,
            sets: sets,
            reps: reps,
            weight: weight,
            completed: true
          }],
          duration: Math.floor(totalWorkoutTime / 60),
          completedAt: new Date().toISOString()
        };
        workoutHistory.add(workoutData);
      }
    }
  };
  
  const handleRestEnd = () => {
    setIsResting(false);
    setCurrentSet(prev => prev + 1);
  };

  const handleEndWorkout = () => {
    setIsTimerActive(false);
    setIsResting(false);
    setWorkoutComplete(false);
    setCurrentSet(1);
    setRestTime(60);
    setTotalWorkoutTime(0);
    setWorkoutStartTime(null);
    clearInterval(timerIntervalRef.current);
  };

  const CounterControl = ({ label, value, onIncrement, onDecrement }) => (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{label}</p>
      <div className="flex items-center justify-center gap-4 mt-2">
        <button 
          onClick={onDecrement} 
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-red-500 hover:text-white transition-colors"
        >
          <Minus size={16} />
        </button>
        <span className="text-2xl font-bold text-gray-900 dark:text-white w-12">{value}</span>
        <button 
          onClick={onIncrement} 
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-green-500 hover:text-white transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="card p-6 flex-grow flex flex-col">
      {/* Video Player */}
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg mb-6 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="spinner h-16 w-16"></div>
          </div>
        )}
        {!isLoading && exercise && (
          <video 
            ref={videoRef} 
            key={exercise.videoUrl} 
            className="w-full h-full object-cover animate-fade-in" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={exercise.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {!isLoading && !exercise && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Target size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">Select an exercise to begin</p>
              <p className="text-sm text-gray-400">Choose from the exercise library</p>
            </div>
          </div>
        )}
      </div>

      {exercise && !isLoading && (
        <div className="animate-fade-in space-y-6">
          {/* Exercise Info */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{exercise.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">{exercise.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {exercise.muscleGroups.map(group => (
                <span key={group} className="bg-success-500/20 text-success-700 dark:text-success-300 text-xs font-semibold px-3 py-1 rounded-full">
                  {group}
                </span>
              ))}
            </div>
          </div>

          {/* Workout Controls */}
          {!isTimerActive && !workoutComplete && (
            <>
              <div className={`grid gap-4 mb-6 ${exercise.equipment === 'dumbbells' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                <CounterControl 
                  label="Sets" 
                  value={sets} 
                  onIncrement={() => setSets(s => s + 1)} 
                  onDecrement={() => setSets(s => Math.max(1, s - 1))} 
                />
                <CounterControl 
                  label="Reps" 
                  value={reps} 
                  onIncrement={() => setReps(r => r + 1)} 
                  onDecrement={() => setReps(r => Math.max(1, r - 1))} 
                />
                {exercise.equipment === 'dumbbells' && (
                  <CounterControl 
                    label="Weight (lbs)" 
                    value={weight} 
                    onIncrement={() => setWeight(w => w + 5)} 
                    onDecrement={() => setWeight(w => Math.max(5, w - 5))} 
                  />
                )}
              </div>
              <button 
                onClick={handleStartWorkout} 
                className="w-full btn-success flex items-center justify-center gap-2"
              >
                <Play size={20} /> Start Workout
              </button>
            </>
          )}

          {/* Active Workout */}
          {isTimerActive && (
            <div className="text-center space-y-6">
              {isResting ? (
                <div className="animate-fade-in">
                  <p className="text-lg text-primary-500 font-semibold">REST</p>
                  <p className="timer-display text-primary-500">{formatTime(restTime)}</p>
                  <p className="text-gray-600 dark:text-gray-400">Next set: {currentSet + 1}</p>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <p className="text-lg text-warning-500 font-semibold">SET {currentSet}</p>
                  <p className="timer-display text-warning-500">{reps}</p>
                  <p className="text-gray-600 dark:text-gray-400">Reps</p>
                  <button 
                    onClick={handleFinishSet} 
                    className="mt-4 w-full btn-warning flex items-center justify-center gap-2"
                  >
                    <Zap size={20} /> Finish Set
                  </button>
                </div>
              )}
              
              {/* Workout Timer */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock size={16} />
                  <span className="font-mono">{formatTime(totalWorkoutTime)}</span>
                </div>
              </div>
              
              <button 
                onClick={handleEndWorkout} 
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-sm"
              >
                End Workout
              </button>
            </div>
          )}
          
          {/* Workout Complete */}
          {workoutComplete && (
            <div className="text-center animate-fade-in space-y-4">
              <CheckCircle size={48} className="mx-auto text-success-500" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Workout Complete!</p>
              <p className="text-gray-600 dark:text-gray-400">
                Great job! You completed {sets} sets of {reps} reps.
              </p>
              <button 
                onClick={handleEndWorkout} 
                className="w-full btn-secondary flex items-center justify-center gap-2"
              >
                <Repeat size={20} /> Start Over
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkoutPlayer; 