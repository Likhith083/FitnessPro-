import React, { useState, useRef, useEffect } from 'react';
import { Home, Dumbbell, TrendingUp, Calendar, Bot, Settings, Play, Plus, Minus, Award, CheckCircle, ChevronLeft, ChevronRight, Send, User, Download, Trash2, Search, Filter, Target, Clock, BookOpen, Ruler } from 'lucide-react';
import { loadFromStorage, saveToStorage, STORAGE_KEYS, clearAllData } from './utils/storage';
import { DEFAULT_EXERCISES, EXERCISE_CATEGORIES, MUSCLE_GROUPS, DIFFICULTY_LEVELS, getExercisesByCategory, getExercisesByMuscleGroup, searchExercises } from './data/exerciseLibrary';
import WorkoutTimer from './components/workout/WorkoutTimer';
import ExerciseCard from './components/workout/ExerciseCard';
import WorkoutSession from './components/workout/WorkoutSession';
import BodyMeasurements from './components/ui/BodyMeasurements';
import NutritionAI from './components/nutrition/NutritionAI';
import WorkoutTemplates from './components/workout/WorkoutTemplates';

export default function App() {
  // Real user data states with localStorage persistence
  const [exercises, setExercises] = useState(() => loadFromStorage(STORAGE_KEYS.EXERCISES, DEFAULT_EXERCISES));
  const [workoutHistory, setWorkoutHistory] = useState(() => loadFromStorage(STORAGE_KEYS.WORKOUT_HISTORY, []));
  const [scheduledWorkouts, setScheduledWorkouts] = useState(() => loadFromStorage(STORAGE_KEYS.SCHEDULED_WORKOUTS, []));
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workoutStats, setWorkoutStats] = useState({ sets: 3, reps: 12, weight: 25 });
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chatMessages, setChatMessages] = useState(() => loadFromStorage(STORAGE_KEYS.CHAT_MESSAGES, []));
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);
  const [appSettings, setAppSettings] = useState(() => loadFromStorage(STORAGE_KEYS.APP_SETTINGS, {
    theme: 'dark',
    notifications: true,
    autoStartTimer: true,
    soundEnabled: true,
    units: 'imperial'
  }));
  
  // New workout session states
  const [isInWorkoutSession, setIsInWorkoutSession] = useState(false);
  const [currentWorkoutExercise, setCurrentWorkoutExercise] = useState(null);
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showBodyMeasurements, setShowBodyMeasurements] = useState(false);
  const [showWorkoutTemplates, setShowWorkoutTemplates] = useState(false);
  
  // Template workout states
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [templateWorkoutHistory, setTemplateWorkoutHistory] = useState([]);

  // Theme switching effect
  useEffect(() => {
    if (appSettings.theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [appSettings.theme]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatMessages]);

  const handleSendMessage = () => {
    if (chatInput.trim() === '') return;

    const newMessages = [...chatMessages, { id: Date.now(), text: chatInput, sender: 'user' }];
    setChatMessages(newMessages);
    setChatInput('');

    // Mock AI response
    setTimeout(() => {
      const botResponse = "That's a great question! For a post-workout meal, I'd recommend a combination of protein and carbohydrates, like grilled chicken with quinoa or a protein shake with a banana. This helps repair muscles and replenish energy stores.";
      setChatMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 1200);
  };

  const handleSettingChange = (key, value) => {
    setAppSettings(prev => ({ ...prev, [key]: value }));
  };

  // Enhanced workout session management
  const handleStartWorkoutSession = (exercise) => {
    setCurrentWorkoutExercise(exercise);
    setIsInWorkoutSession(true);
  };

  const handleStartTemplate = (template) => {
    // Start template workout
    setCurrentTemplate(template);
    setCurrentExerciseIndex(0);
    setTemplateWorkoutHistory([]);
    setCurrentWorkoutExercise(template.exercises[0].exercise);
    setIsInWorkoutSession(true);
  };

  const handleNextExercise = (exerciseData = null) => {
    if (exerciseData) {
      // Save completed exercise data
      setTemplateWorkoutHistory(prev => [...prev, exerciseData]);
    }
    
    const nextIndex = currentExerciseIndex + 1;
    if (nextIndex < currentTemplate.exercises.length) {
      setCurrentExerciseIndex(nextIndex);
      setCurrentWorkoutExercise(currentTemplate.exercises[nextIndex].exercise);
    } else {
      // Template workout completed
      handleCompleteTemplateWorkout();
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      const prevIndex = currentExerciseIndex - 1;
      setCurrentExerciseIndex(prevIndex);
      setCurrentWorkoutExercise(currentTemplate.exercises[prevIndex].exercise);
    }
  };

  const handleCompleteTemplateWorkout = () => {
    // Combine all exercise data into one workout record
    const templateWorkout = {
      id: Date.now(),
      date: new Date().toISOString(),
      template: currentTemplate,
      exercises: templateWorkoutHistory,
      totalDuration: templateWorkoutHistory.reduce((sum, ex) => sum + (ex.totalDuration || 0), 0),
      completedAt: new Date().toISOString()
    };
    
    const updatedHistory = [...workoutHistory, templateWorkout];
    setWorkoutHistory(updatedHistory);
    saveToStorage(STORAGE_KEYS.WORKOUT_HISTORY, updatedHistory);
    
    // Reset template states
    setIsInWorkoutSession(false);
    setCurrentWorkoutExercise(null);
    setCurrentTemplate(null);
    setCurrentExerciseIndex(0);
    setTemplateWorkoutHistory([]);
  };

  const handleCompleteWorkout = (workoutData) => {
    const newWorkout = {
      id: Date.now(),
      date: new Date().toISOString(),
      exercise: workoutData.exercise,
      sets: workoutData.sets,
      totalDuration: workoutData.totalDuration,
      notes: workoutData.notes,
      completedAt: workoutData.completedAt
    };
    
    const updatedHistory = [...workoutHistory, newWorkout];
    setWorkoutHistory(updatedHistory);
    saveToStorage(STORAGE_KEYS.WORKOUT_HISTORY, updatedHistory);
    
    setIsInWorkoutSession(false);
    setCurrentWorkoutExercise(null);
    setSelectedExercise(null);
  };

  const handleCancelWorkout = () => {
    setIsInWorkoutSession(false);
    setCurrentWorkoutExercise(null);
    setCurrentTemplate(null);
    setCurrentExerciseIndex(0);
    setTemplateWorkoutHistory([]);
  };

  // Enhanced data persistence
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.EXERCISES, exercises);
  }, [exercises]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.WORKOUT_HISTORY, workoutHistory);
  }, [workoutHistory]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SCHEDULED_WORKOUTS, scheduledWorkouts);
  }, [scheduledWorkouts]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CHAT_MESSAGES, chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.APP_SETTINGS, appSettings);
  }, [appSettings]);

  // Safety confirmation for Reset All Data
  const handleResetAllData = () => {
    if (window.confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
      clearAllData();
      setExercises(DEFAULT_EXERCISES);
      setWorkoutHistory([]);
      setScheduledWorkouts([]);
      setChatMessages([]);
      setSelectedExercise(null);
      setWorkoutStats({ sets: 3, reps: 12, weight: 25 });
      setSelectedDate(new Date());
      setIsInWorkoutSession(false);
      setCurrentWorkoutExercise(null);
    }
  };

  // Filter exercises based on search and filters
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exerciseSearchQuery === '' || 
      exercise.name.toLowerCase().includes(exerciseSearchQuery.toLowerCase()) ||
      exercise.muscleGroups.some(group => group.toLowerCase().includes(exerciseSearchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesMuscleGroup = selectedMuscleGroup === 'all' || exercise.muscleGroups.includes(selectedMuscleGroup);
    const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesMuscleGroup && matchesDifficulty;
  });

  const renderPage = () => {
    // If in workout session, show workout session component
    if (isInWorkoutSession && currentWorkoutExercise) {
      return (
        <WorkoutSession
          exercise={currentWorkoutExercise}
          onComplete={currentTemplate ? handleCompleteTemplateWorkout : handleCompleteWorkout}
          onCancel={handleCancelWorkout}
          initialStats={workoutStats}
          template={currentTemplate}
          currentExerciseIndex={currentExerciseIndex}
          onNextExercise={handleNextExercise}
          onPreviousExercise={handlePreviousExercise}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        // Calculate stats from real workoutHistory
        const workoutsThisWeek = workoutHistory.filter(w => {
          const workoutDate = new Date(w.date);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return workoutDate >= weekAgo;
        });
        
        // Calculate total volume from sets data
        const totalVolume = workoutHistory.reduce((sum, w) => {
          if (w.template) {
            // Template workout - sum all exercises
            return sum + w.exercises.reduce((exerciseSum, exercise) => {
              if (exercise.sets && Array.isArray(exercise.sets)) {
                return exerciseSum + exercise.sets.reduce((setSum, set) => setSum + (set.weight || 0) * (set.reps || 0), 0);
              }
              return exerciseSum + (exercise.stats?.weight || 0) * (exercise.stats?.reps || 0) * (exercise.stats?.sets || 0);
            }, 0);
          } else if (w.sets && Array.isArray(w.sets)) {
            return sum + w.sets.reduce((setSum, set) => setSum + (set.weight || 0) * (set.reps || 0), 0);
          }
          return sum + (w.stats?.weight || 0) * (w.stats?.reps || 0) * (w.stats?.sets || 0);
        }, 0);
        
        const avgDuration = workoutHistory.length > 0 ? Math.round(workoutHistory.reduce((sum, w) => sum + (w.totalDuration || 45), 0) / workoutHistory.length) : 0;
        
        // Calculate streak
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 30; i++) {
          const checkDate = new Date(today);
          checkDate.setDate(today.getDate() - i);
          const hasWorkout = workoutHistory.some(w => {
            const workoutDate = new Date(w.date);
            return workoutDate.toDateString() === checkDate.toDateString();
          });
          if (hasWorkout) {
            streak++;
          } else {
            break;
          }
        }
        return (
          <div>
            <h1 className="text-4xl font-bold mb-4">FitnessPro+</h1>
            <p className="text-gray-400">Your fitness journey starts here.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Workouts This Week</p>
                    <p className="text-3xl font-bold text-white">{workoutsThisWeek.length} <span className="text-lg font-normal text-gray-300">sessions</span></p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500">
                    <Home size={24} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Volume</p>
                    <p className="text-3xl font-bold text-white">{totalVolume} <span className="text-lg font-normal text-gray-300">lbs</span></p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-teal-500">
                    <Dumbbell size={24} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Duration</p>
                    <p className="text-3xl font-bold text-white">{avgDuration} <span className="text-lg font-normal text-gray-300">min</span></p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500">
                    <TrendingUp size={24} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Current Streak</p>
                    <p className="text-3xl font-bold text-white">{streak} <span className="text-lg font-normal text-gray-300">days</span></p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500">
                    <Settings size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
            {/* Recent Workouts */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-200 mb-4">Recent Workouts</h2>
              {workoutHistory.length === 0 ? (
                <div className="text-gray-400">No workouts yet! Start your first workout.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workoutHistory.slice(-3).reverse().map(w => (
                    <div key={w.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-all duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-cyan-400">{w.exercise?.name || 'Workout'}</h3>
                        <span className="text-sm text-gray-400">{new Date(w.date).toLocaleDateString()}</span>
                      </div>
                      {w.template ? (
                        <div className="space-y-1">
                          <p className="text-sm text-gray-400">{w.template.name} - {w.exercises.length} exercises</p>
                          <p className="text-sm text-gray-400">
                            Total: {w.exercises.reduce((sum, exercise) => {
                              if (exercise.sets && Array.isArray(exercise.sets)) {
                                return sum + exercise.sets.reduce((setSum, set) => setSum + (set.weight || 0) * (set.reps || 0), 0);
                              }
                              return sum + (exercise.stats?.weight || 0) * (exercise.stats?.reps || 0) * (exercise.stats?.sets || 0);
                            }, 0)} lbs volume
                          </p>
                        </div>
                      ) : w.sets && Array.isArray(w.sets) ? (
                        <div className="space-y-1">
                          <p className="text-sm text-gray-400">{w.sets.length} sets completed</p>
                          <p className="text-sm text-gray-400">
                            Total: {w.sets.reduce((sum, set) => sum + (set.weight || 0) * (set.reps || 0), 0)} lbs volume
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400">Sets: {w.stats?.sets}, Reps: {w.stats?.reps}, Weight: {w.stats?.weight} lbs</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'workout':
        return (
          <div>
            <h1 className="text-4xl font-bold mb-4">Workout</h1>
            <p className="text-gray-400">Choose your workout plan.</p>
            
            {/* Workout Options */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mt-8 mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <button
                  onClick={() => setShowWorkoutTemplates(!showWorkoutTemplates)}
                  className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                    showWorkoutTemplates
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <BookOpen size={20} />
                  {showWorkoutTemplates ? 'Hide Templates' : 'Show Templates'}
                </button>
              </div>
            </div>

            {showWorkoutTemplates ? (
              <WorkoutTemplates onStartTemplate={handleStartTemplate} />
            ) : (
              <>
                {/* Search and Filters */}
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="Search exercises..."
                          value={exerciseSearchQuery}
                          onChange={(e) => setExerciseSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="all">All Categories</option>
                        {Object.values(EXERCISE_CATEGORIES).map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <select
                        value={selectedMuscleGroup}
                        onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                        className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="all">All Muscles</option>
                        {Object.values(MUSCLE_GROUPS).map(muscle => (
                          <option key={muscle} value={muscle}>{muscle}</option>
                        ))}
                      </select>
                      <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="all">All Levels</option>
                        {Object.values(DIFFICULTY_LEVELS).map(difficulty => (
                          <option key={difficulty} value={difficulty}>{difficulty}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Exercise Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredExercises.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-400">
                      <Dumbbell size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No exercises found matching your criteria.</p>
                    </div>
                  ) : (
                    filteredExercises.map(exercise => (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        isSelected={selectedExercise?.id === exercise.id}
                        onSelect={setSelectedExercise}
                        onStartWorkout={handleStartWorkoutSession}
                        showDetails={true}
                      />
                    ))
                  )}
                </div>

                {/* Selected Exercise Details */}
                {selectedExercise && (
                  <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">Selected Exercise</h2>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{selectedExercise.name}</h3>
                        <p className="text-gray-300 mb-3">{selectedExercise.muscleGroups.join(', ')}</p>
                        <div className="flex gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedExercise.difficulty === 'beginner' ? 'bg-green-500/20 text-green-300' :
                            selectedExercise.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {selectedExercise.difficulty}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                            {selectedExercise.category}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleStartWorkoutSession(selectedExercise)}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                      >
                        <Play size={20} />
                        Start Workout
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        );
      case 'progress':
        // Calculate stats from real workoutHistory with new data structure
        const progressStats = {
          totalWorkouts: workoutHistory.length,
          totalVolume: workoutHistory.reduce((sum, w) => {
            if (w.template) {
              return sum + w.exercises.reduce((exerciseSum, exercise) => {
                if (exercise.sets && Array.isArray(exercise.sets)) {
                  return exerciseSum + exercise.sets.reduce((setSum, set) => setSum + (set.weight || 0) * (set.reps || 0), 0);
                }
                return exerciseSum + (exercise.stats?.weight || 0) * (exercise.stats?.reps || 0) * (exercise.stats?.sets || 0);
              }, 0);
            } else if (w.sets && Array.isArray(w.sets)) {
              return sum + w.sets.reduce((setSum, set) => setSum + (set.weight || 0) * (set.reps || 0), 0);
            }
            return sum + (w.stats?.weight || 0) * (w.stats?.reps || 0) * (w.stats?.sets || 0);
          }, 0),
          totalDuration: workoutHistory.reduce((sum, w) => sum + (w.totalDuration || 45), 0),
          totalCalories: workoutHistory.reduce((sum, w) => sum + (w.stats?.calories || 0), 0),
        };
        return (
          <div>
            <h1 className="text-4xl font-bold mb-4">Progress</h1>
            <p className="text-gray-400">Track your fitness journey and achievements.</p>
            {/* Timeframe Selector */}
            <div className="flex gap-2 mb-8 mt-8">
              {[
                { id: 'week', label: 'This Week' },
                { id: 'month', label: 'This Month' },
                { id: 'year', label: 'This Year' }
              ].map(timeframe => (
                <button
                  key={timeframe.id}
                  onClick={() => setSelectedTimeframe(timeframe.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTimeframe === timeframe.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Workouts</p>
                    <p className="text-3xl font-bold text-white">{progressStats.totalWorkouts} <span className="text-lg font-normal text-gray-300">sessions</span></p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-teal-500">
                    <TrendingUp size={24} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Volume</p>
                    <p className="text-3xl font-bold text-white">{progressStats.totalVolume} <span className="text-lg font-normal text-gray-300">lbs</span></p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500">
                    <Dumbbell size={24} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-3xl font-bold text-white">{progressStats.totalDuration} <span className="text-lg font-normal text-gray-300">min</span></p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500">
                    <Calendar size={24} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Calories</p>
                    <p className="text-3xl font-bold text-white">{progressStats.totalCalories} <span className="text-lg font-normal text-gray-300">cal</span></p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                    <Award size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Workout Activity Chart */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-8">
              <h2 className="text-2xl font-bold text-gray-200 mb-4">Workout Activity</h2>
              {workoutHistory.length === 0 ? (
                <div className="text-gray-400">No workouts yet! Start your first workout.</div>
              ) : (
                <div className="h-64 flex items-end justify-between gap-2">
                  {workoutHistory.slice(-7).map((workout, index) => {
                    const workoutVolume = workout.sets && Array.isArray(workout.sets) 
                      ? workout.sets.reduce((sum, set) => sum + (set.weight || 0) * (set.reps || 0), 0)
                      : (workout.stats?.weight || 0) * (workout.stats?.reps || 0) * (workout.stats?.sets || 0);
                    
                    const maxVolume = Math.max(...workoutHistory.map(w => {
                      if (w.sets && Array.isArray(w.sets)) {
                        return w.sets.reduce((sum, set) => sum + (set.weight || 0) * (set.reps || 0), 0);
                      }
                      return (w.stats?.weight || 0) * (w.stats?.reps || 0) * (w.stats?.sets || 0);
                    }));
                    
                    const height = maxVolume > 0 ? (workoutVolume / maxVolume) * 100 : 0;
                    return (
                      <div key={workout.id} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                          style={{ height: `${height}%` }}
                        />
                        <div className="text-xs text-gray-400 mt-2 text-center">
                          {new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Achievements */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-gray-200 mb-4">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 1, title: 'First Workout', description: 'Complete your first workout', achieved: true, icon: <CheckCircle /> },
                  { id: 2, title: 'Week Warrior', description: 'Complete 3 workouts in a week', achieved: true, icon: <Award /> },
                  { id: 3, title: 'Volume Master', description: 'Lift 10,000 lbs total', achieved: true, icon: <Dumbbell /> },
                  { id: 4, title: 'Consistency King', description: 'Workout 5 days in a row', achieved: false, icon: <TrendingUp /> }
                ].map(achievement => (
                  <div 
                    key={achievement.id} 
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      achievement.achieved 
                        ? 'bg-green-500/20 border-green-500 text-green-300' 
                        : 'bg-gray-700/50 border-gray-600 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        achievement.achieved ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm opacity-75">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div>
            <h1 className="text-4xl font-bold mb-4">Calendar</h1>
            <p className="text-gray-400">Schedule and plan your workouts.</p>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-200">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-6">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-gray-400 font-semibold">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {(() => {
                  const year = selectedDate.getFullYear();
                  const month = selectedDate.getMonth();
                  const firstDay = new Date(year, month, 1);
                  const lastDay = new Date(year, month + 1, 0);
                  const daysInMonth = lastDay.getDate();
                  const startingDay = firstDay.getDay();

                  const days = [];
                  for (let i = 0; i < startingDay; i++) {
                    days.push(null);
                  }
                  for (let i = 1; i <= daysInMonth; i++) {
                    days.push(new Date(year, month, i));
                  }

                  return days.map((day, index) => (
                    <div key={index} className="aspect-square">
                      {day ? (
                        <button
                          onClick={() => setSelectedDate(day)}
                          className={`w-full h-full p-2 rounded-lg transition-all duration-200 ${
                            day.toDateString() === new Date().toDateString()
                              ? 'bg-blue-500 text-white'
                              : scheduledWorkouts.some(workout => workout.date === day.toISOString().split('T')[0])
                              ? 'bg-green-500/20 border border-green-500 text-green-300'
                              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                          }`}
                        >
                          <div className="text-sm font-semibold">{day.getDate()}</div>
                          {scheduledWorkouts.some(workout => workout.date === day.toISOString().split('T')[0]) && (
                            <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1"></div>
                          )}
                        </button>
                      ) : (
                        <div className="w-full h-full"></div>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* Selected Date Workout */}
            {(() => {
              const selectedDateString = selectedDate.toISOString().split('T')[0];
              const workoutForDate = scheduledWorkouts.find(workout => workout.date === selectedDateString);
              
              return workoutForDate ? (
                <div className="mt-6 bg-gray-800 rounded-2xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-gray-200 mb-4">
                    Workout for {selectedDate.toLocaleDateString()}
                  </h3>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-semibold text-green-400">
                        {workoutForDate.type} Workout
                      </span>
                    </div>
                    <div className="space-y-2">
                      {workoutForDate.exercises.map((exercise, index) => (
                        <div key={index} className="flex items-center gap-3 text-gray-300">
                          <Dumbbell size={16} className="text-gray-400" />
                          <span>{exercise}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        );
      case 'nutrition':
        return (
          <NutritionAI
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            chatEndRef={chatEndRef}
          />
        );
      case 'settings':
        return (
          <div>
            <h1 className="text-4xl font-bold mb-4">Settings</h1>
            <p className="text-gray-400">Customize your app preferences.</p>

            {showBodyMeasurements ? (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-200">Body Measurements</h2>
                  <button
                    onClick={() => setShowBodyMeasurements(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ← Back to Settings
                  </button>
                </div>
                <BodyMeasurements />
              </div>
            ) : (
              <div className="space-y-6 mt-8">
              {/* App Settings */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-gray-200 mb-4">App Settings</h2>
                <div className="space-y-4">
                  {/* Dark Theme Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-200 dark:text-gray-200 text-gray-900">Dark Theme</h3>
                      <p className="text-sm text-gray-400 dark:text-gray-400 text-gray-500">Use dark mode</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('theme', appSettings.theme === 'dark' ? 'light' : 'dark')}
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        appSettings.theme === 'dark' ? 'bg-purple-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full transition-all duration-200 ${
                        appSettings.theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-200">Notifications</h3>
                      <p className="text-sm text-gray-400">Receive workout reminders</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('notifications', !appSettings.notifications)}
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        appSettings.notifications ? 'bg-green-500' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full transition-all duration-200 ${
                        appSettings.notifications ? 'translate-x-6' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-200">Auto-start Timer</h3>
                      <p className="text-sm text-gray-400">Automatically start rest timer</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('autoStartTimer', !appSettings.autoStartTimer)}
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        appSettings.autoStartTimer ? 'bg-green-500' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full transition-all duration-200 ${
                        appSettings.autoStartTimer ? 'translate-x-6' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-200">Sound Effects</h3>
                      <p className="text-sm text-gray-400">Play workout sounds</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('soundEnabled', !appSettings.soundEnabled)}
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        appSettings.soundEnabled ? 'bg-green-500' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full transition-all duration-200 ${
                        appSettings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Units */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-gray-200 mb-4">Units</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="units"
                      value="imperial"
                      checked={appSettings.units === 'imperial'}
                      onChange={(e) => handleSettingChange('units', e.target.value)}
                      className="text-purple-500"
                    />
                    <span className="text-gray-200">Imperial (lbs, feet)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="units"
                      value="metric"
                      checked={appSettings.units === 'metric'}
                      onChange={(e) => handleSettingChange('units', e.target.value)}
                      className="text-purple-500"
                    />
                    <span className="text-gray-200">Metric (kg, cm)</span>
                  </label>
                </div>
              </div>

              {/* Body Measurements */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-gray-200 mb-4">Body Measurements</h2>
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowBodyMeasurements(true)} 
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Ruler size={20} />
                    Track Body Measurements
                  </button>
                </div>
              </div>

              {/* Data Management */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-gray-200 mb-4">Data Management</h2>
                <div className="space-y-3">
                  <button onClick={handleResetAllData} className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                    <Trash2 size={20} />
                    Reset All Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
      default:
        return <div>Page not found</div>;
    }
  };

  const navItems = [
    { id: 'home', icon: <Home size={20} />, label: 'Dashboard' },
    { id: 'workout', icon: <Dumbbell size={20} />, label: 'Workout' },
    { id: 'progress', icon: <TrendingUp size={20} />, label: 'Progress' },
    { id: 'calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { id: 'nutrition', icon: <Bot size={20} />, label: 'Nutrition' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className={`bg-gray-900 text-white font-sans w-full min-h-screen flex flex-col transition-colors duration-300 ${appSettings.theme === 'dark' ? 'dark' : 'light bg-white text-gray-900'}`}>
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        {renderPage()}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 left-0 right-0 bg-gray-900/80 dark:bg-gray-900/80 bg-white/80 backdrop-blur-sm border-t border-gray-700 dark:border-gray-700 border-gray-200">
        <div className="flex justify-around max-w-lg mx-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center justify-center w-full py-3 transition-colors duration-300 ${
                currentPage === item.id ? 'text-cyan-400 dark:text-cyan-400 text-blue-600' : 'text-gray-400 dark:text-gray-400 text-gray-500 hover:text-black dark:hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
} 