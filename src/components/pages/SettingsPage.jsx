import React, { useState } from 'react';
import { 
  Settings, User, Bell, Volume2, Sun, Moon, Download, 
  Trash2, Shield, Database, Palette, Clock
} from 'lucide-react';
import { userProfile, settings, storage } from '../../utils/storage';

const SettingsPage = ({ appSettings, onUpdateSettings }) => {
  const [profile, setProfile] = useState(userProfile.get());
  const [localSettings, setLocalSettings] = useState(appSettings);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleProfileUpdate = (updates) => {
    const updatedProfile = { ...profile, ...updates };
    setProfile(updatedProfile);
    userProfile.update(updates);
  };

  const handleSettingsUpdate = (updates) => {
    const updatedSettings = { ...localSettings, ...updates };
    setLocalSettings(updatedSettings);
    onUpdateSettings(updates);
  };

  const handleExportData = () => {
    const data = {
      profile: userProfile.get(),
      workoutHistory: storage.get('fitness_pro_workout_history'),
      progressData: storage.get('fitness_pro_progress_data'),
      customExercises: storage.get('fitness_pro_custom_exercises'),
      workoutSchedule: storage.get('fitness_pro_workout_schedule'),
      settings: settings.get()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitness-pro-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    storage.clear();
    window.location.reload();
  };

  const difficultyLevels = ['beginner', 'intermediate', 'advanced'];
  const fitnessGoals = [
    { id: 'build_muscle', label: 'Build Muscle' },
    { id: 'lose_weight', label: 'Lose Weight' },
    { id: 'improve_strength', label: 'Improve Strength' },
    { id: 'increase_endurance', label: 'Increase Endurance' },
    { id: 'maintain_fitness', label: 'Maintain Fitness' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary-500 mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your fitness app experience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="text-primary-500" size={24} />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleProfileUpdate({ name: e.target.value })}
                  className="input-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => handleProfileUpdate({ age: parseInt(e.target.value) || 25 })}
                    className="input-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={profile.weight}
                    onChange={(e) => handleProfileUpdate({ weight: parseFloat(e.target.value) || 70 })}
                    className="input-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fitness Level
                </label>
                <select
                  value={profile.fitnessLevel}
                  onChange={(e) => handleProfileUpdate({ fitnessLevel: e.target.value })}
                  className="input-primary"
                >
                  {difficultyLevels.map(level => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fitness Goals
                </label>
                <div className="space-y-2">
                  {fitnessGoals.map(goal => (
                    <label key={goal.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.goals.includes(goal.id)}
                        onChange={(e) => {
                          const updatedGoals = e.target.checked
                            ? [...profile.goals, goal.id]
                            : profile.goals.filter(g => g !== goal.id);
                          handleProfileUpdate({ goals: updatedGoals });
                        }}
                        className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {goal.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Workout Preferences */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-warning-500" size={24} />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Workout Preferences</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Workout Duration (minutes)
                </label>
                <input
                  type="number"
                  value={profile.preferredWorkoutDuration}
                  onChange={(e) => handleProfileUpdate({ preferredWorkoutDuration: parseInt(e.target.value) || 45 })}
                  className="input-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rest Time Preference (seconds)
                </label>
                <input
                  type="number"
                  value={profile.restTimePreference}
                  onChange={(e) => handleProfileUpdate({ restTimePreference: parseInt(e.target.value) || 60 })}
                  className="input-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* App Settings */}
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-primary-500" size={24} />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">App Settings</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Theme</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
                </div>
                <div className="flex items-center gap-2">
                  <Sun size={16} className="text-yellow-500" />
                  <select
                    value={localSettings.theme}
                    onChange={(e) => handleSettingsUpdate({ theme: e.target.value })}
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                  <Moon size={16} className="text-blue-500" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Auto-start Timer</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Automatically start workout timer</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.autoStartTimer}
                  onChange={(e) => handleSettingsUpdate({ autoStartTimer: e.target.checked })}
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Sound Effects</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Play sound notifications</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.soundEnabled}
                  onChange={(e) => handleSettingsUpdate({ soundEnabled: e.target.checked })}
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive workout reminders</p>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.notifications}
                  onChange={(e) => handleSettingsUpdate({ notifications: e.target.checked })}
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Units
                </label>
                <select
                  value={localSettings.units}
                  onChange={(e) => handleSettingsUpdate({ units: e.target.value })}
                  className="input-primary"
                >
                  <option value="metric">Metric (kg, cm)</option>
                  <option value="imperial">Imperial (lbs, ft)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Database className="text-success-500" size={24} />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Data Management</h2>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleExportData}
                className="w-full btn-secondary flex items-center justify-center gap-2"
              >
                <Download size={16} /> Export Data
              </button>

              <button
                onClick={() => setShowResetModal(true)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={16} /> Reset All Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-red-500" size={24} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Reset All Data
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This will permanently delete all your workout history, progress data, and settings. This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleResetData}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage; 