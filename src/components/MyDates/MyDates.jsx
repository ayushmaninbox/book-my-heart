import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserId } from '../../utils/generateUserId';
import { formatCountdown } from '../../utils/formatCountdown';
import { getUserDates } from '../../lib/pocketbase';

const MyDates = () => {
  const [dates, setDates] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDates = async () => {
      try {
        const userId = getUserId();
        
        // FORCE CLEAR localStorage to prevent any persistence
        localStorage.removeItem('bookmyheart_dates');
        localStorage.removeItem('bookmyheart_localStorage_cleared');
        console.log('Force cleared all localStorage data');
        
        // Only load from PocketBase - no localStorage fallback
        let finalDates = [];
        
        try {
          finalDates = await getUserDates(userId);
          console.log('Loaded from PocketBase only:', finalDates.length, 'dates');
        } catch (error) {
          console.warn('PocketBase unavailable:', error);
          // Don't use localStorage as fallback anymore
          finalDates = [];
        }
        
        // Remove any duplicates based on ID (just in case)
        const uniqueDates = finalDates.filter((date, index, self) => 
          index === self.findIndex(d => d.id === date.id)
        );
        
        console.log('Final unique dates:', uniqueDates.length);
        setDates(uniqueDates);
      } catch (error) {
        console.error('Error loading dates:', error);
        setDates([]);
      } finally {
        setLoading(false);
      }
    };

    loadDates();
  }, []);

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

  const getDateTypeColor = (dateType) => {
    const colors = {
      'Game Night': 'bg-blue-100 text-blue-600',
      'Movie Night': 'bg-purple-100 text-purple-600',
      'Dinner Date': 'bg-pink-100 text-pink-600',
      'Coffee Chat': 'bg-amber-100 text-amber-600',
      'Study Session': 'bg-green-100 text-green-600',
      'Surprise Date': 'bg-red-100 text-red-600'
    };
    return colors[dateType] || 'bg-pink-100 text-pink-600';
  };

  const filteredDates = dates.filter(date => {
    const now = new Date();
    const dateTime = new Date(date.dateTime);
    
    if (filter === 'upcoming') return dateTime > now;
    if (filter === 'past') return dateTime <= now;
    return true;
  }).sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

  const copyInviteLink = (dateId) => {
    const inviteLink = `${window.location.origin}/invite/${dateId}`;
    navigator.clipboard.writeText(inviteLink);
    // You could add a toast notification here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">💖</div>
          <p className="text-gray-600">Loading your dates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl">💖</span>
          <span className="text-xl font-bold text-gray-800">BookMyHeart</span>
        </Link>
        <Link to="/plan" className="btn-primary">
          Plan New Date
        </Link>
      </header>

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Dates</h1>
          <p className="text-gray-600">All your planned romantic moments</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg">
            {['all', 'upcoming', 'past'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  filter === filterType
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-pink-500'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Debug Info */}
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-500">
            Showing {filteredDates.length} {filter} dates (Total: {dates.length}) - PocketBase Only
          </p>
        </div>

        {/* Dates Grid */}
        {filteredDates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No dates found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? "You haven't planned any dates yet" 
                : `No ${filter} dates found`}
            </p>
            <Link to="/plan" className="btn-primary">
              Plan Your First Date
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDates.map((date) => {
              const countdown = formatCountdown(date.dateTime);
              const dateTime = new Date(date.dateTime);
              
              return (
                <div key={date.id} className="card hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getDateTypeColor(date.dateType)}`}>
                      <span>{getDateTypeIcon(date.dateType)}</span>
                      <span className="font-medium">{date.dateType}</span>
                    </div>
                    <button
                      onClick={() => copyInviteLink(date.id)}
                      className="text-gray-400 hover:text-pink-500 transition-colors"
                      title="Copy invite link"
                    >
                      📋
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">With</p>
                      <p className="font-semibold text-gray-800">{date.partnerName}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">When</p>
                      <p className="font-medium text-gray-800">
                        {dateTime.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })} at {dateTime.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Message</p>
                      <p className="text-gray-800 italic text-sm">"{date.message}"</p>
                    </div>

                    {date.partnerEmail && (
                      <div className="bg-green-50 p-2 rounded-lg">
                        <p className="text-xs text-green-600">
                          ✉️ Invite sent to {date.partnerEmail}
                        </p>
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray-100">
                      {countdown.expired ? (
                        <span className="text-red-500 font-medium">Date has passed</span>
                      ) : (
                        <span className="text-pink-500 font-medium">{countdown.text}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-2">
                    <Link 
                      to={`/invite/${date.id}`}
                      className="flex-1 bg-pink-50 hover:bg-pink-100 text-pink-600 font-medium py-2 px-4 rounded-lg text-center transition-colors text-sm"
                    >
                      View Invite
                    </Link>
                    <a 
                      href={date.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-4 rounded-lg text-center transition-colors text-sm"
                    >
                      Join Call
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDates;