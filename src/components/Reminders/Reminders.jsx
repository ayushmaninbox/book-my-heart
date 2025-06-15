import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserId } from '../../utils/generateUserId';
import { formatCountdown } from '../../utils/formatCountdown';

const Reminders = () => {
  const [upcomingDates, setUpcomingDates] = useState([]);
  const [emailReminders, setEmailReminders] = useState(false);

  useEffect(() => {
    const userId = getUserId();
    const allDates = JSON.parse(localStorage.getItem('bookmyheart_dates') || '[]');
    const userDates = allDates.filter(date => date.userId === userId);
    
    // Filter for upcoming dates only
    const now = new Date();
    const upcoming = userDates
      .filter(date => new Date(date.dateTime) > now)
      .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    
    setUpcomingDates(upcoming);

    // Load email reminder preference
    const emailPref = localStorage.getItem('bookmyheart_emailReminders') === 'true';
    setEmailReminders(emailPref);
  }, []);

  const toggleEmailReminders = () => {
    const newValue = !emailReminders;
    setEmailReminders(newValue);
    localStorage.setItem('bookmyheart_emailReminders', newValue.toString());
  };

  const getDateTypeIcon = (dateType) => {
    const icons = {
      'Game Night': '🎮',
      'Movie Night': '🎬',
      'Dinner Date': '🍽️',
      'Coffee Chat': '☕',
      'Study Session': '📚',
      'Surprise Date': '🎁'
    };
    return icons[dateType] || '💖';
  };

  const getUrgencyColor = (dateTime) => {
    const now = new Date();
    const target = new Date(dateTime);
    const hoursUntil = (target - now) / (1000 * 60 * 60);

    if (hoursUntil <= 24) return 'border-red-200 bg-red-50';
    if (hoursUntil <= 72) return 'border-orange-200 bg-orange-50';
    return 'border-green-200 bg-green-50';
  };

  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl">💖</span>
          <span className="text-xl font-bold text-gray-800">BookMyHeart</span>
        </Link>
        <div className="flex space-x-4">
          <Link to="/my-dates" className="btn-secondary">
            My Dates
          </Link>
          <Link to="/plan" className="btn-primary">
            Plan New Date
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Reminders</h1>
          <p className="text-gray-600">Never miss a special moment with your loved one</p>
        </div>

        {/* Email Reminder Settings */}
        <div className="card mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Email Reminders</h3>
              <p className="text-gray-600 text-sm">Get notified before your dates (coming soon)</p>
            </div>
            <button
              onClick={toggleEmailReminders}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailReminders ? 'bg-pink-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailReminders ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Upcoming Dates */}
        {upcomingDates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No upcoming dates</h3>
            <p className="text-gray-600 mb-6">Plan a new date to see reminders here</p>
            <Link to="/plan" className="btn-primary">
              Plan Your Next Date
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Dates</h2>
            
            {upcomingDates.map((date) => {
              const countdown = formatCountdown(date.dateTime);
              const dateTime = new Date(date.dateTime);
              
              return (
                <div 
                  key={date.id} 
                  className={`card border-l-4 ${getUrgencyColor(date.dateTime)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">
                        {getDateTypeIcon(date.dateType)}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {date.dateType} with {date.partnerName}
                        </h3>
                        <p className="text-gray-600">
                          {dateTime.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                          })} at {dateTime.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </p>
                        <p className="text-sm text-gray-500 italic">"{date.message}"</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-pink-600 mb-2">
                        {countdown.expired ? 'Now!' : countdown.text}
                      </div>
                      <div className="flex space-x-2">
                        <Link 
                          to={`/invite/${date.id}`}
                          className="bg-pink-100 hover:bg-pink-200 text-pink-600 font-medium py-1 px-3 rounded-lg text-sm transition-colors"
                        >
                          View Invite
                        </Link>
                        <a 
                          href={date.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium py-1 px-3 rounded-lg text-sm transition-colors"
                        >
                          Join Call
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Reminder Types Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl mb-3">🔔</div>
            <h3 className="font-semibold text-gray-800 mb-2">24 Hour Reminder</h3>
            <p className="text-gray-600 text-sm">Get notified one day before your date</p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl mb-3">⏰</div>
            <h3 className="font-semibold text-gray-800 mb-2">1 Hour Reminder</h3>
            <p className="text-gray-600 text-sm">Final reminder to get ready</p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl mb-3">💌</div>
            <h3 className="font-semibold text-gray-800 mb-2">Sweet Messages</h3>
            <p className="text-gray-600 text-sm">Romantic reminders to build excitement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;