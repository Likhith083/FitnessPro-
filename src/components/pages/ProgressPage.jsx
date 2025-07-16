import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, BarChart2, Target, Award, Calendar, 
  Weight, Ruler, Activity, Clock, Zap
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { progressData, workoutHistory, userProfile } from '../../utils/storage';
import { formatDate } from '../../utils/storage';

const ProgressPage = () => {
  const [progress, setProgress] = useState(progressData.get());
  const [workoutHistoryData, setWorkoutHistoryData] = useState([]);
  const [profile, setProfile] = useState(userProfile.get());
  const [selectedTimeframe, setSelectedTimeframe] = useState('month'); // week, month, year
  const [selectedMetric, setSelectedMetric] = useState('workouts'); // workouts, volume, weight

  useEffect(() => {
    const history = workoutHistory.get();
    setWorkoutHistoryData(history);
  }, []);

  // Calculate progress statistics
  const getProgressStats = () => {
    const now = new Date();
    const timeframeMap = {
      week: 7,
      month: 30,
      year: 365
    };
    const daysBack = timeframeMap[selectedTimeframe];
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - daysBack);

    const filteredHistory = workoutHistoryData.filter(workout => {
      const workoutDate = new Date(workout.completedAt);
      return workoutDate >= startDate;
    });

    const totalWorkouts = filteredHistory.length;
    const totalVolume = filteredHistory.reduce((sum, workout) => {
      return sum + workout.exercises.reduce((exerciseSum, exercise) => {
        return exerciseSum + (exercise.sets * exercise.reps * (exercise.weight || 1));
      }, 0);
    }, 0);

    const averageDuration = filteredHistory.length > 0 
      ? filteredHistory.reduce((sum, workout) => sum + (workout.duration || 0), 0) / filteredHistory.length 
      : 0;

    return {
      totalWorkouts,
      totalVolume,
      averageDuration: Math.round(averageDuration),
      improvement: calculateImprovement(filteredHistory)
    };
  };

  const calculateImprovement = (workouts) => {
    if (workouts.length < 2) return 0;
    
    const recentWorkouts = workouts.slice(-5);
    const olderWorkouts = workouts.slice(0, 5);
    
    const recentAvg = recentWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) / recentWorkouts.length;
    const olderAvg = olderWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) / olderWorkouts.length;
    
    if (olderAvg === 0) return 0;
    return ((recentAvg - olderAvg) / olderAvg) * 100;
  };

  // Prepare chart data
  const getChartData = () => {
    const now = new Date();
    const timeframeMap = {
      week: 7,
      month: 30,
      year: 365
    };
    const daysBack = timeframeMap[selectedTimeframe];
    const data = [];

    for (let i = daysBack - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      
      const dayWorkouts = workoutHistoryData.filter(workout => {
        const workoutDate = new Date(workout.completedAt);
        return workoutDate.toDateString() === date.toDateString();
      });

      const volume = dayWorkouts.reduce((sum, workout) => {
        return sum + workout.exercises.reduce((exerciseSum, exercise) => {
          return exerciseSum + (exercise.sets * exercise.reps * (exercise.weight || 1));
        }, 0);
      }, 0);

      data.push({
        date: formatDate(date),
        workouts: dayWorkouts.length,
        volume: volume,
        duration: dayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0)
      });
    }

    return data;
  };

  // Weight progress data
  const getWeightData = () => {
    return progress.weight.map(entry => ({
      date: formatDate(new Date(entry.date)),
      weight: entry.weight
    }));
  };

  // Muscle group distribution
  const getMuscleGroupData = () => {
    const muscleGroups = {};
    workoutHistoryData.forEach(workout => {
      workout.exercises.forEach(exercise => {
        // This would need to be enhanced with actual exercise data
        const group = 'Full Body'; // Placeholder
        muscleGroups[group] = (muscleGroups[group] || 0) + 1;
      });
    });

    return Object.entries(muscleGroups).map(([name, value]) => ({
      name,
      value
    }));
  };

  const stats = getProgressStats();
  const chartData = getChartData();
  const weightData = getWeightData();
  const muscleData = getMuscleGroupData();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary-500 mb-2">Progress Tracking</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor your fitness journey and celebrate your achievements
        </p>
      </div>

      {/* Timeframe Selector */}
      <div className="flex items-center gap-4">
        <span className="text-gray-700 dark:text-gray-300 font-medium">Timeframe:</span>
        <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
          {['week', 'month', 'year'].map(timeframe => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 text-center">
          <TrendingUp className="mx-auto text-primary-500 mb-3" size={32} />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalWorkouts}</h3>
          <p className="text-gray-600 dark:text-gray-400">Workouts</p>
        </div>
        
        <div className="card p-6 text-center">
          <BarChart2 className="mx-auto text-success-500 mb-3" size={32} />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.totalVolume.toLocaleString()}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Total Volume (lbs)</p>
        </div>
        
        <div className="card p-6 text-center">
          <Clock className="mx-auto text-warning-500 mb-3" size={32} />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageDuration}</h3>
          <p className="text-gray-600 dark:text-gray-400">Avg Duration (min)</p>
        </div>
        
        <div className="card p-6 text-center">
          <Award className="mx-auto text-purple-500 mb-3" size={32} />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.improvement > 0 ? '+' : ''}{stats.improvement.toFixed(1)}%
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Improvement</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Workout Activity Chart */}
        <div className="card p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Workout Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="workouts" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Volume Progress Chart */}
        <div className="card p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Volume Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weight Tracking */}
      {weightData.length > 0 && (
        <div className="card p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Weight Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Muscle Group Distribution */}
      {muscleData.length > 0 && (
        <div className="card p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Workout Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={muscleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {muscleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent Achievements */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workoutHistoryData.slice(0, 6).map((workout, index) => (
            <div key={workout.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success-500/20 rounded-full flex items-center justify-center">
                  <Zap size={20} className="text-success-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {workout.name || 'Workout'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(workout.completedAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage; 