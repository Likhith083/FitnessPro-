import React, { useState, useEffect } from 'react';
import { 
  Calendar, ChevronLeft, ChevronRight, Plus, Clock, 
  Target, CheckCircle, X, Edit, Trash2
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { workoutSchedule, workoutHistory } from '../../utils/storage';
import { workoutPlans } from '../../data/exercises';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    planId: null,
    time: '09:00',
    notes: ''
  });

  useEffect(() => {
    const savedSchedules = workoutSchedule.get();
    setSchedules(savedSchedules);
  }, []);

  // Calendar navigation
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Get calendar days
  const getCalendarDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  };

  // Check if date has workout
  const hasWorkout = (date) => {
    return schedules.some(schedule => {
      const scheduleDate = new Date(schedule.date);
      return isSameDay(scheduleDate, date);
    });
  };

  // Get workouts for selected date
  const getWorkoutsForDate = (date) => {
    return schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return isSameDay(scheduleDate, date);
    });
  };

  // Check if workout was completed
  const isWorkoutCompleted = (date) => {
    const history = workoutHistory.get();
    return history.some(workout => {
      const workoutDate = new Date(workout.completedAt);
      return isSameDay(workoutDate, date);
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowScheduleModal(true);
  };

  const handleSaveSchedule = () => {
    if (!newSchedule.title || !newSchedule.planId) return;

    const scheduleData = {
      ...newSchedule,
      date: selectedDate.toISOString(),
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    const updatedSchedules = [...schedules, scheduleData];
    setSchedules(updatedSchedules);
    workoutSchedule.add(scheduleData);
    
    setNewSchedule({
      title: '',
      planId: null,
      time: '09:00',
      notes: ''
    });
    setShowScheduleModal(false);
  };

  const handleDeleteSchedule = (scheduleId) => {
    const updatedSchedules = schedules.filter(s => s.id !== scheduleId);
    setSchedules(updatedSchedules);
    workoutSchedule.remove(scheduleId);
  };

  const getPlanName = (planId) => {
    const plan = workoutPlans.find(p => p.id === planId);
    return plan ? plan.name : 'Custom Workout';
  };

  const calendarDays = getCalendarDays();
  const selectedDateWorkouts = getWorkoutsForDate(selectedDate);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary-500 mb-2">Workout Calendar</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Schedule and track your fitness journey
        </p>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="card p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, new Date());
            const hasScheduledWorkout = hasWorkout(day);
            const isCompleted = isWorkoutCompleted(day);

            return (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                className={`calendar-day ${
                  !isCurrentMonth ? 'text-gray-400' : 'text-gray-900 dark:text-white'
                } ${
                  isToday ? 'today' : ''
                } ${
                  hasScheduledWorkout ? 'has-workout' : ''
                } ${
                  selectedDate && isSameDay(day, selectedDate) ? 'selected' : ''
                }`}
              >
                <div className="relative">
                  {format(day, 'd')}
                  {hasScheduledWorkout && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-success-500 rounded-full"></div>
                  )}
                  {isCompleted && (
                    <CheckCircle 
                      size={12} 
                      className="absolute -bottom-1 -right-1 text-success-500" 
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h3>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={16} /> Schedule Workout
            </button>
          </div>

          {selectedDateWorkouts.length > 0 ? (
            <div className="space-y-3">
              {selectedDateWorkouts.map(schedule => (
                <div key={schedule.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <Target size={20} className="text-primary-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {schedule.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getPlanName(schedule.planId)} • {schedule.time}
                      </p>
                      {schedule.notes && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {schedule.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Calendar size={48} className="mx-auto mb-4" />
              <p>No workouts scheduled for this date</p>
            </div>
          )}
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Schedule Workout
              </h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Workout Title
                </label>
                <input
                  type="text"
                  value={newSchedule.title}
                  onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
                  className="input-primary"
                  placeholder="Morning Workout"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Workout Plan
                </label>
                <select
                  value={newSchedule.planId || ''}
                  onChange={(e) => setNewSchedule({ ...newSchedule, planId: parseInt(e.target.value) || null })}
                  className="input-primary"
                >
                  <option value="">Select a plan</option>
                  {workoutPlans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} ({plan.difficulty})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                  className="input-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={newSchedule.notes}
                  onChange={(e) => setNewSchedule({ ...newSchedule, notes: e.target.value })}
                  className="input-primary"
                  rows={3}
                  placeholder="Any additional notes..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSchedule}
                  className="flex-1 btn-primary"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage; 