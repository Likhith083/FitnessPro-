import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

const WorkoutTimer = ({ 
  isActive, 
  onStart, 
  onPause, 
  onReset, 
  onSkip, 
  restTime = 90,
  showRestTimer = false 
}) => {
  const [time, setTime] = useState(0);
  const [restTimeLeft, setRestTimeLeft] = useState(restTime);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const restIntervalRef = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused]);

  useEffect(() => {
    if (isResting && !isPaused) {
      restIntervalRef.current = setInterval(() => {
        setRestTimeLeft(prevTime => {
          if (prevTime <= 1) {
            setIsResting(false);
            setRestTimeLeft(restTime);
            clearInterval(restIntervalRef.current);
            return restTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(restIntervalRef.current);
    }

    return () => clearInterval(restIntervalRef.current);
  }, [isResting, isPaused, restTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRest = () => {
    setIsResting(true);
    setIsPaused(false);
    setRestTimeLeft(restTime);
  };

  const handlePauseRest = () => {
    setIsPaused(!isPaused);
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestTimeLeft(restTime);
    setIsPaused(false);
  };

  const handleReset = () => {
    setTime(0);
    setRestTimeLeft(restTime);
    setIsResting(false);
    setIsPaused(false);
    onReset?.();
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-gray-200 mb-4">
        {isResting ? 'Rest Timer' : 'Workout Timer'}
      </h3>
      
      {/* Main Timer Display */}
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-cyan-400 mb-2">
          {isResting ? formatTime(restTimeLeft) : formatTime(time)}
        </div>
        <div className="text-gray-400">
          {isResting ? 'Rest Time' : 'Workout Time'}
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex justify-center gap-4 mb-6">
        {!isResting ? (
          <>
            <button
              onClick={isActive ? onPause : onStart}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              {isActive ? <Pause size={20} /> : <Play size={20} />}
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handlePauseRest}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={handleSkipRest}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <SkipForward size={20} />
              Skip Rest
            </button>
          </>
        )}
      </div>

      {/* Rest Timer Controls */}
      {showRestTimer && !isResting && (
        <div className="text-center">
          <button
            onClick={handleStartRest}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors mx-auto"
          >
            <Play size={20} />
            Start Rest Timer ({restTime}s)
          </button>
        </div>
      )}

      {/* Progress Bar for Rest Timer */}
      {isResting && (
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((restTime - restTimeLeft) / restTime) * 100}%` }}
            />
          </div>
          <div className="text-center text-sm text-gray-400 mt-2">
            {Math.round(((restTime - restTimeLeft) / restTime) * 100)}% Complete
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutTimer; 