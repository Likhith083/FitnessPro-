// Workout Templates for FitnessPro+
import { DEFAULT_EXERCISES } from './exerciseLibrary.js';

export const WORKOUT_TEMPLATES = [
  {
    id: 'beginner-full-body',
    name: 'Beginner Full Body',
    description: 'Perfect for beginners starting their fitness journey',
    difficulty: 'beginner',
    duration: '45-60 minutes',
    frequency: '3 times per week',
    exercises: [
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'push-ups'),
        sets: 3,
        reps: 8,
        rest: 60
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'squats'),
        sets: 3,
        reps: 12,
        rest: 60
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'plank'),
        sets: 3,
        reps: 30,
        rest: 45
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'lunges'),
        sets: 3,
        reps: 10,
        rest: 60
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'crunches'),
        sets: 3,
        reps: 15,
        rest: 45
      }
    ]
  },
  {
    id: 'strength-upper-body',
    name: 'Upper Body Strength',
    description: 'Focus on chest, back, shoulders, and arms',
    difficulty: 'intermediate',
    duration: '60-75 minutes',
    frequency: '2 times per week',
    exercises: [
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'bench-press'),
        sets: 4,
        reps: 8,
        rest: 90
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'pull-ups'),
        sets: 3,
        reps: 6,
        rest: 90
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'overhead-press'),
        sets: 3,
        reps: 8,
        rest: 90
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'bicep-curls'),
        sets: 3,
        reps: 12,
        rest: 60
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'tricep-dips'),
        sets: 3,
        reps: 10,
        rest: 60
      }
    ]
  },
  {
    id: 'strength-lower-body',
    name: 'Lower Body Strength',
    description: 'Build strong legs and glutes',
    difficulty: 'intermediate',
    duration: '60-75 minutes',
    frequency: '2 times per week',
    exercises: [
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'squats'),
        sets: 4,
        reps: 8,
        rest: 90
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'deadlift'),
        sets: 3,
        reps: 5,
        rest: 120
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'lunges'),
        sets: 3,
        reps: 12,
        rest: 60
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'plank'),
        sets: 3,
        reps: 45,
        rest: 60
      }
    ]
  },
  {
    id: 'cardio-hiit',
    name: 'HIIT Cardio',
    description: 'High-intensity interval training for fat burning',
    difficulty: 'intermediate',
    duration: '30-45 minutes',
    frequency: '3-4 times per week',
    exercises: [
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'running'),
        sets: 1,
        reps: 20,
        rest: 30,
        notes: '30 seconds sprint, 30 seconds walk'
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'push-ups'),
        sets: 1,
        reps: 10,
        rest: 30
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'squats'),
        sets: 1,
        reps: 15,
        rest: 30
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'plank'),
        sets: 1,
        reps: 30,
        rest: 30
      }
    ]
  },
  {
    id: 'advanced-strength',
    name: 'Advanced Strength',
    description: 'For experienced lifters looking to build maximum strength',
    difficulty: 'advanced',
    duration: '75-90 minutes',
    frequency: '4 times per week',
    exercises: [
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'bench-press'),
        sets: 5,
        reps: 5,
        rest: 120
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'deadlift'),
        sets: 3,
        reps: 3,
        rest: 180
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'squats'),
        sets: 4,
        reps: 6,
        rest: 120
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'overhead-press'),
        sets: 3,
        reps: 6,
        rest: 90
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'bent-over-rows'),
        sets: 3,
        reps: 8,
        rest: 90
      }
    ]
  },
  {
    id: 'bodyweight-circuit',
    name: 'Bodyweight Circuit',
    description: 'No equipment needed - perfect for home workouts',
    difficulty: 'beginner',
    duration: '30-45 minutes',
    frequency: '4-5 times per week',
    exercises: [
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'push-ups'),
        sets: 3,
        reps: 10,
        rest: 30
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'squats'),
        sets: 3,
        reps: 15,
        rest: 30
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'plank'),
        sets: 3,
        reps: 30,
        rest: 30
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'lunges'),
        sets: 3,
        reps: 12,
        rest: 30
      },
      {
        exercise: DEFAULT_EXERCISES.find(e => e.id === 'crunches'),
        sets: 3,
        reps: 20,
        rest: 30
      }
    ]
  }
];

export const getTemplatesByDifficulty = (difficulty) => {
  return WORKOUT_TEMPLATES.filter(template => template.difficulty === difficulty);
};

export const getTemplateById = (id) => {
  return WORKOUT_TEMPLATES.find(template => template.id === id);
};

export const createCustomTemplate = (name, description, exercises) => {
  return {
    id: `custom-${Date.now()}`,
    name,
    description,
    difficulty: 'custom',
    duration: '45-60 minutes',
    frequency: '3 times per week',
    exercises,
    isCustom: true
  };
}; 