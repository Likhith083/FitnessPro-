import React, { useState, useEffect } from 'react';
import { Ruler, TrendingUp, Save, Plus, Minus } from 'lucide-react';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../../utils/storage';

const BodyMeasurements = () => {
  const [measurements, setMeasurements] = useState(() => loadFromStorage(STORAGE_KEYS.BODY_MEASUREMENTS, []));
  const [newMeasurement, setNewMeasurement] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    biceps: '',
    thighs: '',
    calves: '',
    bodyFat: '',
    notes: ''
  });

  const measurementFields = [
    { key: 'weight', label: 'Weight (lbs)', icon: '⚖️' },
    { key: 'chest', label: 'Chest (in)', icon: '💪' },
    { key: 'waist', label: 'Waist (in)', icon: '📏' },
    { key: 'hips', label: 'Hips (in)', icon: '📐' },
    { key: 'biceps', label: 'Biceps (in)', icon: '💪' },
    { key: 'thighs', label: 'Thighs (in)', icon: '🦵' },
    { key: 'calves', label: 'Calves (in)', icon: '🦵' },
    { key: 'bodyFat', label: 'Body Fat %', icon: '📊' }
  ];

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BODY_MEASUREMENTS, measurements);
  }, [measurements]);

  const handleInputChange = (key, value) => {
    setNewMeasurement(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveMeasurement = () => {
    if (!newMeasurement.weight) return;

    const measurement = {
      id: Date.now(),
      ...newMeasurement,
      timestamp: new Date().toISOString()
    };

    setMeasurements(prev => [measurement, ...prev]);
    setNewMeasurement({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      chest: '',
      waist: '',
      hips: '',
      biceps: '',
      thighs: '',
      calves: '',
      bodyFat: '',
      notes: ''
    });
  };

  const handleDeleteMeasurement = (id) => {
    if (window.confirm('Are you sure you want to delete this measurement?')) {
      setMeasurements(prev => prev.filter(m => m.id !== id));
    }
  };

  const getTrend = (current, previous) => {
    if (!current || !previous) return 'neutral';
    const diff = parseFloat(current) - parseFloat(previous);
    if (diff > 0) return 'up';
    if (diff < 0) return 'down';
    return 'neutral';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* New Measurement Form */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
          <Ruler size={20} />
          Add New Measurement
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {measurementFields.map(field => (
            <div key={field.key}>
              <label className="text-sm text-gray-400 mb-1 block">{field.label}</label>
              <input
                type="number"
                step="0.1"
                value={newMeasurement[field.key]}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="0.0"
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-400 mb-1 block">Notes</label>
          <textarea
            value={newMeasurement.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            rows={3}
            placeholder="Add any notes about your measurements..."
          />
        </div>

        <button
          onClick={handleSaveMeasurement}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <Save size={16} />
          Save Measurement
        </button>
      </div>

      {/* Measurement History */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
          <TrendingUp size={20} />
          Measurement History
        </h2>

        {measurements.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Ruler size={48} className="mx-auto mb-4 opacity-50" />
            <p>No measurements recorded yet.</p>
            <p className="text-sm">Add your first measurement above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {measurements.map((measurement, index) => {
              const previousMeasurement = measurements[index + 1];
              return (
                <div key={measurement.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{formatDate(measurement.date)}</h3>
                      <p className="text-sm text-gray-400">{measurement.notes}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteMeasurement(measurement.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {measurementFields.map(field => {
                      const value = measurement[field.key];
                      const previousValue = previousMeasurement?.[field.key];
                      const trend = getTrend(value, previousValue);
                      
                      return (
                        <div key={field.key} className="text-center">
                          <div className="text-xs text-gray-400 mb-1">{field.label}</div>
                          <div className="flex items-center justify-center gap-1">
                            {value && (
                              <span className="text-white font-semibold">{value}</span>
                            )}
                            {trend !== 'neutral' && previousValue && (
                              <span className={`text-xs ${
                                trend === 'up' ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {trend === 'up' ? '↗' : '↘'}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Progress Summary */}
      {measurements.length >= 2 && (
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-gray-200 mb-4">Progress Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {measurementFields.slice(0, 4).map(field => {
              const latest = measurements[0]?.[field.key];
              const earliest = measurements[measurements.length - 1]?.[field.key];
              const change = latest && earliest ? parseFloat(latest) - parseFloat(earliest) : 0;
              
              return (
                <div key={field.key} className="text-center">
                  <div className="text-sm text-gray-400 mb-1">{field.label}</div>
                  <div className="text-lg font-bold text-white">{latest || 'N/A'}</div>
                  {change !== 0 && (
                    <div className={`text-xs ${
                      change > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {change > 0 ? '+' : ''}{change.toFixed(1)} total
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyMeasurements; 