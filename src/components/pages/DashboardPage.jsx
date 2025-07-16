import React, { useState, useEffect } from 'react';
import { 
  BarChart2, Dumbbell, Bot, Weight, Ruler, Plus, Minus, 
  TrendingUp, Target, Clock, Award, Calendar, Play, Zap
} from 'lucide-react';
import { userProfile, workoutHistory, progressData } from '../../utils/storage';
import { exercises } from '../../data/exercises';
import StatCard from '../ui/StatCard';
import StatInputCard from '../ui/StatInputCard';
import HeightInputCard from '../ui/HeightInputCard';
import RecentWorkoutCard from '../ui/RecentWorkoutCard';
import QuickActionCard from '../ui/QuickActionCard';

const DashboardPage = () => {
  const [profile, setProfile] = useState(userProfile.get());
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [progressStats, setProgressStats] = useState({
    totalWorkouts: 0,
    totalVolume: 0,
    averageWorkoutDuration: 0,
    streakDays: 0
  });

  useEffect(() => {
    // Load recent workouts
    const history = workoutHistory.get();
    setRecentWorkouts(history.slice(0, 5));

    // Calculate progress stats
    const totalWorkouts = history.length;
    const totalVolume = history.reduce((sum, workout) => {
      return sum + workout.exercises.reduce((exerciseSum, exercise) => {
        return exerciseSum + (exercise.sets * exercise.reps * (exercise.weight || 1));
      }, 0);
    }, 0);

    const averageDuration = history.length > 0 
      ? history.reduce((sum, workout) => sum + (workout.duration || 0), 0) / history.length 
      : 0;

    // Calculate streak
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const hasWorkout = history.some(workout => {
        const workoutDate = new Date(workout.completedAt);
        return workoutDate.toDateString() === checkDate.toDateString();
      });
      if (hasWorkout) {
        streak++;
      } else {
        break;
      }
    }

    setProgressStats({
      totalWorkouts,
      totalVolume,
      averageWorkoutDuration: Math.round(averageDuration),
      streakDays: streak
    });
  }, []);

  const updateProfile = (updates) => {
    const updatedProfile = { ...profile, ...updates };
    setProfile(updatedProfile);
    userProfile.update(updates);
  };

  const quickActions = [
    {
      title: 'Start Workout',
      description: 'Begin a new training session',
      icon: <Play className="text-success-500" size={24} />,
      color: 'success',
      action: () => {/* Navigate to workout page */}
    },
    {
      title: 'View Progress',
      description: 'Check your fitness journey',
      icon: <TrendingUp className="text-primary-500" size={24} />,
      color: 'primary',
      action: () => {/* Navigate to progress page */}
    },
    {
      title: 'Schedule Workout',
      description: 'Plan your next session',
      icon: <Calendar className="text-warning-500" size={24} />,
      color: 'warning',
      action: () => {/* Navigate to calendar page */}
    },
    {
      title: 'Nutrition AI',
      description: 'Get personalized advice',
      icon: <Bot className="text-purple-500" size={24} />,
      color: 'purple',
      action: () => {/* Navigate to nutrition page */}
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary-500 mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's your fitness journey at a glance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<BarChart2 />} 
          title="Total Workouts" 
          value={progressStats.totalWorkouts} 
          unit="sessions" 
          color="primary" 
        />
        <StatCard 
          icon={<Dumbbell />} 
          title="Total Volume" 
          value={progressStats.totalVolume.toLocaleString()} 
          unit="lbs" 
          color="success" 
        />
        <StatCard 
          icon={<Clock />} 
          title="Avg Duration" 
          value={progressStats.averageWorkoutDuration} 
          unit="min" 
          color="warning" 
        />
        <StatCard 
          icon={<Award />} 
          title="Current Streak" 
          value={progressStats.streakDays} 
          unit="days" 
          color="purple" 
        />
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Your Stats</h2>
          <StatInputCard 
            icon={<Weight />}
            label="Body Weight (kg)" 
            value={profile.weight}
            onIncrement={() => updateProfile({ weight: profile.weight + 0.5 })}
            onDecrement={() => updateProfile({ weight: Math.max(30, profile.weight - 0.5) })}
          />
          <HeightInputCard 
            icon={<Ruler />}
            label="Height"
            height={profile.height}
            setHeight={(height) => updateProfile({ height })}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Workouts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Recent Workouts</h2>
        {recentWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentWorkouts.map((workout) => (
              <RecentWorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Dumbbell className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400">No workouts yet. Start your fitness journey today!</p>
          </div>
        )}
      </div>

      {/* Recent Exercises */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Recent Exercises</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {exercises.slice(0, 6).map(exercise => (
            <div 
              key={exercise.id} 
              className="exercise-card text-center group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                <Dumbbell size={24} className="text-white" />
              </div>
              <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover:text-primary-500 transition-colors">
                {exercise.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {exercise.muscleGroups[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 