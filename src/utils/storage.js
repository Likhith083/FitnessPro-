// Local storage utilities for FitnessPro+
export const STORAGE_KEYS = {
  EXERCISES: 'fitnesspro_exercises',
  WORKOUT_HISTORY: 'fitnesspro_workout_history',
  SCHEDULED_WORKOUTS: 'fitnesspro_scheduled_workouts',
  CHAT_MESSAGES: 'fitnesspro_chat_messages',
  APP_SETTINGS: 'fitnesspro_app_settings',
  BODY_MEASUREMENTS: 'fitnesspro_body_measurements',
  GOALS: 'fitnesspro_goals',
  WORKOUT_TEMPLATES: 'fitnesspro_workout_templates'
};

export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading from storage: ${key}`, error);
    return defaultValue;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving to storage: ${key}`, error);
    return false;
  }
};

export const clearStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error clearing storage: ${key}`, error);
    return false;
  }
};

export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing all data', error);
    return false;
  }
};

// Default user profile
const DEFAULT_PROFILE = {
  name: 'Fitness Enthusiast',
  age: 25,
  weight: 70, // kg
  height: { feet: 5, inches: 10 },
  fitnessLevel: 'beginner',
  goals: ['build_muscle', 'lose_weight', 'improve_strength'],
  preferredWorkoutDuration: 45, // minutes
  restTimePreference: 60, // seconds
  createdAt: new Date().toISOString()
};

// Default settings
const DEFAULT_SETTINGS = {
  theme: 'dark',
  autoStartTimer: true,
  soundEnabled: true,
  notifications: true,
  units: 'metric' // metric or imperial
};

// Storage utility functions
export const storage = {
  // Get data from localStorage
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return null;
    }
  },

  // Set data to localStorage
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  },

  // Remove data from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage key "${key}":`, error);
      return false;
    }
  },

  // Clear all app data
  clear: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// User profile management
export const userProfile = {
  get: () => {
    const profile = storage.get(STORAGE_KEYS.USER_PROFILE);
    return profile || DEFAULT_PROFILE;
  },

  set: (profile) => {
    return storage.set(STORAGE_KEYS.USER_PROFILE, {
      ...DEFAULT_PROFILE,
      ...profile,
      updatedAt: new Date().toISOString()
    });
  },

  update: (updates) => {
    const currentProfile = userProfile.get();
    const updatedProfile = { ...currentProfile, ...updates, updatedAt: new Date().toISOString() };
    return storage.set(STORAGE_KEYS.USER_PROFILE, updatedProfile);
  }
};

// Workout history management
export const workoutHistory = {
  get: () => {
    return storage.get(STORAGE_KEYS.WORKOUT_HISTORY) || [];
  },

  add: (workout) => {
    const history = workoutHistory.get();
    const newWorkout = {
      ...workout,
      id: Date.now(),
      completedAt: new Date().toISOString()
    };
    history.unshift(newWorkout);
    return storage.set(STORAGE_KEYS.WORKOUT_HISTORY, history.slice(0, 100)); // Keep last 100 workouts
  },

  getByDateRange: (startDate, endDate) => {
    const history = workoutHistory.get();
    return history.filter(workout => {
      const workoutDate = new Date(workout.completedAt);
      return workoutDate >= startDate && workoutDate <= endDate;
    });
  }
};

// Progress data management
export const progressData = {
  get: () => {
    return storage.get(STORAGE_KEYS.PROGRESS_DATA) || {
      weight: [],
      bodyMeasurements: [],
      exerciseProgress: {},
      personalRecords: {}
    };
  },

  addWeight: (weight, date = new Date()) => {
    const data = progressData.get();
    data.weight.push({ weight, date: date.toISOString() });
    return storage.set(STORAGE_KEYS.PROGRESS_DATA, data);
  },

  addBodyMeasurement: (measurement, date = new Date()) => {
    const data = progressData.get();
    data.bodyMeasurements.push({ ...measurement, date: date.toISOString() });
    return storage.set(STORAGE_KEYS.PROGRESS_DATA, data);
  },

  updateExerciseProgress: (exerciseId, progress) => {
    const data = progressData.get();
    if (!data.exerciseProgress[exerciseId]) {
      data.exerciseProgress[exerciseId] = [];
    }
    data.exerciseProgress[exerciseId].push({
      ...progress,
      date: new Date().toISOString()
    });
    return storage.set(STORAGE_KEYS.PROGRESS_DATA, data);
  },

  updatePersonalRecord: (exerciseId, record) => {
    const data = progressData.get();
    data.personalRecords[exerciseId] = {
      ...record,
      date: new Date().toISOString()
    };
    return storage.set(STORAGE_KEYS.PROGRESS_DATA, data);
  }
};

// Custom exercises management
export const customExercises = {
  get: () => {
    return storage.get(STORAGE_KEYS.CUSTOM_EXERCISES) || [];
  },

  add: (exercise) => {
    const exercises = customExercises.get();
    const newExercise = {
      ...exercise,
      id: Date.now(),
      isCustom: true,
      createdAt: new Date().toISOString()
    };
    exercises.push(newExercise);
    return storage.set(STORAGE_KEYS.CUSTOM_EXERCISES, exercises);
  },

  update: (exerciseId, updates) => {
    const exercises = customExercises.get();
    const index = exercises.findIndex(ex => ex.id === exerciseId);
    if (index !== -1) {
      exercises[index] = { ...exercises[index], ...updates, updatedAt: new Date().toISOString() };
      return storage.set(STORAGE_KEYS.CUSTOM_EXERCISES, exercises);
    }
    return false;
  },

  remove: (exerciseId) => {
    const exercises = customExercises.get();
    const filtered = exercises.filter(ex => ex.id !== exerciseId);
    return storage.set(STORAGE_KEYS.CUSTOM_EXERCISES, filtered);
  }
};

// Workout schedule management
export const workoutSchedule = {
  get: () => {
    return storage.get(STORAGE_KEYS.WORKOUT_SCHEDULE) || [];
  },

  add: (schedule) => {
    const schedules = workoutSchedule.get();
    const newSchedule = {
      ...schedule,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    schedules.push(newSchedule);
    return storage.set(STORAGE_KEYS.WORKOUT_SCHEDULE, schedules);
  },

  update: (scheduleId, updates) => {
    const schedules = workoutSchedule.get();
    const index = schedules.findIndex(s => s.id === scheduleId);
    if (index !== -1) {
      schedules[index] = { ...schedules[index], ...updates, updatedAt: new Date().toISOString() };
      return storage.set(STORAGE_KEYS.WORKOUT_SCHEDULE, schedules);
    }
    return false;
  },

  remove: (scheduleId) => {
    const schedules = workoutSchedule.get();
    const filtered = schedules.filter(s => s.id !== scheduleId);
    return storage.set(STORAGE_KEYS.WORKOUT_SCHEDULE, filtered);
  }
};

// Theme management
export const theme = {
  get: () => {
    return storage.get(STORAGE_KEYS.THEME_PREFERENCE) || 'dark';
  },

  set: (theme) => {
    return storage.set(STORAGE_KEYS.THEME_PREFERENCE, theme);
  },

  toggle: () => {
    const currentTheme = theme.get();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    theme.set(newTheme);
    return newTheme;
  }
};

// Settings management
export const settings = {
  get: () => {
    return storage.get(STORAGE_KEYS.SETTINGS) || DEFAULT_SETTINGS;
  },

  set: (newSettings) => {
    return storage.set(STORAGE_KEYS.SETTINGS, {
      ...DEFAULT_SETTINGS,
      ...newSettings
    });
  },

  update: (updates) => {
    const currentSettings = settings.get();
    return settings.set({ ...currentSettings, ...updates });
  }
};

// Utility functions
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const calculateBMI = (weight, height) => {
  const heightInMeters = (height.feet * 12 + height.inches) * 0.0254;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

export const calculateWorkoutVolume = (sets, reps, weight = 0) => {
  return sets * reps * (weight || 1);
}; 