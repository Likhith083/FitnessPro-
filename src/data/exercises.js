export const exercises = [
  // Chest Exercises
  {
    id: 1,
    name: 'Push Ups',
    description: 'A classic bodyweight exercise that works the chest, shoulders, and triceps.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/pushup-demo.mp4',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'strength',
    instructions: 'Start in plank position, lower body until chest nearly touches ground, push back up.',
    tips: 'Keep your core tight and maintain a straight line from head to heels.'
  },
  {
    id: 2,
    name: 'Bench Press',
    description: 'Compound exercise targeting chest, shoulders, and triceps.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/bench-press-demo.mp4',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: 'Lie on bench, grip barbell slightly wider than shoulders, lower to chest, press up.',
    tips: 'Keep your feet flat on the ground and maintain shoulder blade retraction.'
  },
  {
    id: 3,
    name: 'Dumbbell Flyes',
    description: 'Isolation exercise for chest development.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/dumbbell-flyes-demo.mp4',
    muscleGroups: ['Chest'],
    equipment: 'dumbbells',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: 'Lie on bench, hold dumbbells above chest, lower in arc motion, return to start.',
    tips: 'Keep slight bend in elbows throughout the movement.'
  },

  // Back Exercises
  {
    id: 4,
    name: 'Pull Ups',
    description: 'Compound upper body exercise targeting back and biceps.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/pullup-demo.mp4',
    muscleGroups: ['Back', 'Biceps'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: 'Hang from bar, pull body up until chin over bar, lower with control.',
    tips: 'Engage your lats and avoid swinging your body.'
  },
  {
    id: 5,
    name: 'Bent Over Rows',
    description: 'Compound back exercise with barbell.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/bent-over-rows-demo.mp4',
    muscleGroups: ['Back', 'Biceps'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: 'Bend at hips and knees, pull barbell to lower chest, lower with control.',
    tips: 'Keep your back straight and chest up throughout the movement.'
  },
  {
    id: 6,
    name: 'Lat Pulldowns',
    description: 'Machine-based back exercise.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/lat-pulldown-demo.mp4',
    muscleGroups: ['Back', 'Biceps'],
    equipment: 'machine',
    difficulty: 'beginner',
    category: 'strength',
    instructions: 'Sit at machine, pull bar to upper chest, return with control.',
    tips: 'Focus on pulling with your back muscles, not your arms.'
  },

  // Leg Exercises
  {
    id: 7,
    name: 'Squats',
    description: 'Fundamental lower body exercise targeting quads, hamstrings, and glutes.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/squat-demo.mp4',
    muscleGroups: ['Quads', 'Glutes', 'Hamstrings'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'strength',
    instructions: 'Stand with feet shoulder-width apart, lower hips back and down, return to start.',
    tips: 'Keep your chest up and knees in line with your toes.'
  },
  {
    id: 8,
    name: 'Deadlift',
    description: 'Compound exercise for posterior chain development.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/deadlift-demo.mp4',
    muscleGroups: ['Back', 'Glutes', 'Hamstrings'],
    equipment: 'barbell',
    difficulty: 'advanced',
    category: 'strength',
    instructions: 'Stand over barbell, grip bar, lift by extending hips and knees.',
    tips: 'Keep the bar close to your body and maintain a neutral spine.'
  },
  {
    id: 9,
    name: 'Lunges',
    description: 'Unilateral leg exercise for balance and strength.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/lunges-demo.mp4',
    muscleGroups: ['Quads', 'Glutes', 'Hamstrings'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'strength',
    instructions: 'Step forward, lower back knee toward ground, return to start.',
    tips: 'Keep your front knee behind your toes and maintain upright posture.'
  },

  // Shoulder Exercises
  {
    id: 10,
    name: 'Overhead Press',
    description: 'Compound shoulder exercise with barbell.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/overhead-press-demo.mp4',
    muscleGroups: ['Shoulders', 'Triceps'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: 'Hold barbell at shoulder level, press overhead, lower with control.',
    tips: 'Keep your core tight and avoid excessive back arch.'
  },
  {
    id: 11,
    name: 'Lateral Raises',
    description: 'Isolation exercise for lateral deltoids.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/lateral-raises-demo.mp4',
    muscleGroups: ['Shoulders'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    category: 'strength',
    instructions: 'Hold dumbbells at sides, raise arms to shoulder level, lower with control.',
    tips: 'Keep slight bend in elbows and avoid swinging the weights.'
  },

  // Arm Exercises
  {
    id: 12,
    name: 'Bicep Curls',
    description: 'Isolation exercise for biceps development.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/bicep-curl-demo.mp4',
    muscleGroups: ['Biceps'],
    equipment: 'dumbbells',
    difficulty: 'beginner',
    category: 'strength',
    instructions: 'Hold dumbbells at sides, curl up to shoulders, lower with control.',
    tips: 'Keep your elbows at your sides and avoid swinging.'
  },
  {
    id: 13,
    name: 'Tricep Dips',
    description: 'Compound exercise for triceps and chest.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/tricep-dips-demo.mp4',
    muscleGroups: ['Triceps', 'Chest'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: 'Support body on parallel bars, lower body, push back up.',
    tips: 'Keep your elbows close to your body and avoid swinging.'
  },

  // Core Exercises
  {
    id: 14,
    name: 'Plank',
    description: 'Isometric core strength exercise.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/plank-demo.mp4',
    muscleGroups: ['Core', 'Abs'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'strength',
    instructions: 'Hold push-up position with straight body, maintain tension.',
    tips: 'Keep your body in a straight line from head to heels.'
  },
  {
    id: 15,
    name: 'Crunches',
    description: 'Basic abdominal exercise.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/crunches-demo.mp4',
    muscleGroups: ['Abs'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'strength',
    instructions: 'Lie on back, lift shoulders off ground, return to start.',
    tips: 'Focus on contracting your abs, not pulling with your neck.'
  },
  {
    id: 16,
    name: 'Russian Twists',
    description: 'Rotational core exercise.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/russian-twists-demo.mp4',
    muscleGroups: ['Core', 'Obliques'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: 'Sit with knees bent, lean back, rotate torso side to side.',
    tips: 'Keep your core engaged and move from your waist, not your arms.'
  },

  // Cardio Exercises
  {
    id: 17,
    name: 'Jumping Jacks',
    description: 'Full body cardio exercise.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/jumping-jacks-demo.mp4',
    muscleGroups: ['Full Body'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'cardio',
    instructions: 'Jump while raising arms and spreading legs, return to start.',
    tips: 'Land softly and maintain good posture throughout.'
  },
  {
    id: 18,
    name: 'Burpees',
    description: 'High-intensity full body exercise.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/burpees-demo.mp4',
    muscleGroups: ['Full Body'],
    equipment: 'bodyweight',
    difficulty: 'advanced',
    category: 'cardio',
    instructions: 'Squat, place hands on ground, jump feet back, do push-up, jump feet forward, jump up.',
    tips: 'Maintain good form even when fatigued.'
  },

  // Flexibility Exercises
  {
    id: 19,
    name: 'Cobra Stretch',
    description: 'Back flexibility and strength exercise.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/cobra-stretch-demo.mp4',
    muscleGroups: ['Back', 'Core'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'flexibility',
    instructions: 'Lie on stomach, press upper body up with arms, hold position.',
    tips: 'Keep your hips on the ground and breathe deeply.'
  },
  {
    id: 20,
    name: 'Child\'s Pose',
    description: 'Gentle back and hip stretch.',
    videoUrl: 'https://storage.googleapis.com/static.brio.dev/videos/childs-pose-demo.mp4',
    muscleGroups: ['Back', 'Hips'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'flexibility',
    instructions: 'Kneel, sit back on heels, reach arms forward, rest forehead on ground.',
    tips: 'Relax your entire body and breathe deeply.'
  }
];

export const workoutPlans = [
  {
    id: 1,
    name: 'Beginner Full Body',
    description: 'Perfect for those just starting their fitness journey',
    difficulty: 'beginner',
    duration: '4 weeks',
    workouts: [
      {
        name: 'Day 1 - Upper Body',
        exercises: [
          { exerciseId: 1, sets: 3, reps: 8, rest: 60 }, // Push Ups
          { exerciseId: 4, sets: 3, reps: 5, rest: 90 }, // Pull Ups
          { exerciseId: 12, sets: 3, reps: 10, rest: 60 }, // Bicep Curls
          { exerciseId: 13, sets: 3, reps: 8, rest: 60 }, // Tricep Dips
        ]
      },
      {
        name: 'Day 2 - Lower Body',
        exercises: [
          { exerciseId: 7, sets: 3, reps: 12, rest: 90 }, // Squats
          { exerciseId: 9, sets: 3, reps: 10, rest: 60 }, // Lunges
          { exerciseId: 14, sets: 3, reps: 30, rest: 60 }, // Plank (seconds)
        ]
      },
      {
        name: 'Day 3 - Core & Cardio',
        exercises: [
          { exerciseId: 15, sets: 3, reps: 15, rest: 45 }, // Crunches
          { exerciseId: 16, sets: 3, reps: 20, rest: 45 }, // Russian Twists
          { exerciseId: 17, sets: 3, reps: 30, rest: 60 }, // Jumping Jacks
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Intermediate Strength',
    description: 'Build muscle and strength with compound movements',
    difficulty: 'intermediate',
    duration: '6 weeks',
    workouts: [
      {
        name: 'Day 1 - Push',
        exercises: [
          { exerciseId: 2, sets: 4, reps: 8, rest: 120 }, // Bench Press
          { exerciseId: 3, sets: 3, reps: 12, rest: 90 }, // Dumbbell Flyes
          { exerciseId: 10, sets: 3, reps: 8, rest: 90 }, // Overhead Press
          { exerciseId: 11, sets: 3, reps: 12, rest: 60 }, // Lateral Raises
        ]
      },
      {
        name: 'Day 2 - Pull',
        exercises: [
          { exerciseId: 5, sets: 4, reps: 8, rest: 120 }, // Bent Over Rows
          { exerciseId: 6, sets: 3, reps: 12, rest: 90 }, // Lat Pulldowns
          { exerciseId: 12, sets: 3, reps: 12, rest: 60 }, // Bicep Curls
        ]
      },
      {
        name: 'Day 3 - Legs',
        exercises: [
          { exerciseId: 8, sets: 4, reps: 6, rest: 180 }, // Deadlift
          { exerciseId: 7, sets: 4, reps: 10, rest: 120 }, // Squats
          { exerciseId: 9, sets: 3, reps: 12, rest: 90 }, // Lunges
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Advanced Power',
    description: 'High-intensity training for experienced lifters',
    difficulty: 'advanced',
    duration: '8 weeks',
    workouts: [
      {
        name: 'Day 1 - Heavy Push',
        exercises: [
          { exerciseId: 2, sets: 5, reps: 5, rest: 180 }, // Bench Press
          { exerciseId: 10, sets: 4, reps: 6, rest: 120 }, // Overhead Press
          { exerciseId: 3, sets: 4, reps: 10, rest: 90 }, // Dumbbell Flyes
        ]
      },
      {
        name: 'Day 2 - Heavy Pull',
        exercises: [
          { exerciseId: 8, sets: 5, reps: 5, rest: 240 }, // Deadlift
          { exerciseId: 5, sets: 4, reps: 8, rest: 120 }, // Bent Over Rows
          { exerciseId: 4, sets: 4, reps: 8, rest: 120 }, // Pull Ups
        ]
      },
      {
        name: 'Day 3 - Legs & Core',
        exercises: [
          { exerciseId: 7, sets: 5, reps: 8, rest: 180 }, // Squats
          { exerciseId: 9, sets: 4, reps: 12, rest: 90 }, // Lunges
          { exerciseId: 14, sets: 4, reps: 60, rest: 90 }, // Plank
        ]
      }
    ]
  }
];

export const muscleGroups = [
  'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 
  'Quads', 'Glutes', 'Hamstrings', 'Core', 'Abs', 
  'Obliques', 'Full Body'
];

export const equipmentTypes = [
  'bodyweight', 'dumbbells', 'barbell', 'machine', 'cable'
];

export const difficultyLevels = [
  'beginner', 'intermediate', 'advanced'
];

export const workoutCategories = [
  'strength', 'cardio', 'flexibility', 'hiit'
]; 