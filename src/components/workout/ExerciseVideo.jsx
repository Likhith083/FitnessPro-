import React, { useState } from 'react';
import { Video, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const ExerciseVideo = ({ exercise, isVisible, onToggle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
    setDuration(e.target.duration);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isVisible) {
    return (
      <div className="bg-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
            <Video size={20} />
            Exercise Video
          </h3>
          <button
            onClick={onToggle}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Show Video
          </button>
        </div>
        <div className="text-center py-8 text-gray-400">
          <Video size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Click "Show Video" to see exercise demonstration</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
          <Video size={20} />
          Exercise Video
        </h3>
        <button
          onClick={onToggle}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Hide Video
        </button>
      </div>
      
      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        {exercise?.videoUrl ? (
          <div className="relative">
            <video
              src={exercise.videoUrl}
              className="w-full h-64 object-cover"
              controls
              muted={isMuted}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
              onTimeUpdate={handleTimeUpdate}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center justify-between text-white text-sm">
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                <button
                  onClick={toggleMute}
                  className="p-1 rounded hover:bg-white/20 transition-colors"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <Video size={48} className="mx-auto mb-4 text-gray-500" />
              <p className="text-gray-400 mb-2">Video not available yet</p>
              <p className="text-sm text-gray-500 mb-4">Check back later for demonstration</p>
              <div className="bg-gray-700 rounded-lg p-4 max-w-sm mx-auto">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Exercise Instructions:</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  {exercise?.instructions?.slice(0, 3).map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseVideo; 