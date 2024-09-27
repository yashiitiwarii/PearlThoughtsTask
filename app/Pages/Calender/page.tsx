'use client';

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const RecurringDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [recurringType, setRecurringType] = useState('none');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [monthlyDate, setMonthlyDate] = useState(1);
  const [weeklyDay, setWeeklyDay] = useState(0); // 0 = Sunday, 1 = Monday, etc.

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day) => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    setSelectedDate(newDate);
    setStartDate(newDate);
  };

  const handleRecurringTypeChange = (e) => {
    setRecurringType(e.target.value);
    if (e.target.value === 'monthly') {
      setMonthlyDate(selectedDate.getDate());
    } else if (e.target.value === 'weekly') {
      setWeeklyDay(selectedDate.getDay());
    }
  };

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      // days.push(<div key={empty-${i}} className="p-2"></div>);
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = i === selectedDate.getDate();
      days.push(
        <div
          key={i}
          onClick={() => handleDateClick(i)}
          className={`p-2 text-center cursor-pointer text-gray-600 hover:bg-gray-800 hover:text-gray-300 ${
            isSelected
              ? 'bg-gray-950 !text-white hover:bg-gray-950 hover:!text-gray-400 '
              : ''
          }`}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-gray-800 text-gray-400 p-4">
        <button
          onClick={prevMonth}
          className="p-1 bg-gray-700 hover:!border-gray-600 hover:!bg-gray-600 focus:outline-none"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">
          {selectedDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button
          onClick={nextMonth}
          className="p-1 bg-gray-700 hover:!border-gray-600 hover:!bg-gray-600 focus:outline-none"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 p-4">{renderCalendar()}</div>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center mb-4 text-gray-300">
          <Calendar className="mr-2" size={24} />
          <span className="font-semibold">
            Selected: {selectedDate.toDateString()}
          </span>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-400">
            Recurring Type:
          </label>
          <select
            value={recurringType}
            onChange={handleRecurringTypeChange}
            className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-200 focus:outline-none"
          >
            <option value="none" className="hover:bg-gray-500">
              None
            </option>
            <option value="daily" className="hover:bg-gray-500">
              Daily
            </option>
            <option value="weekly" className="hover:bg-gray-500">
              Weekly
            </option>
            <option value="monthly" className="hover:bg-gray-500">
              Monthly
            </option>
          </select>
        </div>
        {recurringType !== 'none' && (
          <div className="mb-4 text-gray-400">
            <label className="block mb-2 font-semibold">Start Date:</label>
            <input
              type="date"
              value={startDate.toISOString().split('T')[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-200"
            />
          </div>
        )}
        {recurringType === 'daily' && (
          <div className="mb-4 text-gray-400">
            <label className="block mb-2 font-semibold">End Date:</label>
            <input
              type="date"
              value={endDate.toISOString().split('T')[0]}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-200"
            />
          </div>
        )}
        {recurringType === 'monthly' && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-400">
              Day of Month:
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={monthlyDate}
              onChange={(e) => setMonthlyDate(parseInt(e.target.value))}
              className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-200"
            />
          </div>
        )}
        {recurringType === 'weekly' && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-400">
              Day of Week:
            </label>
            <select
              value={weeklyDay}
              onChange={(e) => setWeeklyDay(parseInt(e.target.value))}
              className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-200"
            >
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecurringDatePicker;
