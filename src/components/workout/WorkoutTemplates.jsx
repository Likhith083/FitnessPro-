import React, { useState } from 'react';
import { Play, Clock, Target, Dumbbell, Plus, BookOpen, Star } from 'lucide-react';
import { WORKOUT_TEMPLATES, getTemplatesByDifficulty } from '../../data/workoutTemplates';

const WorkoutTemplates = ({ onStartTemplate }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const difficulties = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];

  const filteredTemplates = selectedDifficulty === 'all' 
    ? WORKOUT_TEMPLATES 
    : getTemplatesByDifficulty(selectedDifficulty);

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

  const handleStartTemplate = (template) => {
    onStartTemplate(template);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-200 mb-2">Workout Templates</h2>
          <p className="text-gray-400">Choose from pre-designed workout routines</p>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-gray-400" />
          <span className="text-sm text-gray-400">{WORKOUT_TEMPLATES.length} templates</span>
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="flex gap-2">
        {difficulties.map(difficulty => (
          <button
            key={difficulty.id}
            onClick={() => setSelectedDifficulty(difficulty.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedDifficulty === difficulty.id
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {difficulty.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className={`bg-gray-800 rounded-xl border transition-all duration-300 cursor-pointer ${
              selectedTemplate?.id === template.id
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-gray-700 hover:border-gray-600 hover:bg-gray-700'
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            <div className="p-6">
              {/* Template Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </span>
                </div>
                {template.isCustom && (
                  <Star size={16} className="text-yellow-500 flex-shrink-0" />
                )}
              </div>

              {/* Template Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock size={14} />
                  <span>{template.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Target size={14} />
                  <span>{template.frequency}</span>
                </div>
              </div>

              {/* Exercise Preview */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Exercises:</h4>
                <div className="space-y-1">
                  {template.exercises.slice(0, 3).map((exercise, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                      <Dumbbell size={12} />
                      <span>{exercise.exercise.name}</span>
                      <span className="text-gray-500">({exercise.sets}×{exercise.reps})</span>
                    </div>
                  ))}
                  {template.exercises.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{template.exercises.length - 3} more exercises
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartTemplate(template);
                }}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <Play size={16} />
                Start Workout
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Template Details */}
      {selectedTemplate && (
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-200">{selectedTemplate.name}</h3>
            <button
              onClick={() => handleStartTemplate(selectedTemplate)}
              className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
            >
              <Play size={16} />
              Start This Workout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{selectedTemplate.exercises.length}</div>
              <div className="text-sm text-gray-400">Exercises</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {selectedTemplate.exercises.reduce((sum, ex) => sum + ex.sets, 0)}
              </div>
              <div className="text-sm text-gray-400">Total Sets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{selectedTemplate.duration}</div>
              <div className="text-sm text-gray-400">Duration</div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-3">Workout Plan:</h4>
            <div className="space-y-3">
              {selectedTemplate.exercises.map((exercise, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{exercise.exercise.name}</div>
                      <div className="text-sm text-gray-400">{exercise.exercise.muscleGroups.join(', ')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">{exercise.sets} × {exercise.reps}</div>
                    <div className="text-sm text-gray-400">{exercise.rest}s rest</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
          <p>No templates found for the selected difficulty level.</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutTemplates; 