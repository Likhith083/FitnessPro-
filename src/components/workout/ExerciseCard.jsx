import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronDown, ChevronUp, Dumbbell, Target, Clock, AlertCircle } from 'lucide-react';

const ExerciseCard = ({ 
  exercise, 
  isSelected = false, 
  onSelect, 
  onStartWorkout,
  showDetails = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleVideoToggle = () => {
    if (exercise.videoUrl) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-300 border-green-500';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500';
      case 'advanced':
        return 'bg-red-500/20 text-red-300 border-red-500';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'strength':
        return 'bg-blue-500/20 text-blue-300';
      case 'cardio':
        return 'bg-red-500/20 text-red-300';
      case 'bodyweight':
        return 'bg-purple-500/20 text-purple-300';
      case 'flexibility':
        return 'bg-green-500/20 text-green-300';
      case 'yoga':
        return 'bg-indigo-500/20 text-indigo-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className={`bg-gray-800 rounded-xl border transition-all duration-300 ${
      isSelected 
        ? 'border-cyan-500 bg-cyan-500/10' 
        : 'border-gray-700 hover:border-gray-600 hover:bg-gray-700'
    }`}>
      {/* Exercise Header */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">{exercise.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(exercise.difficulty)}`}>
                {exercise.difficulty}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(exercise.category)}`}>
                {exercise.category}
              </span>
            </div>
          </div>
          <Dumbbell size={20} className="text-gray-500 flex-shrink-0" />
        </div>

        {/* Muscle Groups */}
        <div className="flex items-center gap-2 mb-3">
          <Target size={16} className="text-gray-400" />
          <div className="flex flex-wrap gap-1">
            {exercise.muscleGroups.map((muscle, index) => (
              <span key={index} className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Equipment */}
        {exercise.equipment && exercise.equipment.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <Dumbbell size={16} className="text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {exercise.equipment.map((equip, index) => (
                <span key={index} className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                  {equip}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Default Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{exercise.defaultSets} sets</span>
          </div>
          <div className="flex items-center gap-1">
            <Target size={14} />
            <span>{exercise.defaultReps} reps</span>
          </div>
          {exercise.defaultWeight > 0 && (
            <div className="flex items-center gap-1">
              <Dumbbell size={14} />
              <span>{exercise.defaultWeight} lbs</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onSelect(exercise)}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              isSelected 
                ? 'bg-cyan-500 text-white hover:bg-cyan-600' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {isSelected ? 'Selected' : 'Select Exercise'}
          </button>
          {isSelected && (
            <button
              onClick={() => onStartWorkout(exercise)}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              Start
            </button>
          )}
        </div>
      </div>

      {/* Video Section */}
      {exercise.videoUrl && (
        <div className="border-t border-gray-700 p-4">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            <video
              src={exercise.videoUrl}
              className="w-full h-48 object-cover"
              muted={isMuted}
              loop
            />
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button
                onClick={handleMuteToggle}
                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                onClick={handleVideoToggle}
                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Section */}
      {showDetails && (
        <div className="border-t border-gray-700">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-700 transition-colors"
          >
            <span className="font-semibold text-gray-200">Instructions & Tips</span>
            {showInstructions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {showInstructions && (
            <div className="px-4 pb-4 space-y-4">
              {/* Instructions */}
              <div>
                <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                  <Play size={16} />
                  Instructions
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                  {exercise.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                  <AlertCircle size={16} />
                  Tips
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                  {exercise.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseCard; 