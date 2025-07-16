// Comprehensive Exercise Library for FitnessPro+
export const EXERCISE_CATEGORIES = {
  STRENGTH: 'strength',
  CARDIO: 'cardio',
  FLEXIBILITY: 'flexibility',
  BODYWEIGHT: 'bodyweight',
  YOGA: 'yoga',
  SPORTS: 'sports'
};

export const MUSCLE_GROUPS = {
  CHEST: 'chest',
  BACK: 'back',
  SHOULDERS: 'shoulders',
  BICEPS: 'biceps',
  TRICEPS: 'triceps',
  FOREARMS: 'forearms',
  ABS: 'abs',
  OBLIQUES: 'obliques',
  QUADS: 'quadriceps',
  HAMSTRINGS: 'hamstrings',
  GLUTES: 'glutes',
  CALVES: 'calves',
  FULL_BODY: 'full_body',
  CORE: 'core',
  CARDIO: 'cardio'
};

export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
};

export const DEFAULT_EXERCISES = [
  // Chest Exercises
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: EXERCISE_CATEGORIES.STRENGTH,
    muscleGroups: [MUSCLE_GROUPS.CHEST, MUSCLE_GROUPS.TRICEPS, MUSCLE_GROUPS.SHOULDERS],
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    equipment: ['barbell', 'bench'],
    instructions: [
      'Lie on the bench with your feet flat on the ground',
      'Grip the barbell slightly wider than shoulder width',
      'Lower the bar to your chest with control',
      'Press the bar back up to the starting position'
    ],
    tips: [
      'Keep your core tight throughout the movement',
      'Don\'t bounce the bar off your chest',
      'Maintain proper form and breathing'
    ],
    videoUrl: null, // Ready for video upload
    defaultSets: 3,
    defaultReps: 8,
    defaultWeight: 135
  },
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: EXERCISE_CATEGORIES.BODYWEIGHT,
    muscleGroups: [MUSCLE_GROUPS.CHEST, MUSCLE_GROUPS.TRICEPS, MUSCLE_GROUPS.SHOULDERS],
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    equipment: [],
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders',
      'Lower your body until your chest nearly touches the ground',
      'Push back up to the starting position'
    ],
    tips: [
      'Keep your body in a straight line',
      'Engage your core throughout the movement',
      'Breathe steadily during the exercise'
    ],
    videoUrl: null,
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 0
  },
  {
    id: 'dumbbell-flyes',
    name: 'Dumbbell Flyes',
    category: EXERCISE_CATEGORIES.STRENGTH,
    muscleGroups: [MUSCLE_GROUPS.CHEST],
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    equipment: ['dumbbells', 'bench'],
    instructions: [
      'Lie on the bench with dumbbells held above your chest',
      'Lower the dumbbells in an arc motion',
      'Return to the starting position with control'
    ],
    tips: [
      'Keep a slight bend in your elbows',
      'Focus on feeling the stretch in your chest',
      'Don\'t let the dumbbells touch at the bottom'
    ],
    videoUrl: null,
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 25
  },

  // Back Exercises
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: EXERCISE_CATEGORIES.BODYWEIGHT,
    muscleGroups: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.BICEPS],
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    equipment: ['pull-up bar'],
    instructions: [
      'Hang from the pull-up bar with hands shoulder-width apart',
      'Pull yourself up until your chin is above the bar',
      'Lower yourself back down with control'
    ],
    tips: [
      'Engage your back muscles, not just your arms',
      'Keep your core tight throughout',
      'Avoid swinging or using momentum'
    ],
    videoUrl: null,
    defaultSets: 3,
    defaultReps: 8,
    defaultWeight: 0
  },
  {
    id: 'bent-over-rows',
    name: 'Bent Over Rows',
    category: EXERCISE_CATEGORIES.STRENGTH,
    muscleGroups: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.BICEPS],
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    equipment: ['barbell'],
    instructions: [
      'Stand with feet shoulder-width apart, knees slightly bent',
      'Bend forward at the waist, keeping your back straight',
      'Pull the barbell to your lower chest',
      'Lower the bar back down with control'
    ],
    tips: [
      'Keep your back straight throughout',
      'Squeeze your shoulder blades together',
      'Don\'t let your back round'
    ],
    videoUrl: null,
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 95
  },

  // Shoulder Exercises
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: EXERCISE_CATEGORIES.STRENGTH,
    muscleGroups: [MUSCLE_GROUPS.SHOULDERS, MUSCLE_GROUPS.TRICEPS],
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    equipment: ['barbell'],
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold the barbell at shoulder level',
      'Press the bar overhead until arms are fully extended',
      'Lower the bar back to shoulder level'
    ],
    tips: [
      'Keep your core tight',
      'Don\'t lean back excessively',
      'Breathe steadily throughout'
    ],
    videoUrl: null,
    defaultSets: 3,
    defaultReps: 8,
    defaultWeight: 95
  },
  {
    id: 'lateral-raises',
    name: 'Lateral Raises',
    category: EXERCISE_CATEGORIES.STRENGTH,
    muscleGroups: [MUSCLE_GROUPS.SHOULDERS],
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    equipment: ['dumbbells'],
    instructions: [
      'Stand with dumbbells at your sides',
      'Raise the dumbbells to shoulder level',
      'Lower them back down with control'
    ],
    tips: [
      'Keep your elbows slightly bent',
      'Don\'t swing the weights',
      'Focus on the lateral deltoid muscle'
    ],
    videoUrl: null,
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 15
  },

  // Arm Exercises
  {
    id: 'bicep-curls',
    name: 'Bicep Curls',
    category: EXERCISE_CATEGORIES.STRENGTH,
    muscleGroups: [MUSCLE_GROUPS.BICEPS],
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    equipment: ['dumbbells'],
    instructions: [
      'Stand with dumbbells at your sides',
      'Curl the weights up to shoulder level',
      'Lower them back down with control'
    ],
    tips: [
      'Keep your elbows at your sides',
      'Don\'t swing the weights',
      'Focus on the bicep contraction'
    ],
    videoUrl: null,
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 25
  },
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    category: EXERCISE_CATEGORIES.BODYWEIGHT,
    muscleGroups: [MUSCLE_GROUPS.TRICEPS, MUSCLE_GROUPS.CHEST],
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    equipment: ['dip bars'],
    instructions: [
      'Support yourself on the dip bars',
      'Lower your body by bending your elbows',
      'Push back up to the starting position'
    ],
    tips: [
      'Keep your body upright',
      'Focus on your triceps',
      'Don\'t let your shoulders shrug'
    ],
    videoUrl: null,
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 0
  },

  // Leg Exercises
  {
    id: 'squats',
    name: 'Squats',
    category: EXERCISE_CATEGORIES.STRENGTH,
    muscleGroups: [MUSCLE_GROUPS.QUADS, MUSCLE_GROUPS.GLUTES, MUSCLE_GROUPS.HAMSTRINGS],
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    equipment: ['barbell'],
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting back into a chair',
      'Keep your knees behind your toes',
      'Return to the starting position'
    ],
    tips: [
      'Keep your chest up',
      'Push through your heels',
      'Keep your core tight'
    ],
    videoUrl: null,
    defaultSets: 3,
    defaultReps: 10,
    defaultWeight: 135
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: EXERCISE_CATEGORIES.STRENGTH,
    muscleGroups: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.HAMSTRINGS, MUSCLE_GROUPS.GLUTES],
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    equipment: ['barbell'],
    instructions: [
      'Stand with feet hip-width apart',
      'Bend at the hips and knees to grasp the bar',
      'Lift the bar by extending your hips and knees',
      'Lower the bar back to the ground'
    ],
    tips: [
      'Keep your back straight',
      'Lift with your legs, not your back',
      'Keep the bar close to your body'
    ],
    videoUrl: null,
    defaultSets: 3,
    defaultReps: 5,
    defaultWeight: 185
  },
  {
    id: 'lunges',
    name: 'Lunges',
    category: EXERCISE_CATEGORIES.STRENGTH,
    muscleGroups: [MUSCLE_GROUPS.QUADS, MUSCLE_GROUPS.GLUTES, MUSCLE_GROUPS.HAMSTRINGS],
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    equipment: [],
    instructions: [
      'Step forward with one leg',
      'Lower your body until both knees are bent',
      'Push back to the starting position',
      'Repeat with the other leg'
    ],
    tips: [
      'Keep your front knee behind your toe',
      'Maintain good posture',
      'Keep your core engaged'
    ],
    videoUrl: null,
    defaultSets: 3,
    defaultReps: 12,
    defaultWeight: 0
  },

  // Core Exercises
  {
    id: 'plank',
    name: 'Plank',
    category: EXERCISE_CATEGORIES.BODYWEIGHT,
    muscleGroups: [MUSCLE_GROUPS.CORE, MUSCLE_GROUPS.ABS],
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    equipment: [],
    instructions: [
      'Start in a push-up position',
      'Lower onto your forearms',
      'Hold your body in a straight line',
      'Keep your core tight'
    ],
    tips: [
      'Don\'t let your hips sag',
      'Breathe steadily',
      'Focus on engaging your core'
    ],
    videoUrl: null,
    defaultSets: 3,
    defaultReps: 30,
    defaultWeight: 0
  },
  {
    id: 'crunches',
    name: 'Crunches',
    category: EXERCISE_CATEGORIES.BODYWEIGHT,
    muscleGroups: [MUSCLE_GROUPS.ABS],
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    equipment: [],
    instructions: [
      'Lie on your back with knees bent',
      'Place your hands behind your head',
      'Lift your shoulders off the ground',
      'Lower back down with control'
    ],
    tips: [
      'Don\'t pull on your neck',
      'Focus on your abs, not momentum',
      'Keep your lower back on the ground'
    ],
    videoUrl: null,
    defaultSets: 3,
    defaultReps: 15,
    defaultWeight: 0
  },

  // Cardio Exercises
  {
    id: 'running',
    name: 'Running',
    category: EXERCISE_CATEGORIES.CARDIO,
    muscleGroups: [MUSCLE_GROUPS.CARDIO, MUSCLE_GROUPS.QUADS, MUSCLE_GROUPS.CALVES],
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    equipment: [],
    instructions: [
      'Start with a light warm-up',
      'Maintain good posture',
      'Land on the middle of your foot',
      'Keep a steady pace'
    ],
    tips: [
      'Stay hydrated',
      'Listen to your body',
      'Gradually increase distance and speed'
    ],
    videoUrl: null,
    defaultSets: 1,
    defaultReps: 30,
    defaultWeight: 0
  },
  {
    id: 'cycling',
    name: 'Cycling',
    category: EXERCISE_CATEGORIES.CARDIO,
    muscleGroups: [MUSCLE_GROUPS.CARDIO, MUSCLE_GROUPS.QUADS, MUSCLE_GROUPS.CALVES],
    difficulty: DIFFICULTY_LEVELS.BEGINNER,
    equipment: ['bicycle'],
    instructions: [
      'Adjust your seat height properly',
      'Maintain good posture',
      'Keep a steady cadence',
      'Use proper gear ratios'
    ],
    tips: [
      'Wear a helmet',
      'Stay visible to traffic',
      'Maintain your bike regularly'
    ],
    videoUrl: null,
    defaultSets: 1,
    defaultReps: 45,
    defaultWeight: 0
  }
];

export const getExercisesByCategory = (category) => {
  return DEFAULT_EXERCISES.filter(exercise => exercise.category === category);
};

export const getExercisesByMuscleGroup = (muscleGroup) => {
  return DEFAULT_EXERCISES.filter(exercise => 
    exercise.muscleGroups.includes(muscleGroup)
  );
};

export const getExercisesByDifficulty = (difficulty) => {
  return DEFAULT_EXERCISES.filter(exercise => exercise.difficulty === difficulty);
};

export const searchExercises = (query) => {
  const searchTerm = query.toLowerCase();
  return DEFAULT_EXERCISES.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm) ||
    exercise.muscleGroups.some(group => group.toLowerCase().includes(searchTerm)) ||
    exercise.category.toLowerCase().includes(searchTerm)
  );
}; 