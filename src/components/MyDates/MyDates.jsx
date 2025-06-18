import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserId } from '../../utils/generateUserId';
import { formatCountdown } from '../../utils/formatCountdown';
import { getUserDates } from '../../lib/supabase';

const MyDates = () => {
  const [dates, setDates] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDates = async () => {
      try {
        const userId = getUserId();
        
        // Clear localStorage data (migrating to Supabase)
        localStorage.removeItem('bookmyheart_dates');
        localStorage.removeItem('bookmyheart_localStorage_cleared');
        console.log('Cleared localStorage data - now using Supabase');
        
        let finalDates = [];
        
        try {
          finalDates = await getUserDates(userId);
          console.log('Loaded from Supabase:', finalDates.length, 'dates');
        } catch (error) {
          console.warn('Supabase unavailable:', error);
          finalDates = [];
        }
        
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
      'Game Night': 'bg-blue-100 text-blue-600 border-blue-200',
      'Movie Night': 'bg-purple-100 text-purple-600 border-purple-200',
      'Dinner Date': 'bg-pink-100 text-pink-600 border-pink-200',
      'Coffee Chat': 'bg-amber-100 text-amber-600 border-amber-200',
      'Study Session': 'bg-green-100 text-green-600 border-green-200',
      'Surprise Date': 'bg-red-100 text-red-600 border-red-200'
    };
    return colors[dateType] || 'bg-pink-100 text-pink-600 border-pink-200';
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
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="floating-elements">
          <div className="floating-element">💖</div>
          <div className="floating-element">✨</div>
          <div className="floating-element">💕</div>
        </div>
        <div className="text-center relative z-10">
          <div className="text-8xl mb-6 animate-pulse">💖</div>
          <p className="text-xl text-gray-600 handwriting">Loading your love stories...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element">💕</div>
        <div className="floating-element">✨</div>
        <div className="floating-element">💖</div>
        <div className="floating-element">🌙</div>
        <div className="floating-element">⭐</div>
        <div className="floating-element">💫</div>
        <div className="floating-element">🦋</div>
        <div className="floating-element">🌸</div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-8 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">💖</span>
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              BookMyHeart
            </span>
            <p className="text-sm text-gray-500 handwriting">your love timeline</p>
          </div>
        </Link>
        <Link to="/plan" className="btn-primary">
          <span className="mr-2">💕</span>
          Plan New Date
        </Link>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 handwriting">My Love Stories</h1>
          <p className="text-xl text-gray-600">All your magical moments, past and future ✨</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-xl border border-white/50">
            {[
              { key: 'all', label: 'All Dates', icon: '💖' },
              { key: 'upcoming', label: 'Upcoming', icon: '🚀' },
              { key: 'past', label: 'Memories', icon: '📸' }
            ].map((filterType) => (
              <button
                key={filterType.key}
                onClick={() => setFilter(filterType.key)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  filter === filterType.key
                    ? 'bg-gradient-to-r from-rose-400 to-purple-400 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-rose-500 hover:bg-white/50'
                }`}
              >
                <span className="mr-2">{filterType.icon}</span>
                {filterType.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="card text-center bg-gradient-to-br from-rose-50 to-pink-50">
            <div className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              {dates.length}
            </div>
            <div className="text-gray-600 handwriting">Total Dates</div>
          </div>
          <div className="card text-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {dates.filter(d => new Date(d.dateTime) > new Date()).length}
            </div>
            <div className="text-gray-600 handwriting">Upcoming</div>
          </div>
          <div className="card text-center bg-gradient-to-br from-green-50 to-teal-50">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
              {dates.filter(d => new Date(d.dateTime) <= new Date()).length}
            </div>
            <div className="text-gray-600 handwriting">Memories</div>
          </div>
        </div>

        {/* Dates Grid */}
        {filteredDates.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">
              {filter === 'all' ? '💔' : filter === 'upcoming' ? '🚀' : '📸'}
            </div>
            <h3 className="text-3xl font-semibold text-gray-800 mb-4 handwriting">
              {filter === 'all' 
                ? "No love stories yet" 
                : filter === 'upcoming'
                ? "No upcoming dates"
                : "No memories yet"}
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              {filter === 'all' 
                ? "Your romantic journey is waiting to begin! ✨" 
                : filter === 'upcoming'
                ? "Time to plan your next magical moment 💕"
                : "Create some beautiful memories to look back on 🌟"}
            </p>
            <Link to="/plan" className="btn-primary text-xl px-12 py-4">
              <span className="mr-3">💕</span>
              Plan Your First Date
              <span className="ml-3">✨</span>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDates.map((date) => {
              const countdown = formatCountdown(date.dateTime);
              const dateTime = new Date(date.dateTime);
              const isUpcoming = dateTime > new Date();
              
              return (
                <div key={date.id} className={`card hover:scale-105 transition-all duration-500 relative overflow-hidden ${
                  isUpcoming ? 'bg-gradient-to-br from-white to-rose-50' : 'bg-gradient-to-br from-white to-gray-50'
                }`}>
                  {/* Status indicator */}
                  <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                    isUpcoming ? 'bg-green-400 animate-pulse' : 'bg-gray-300'
                  }`}></div>

                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex items-center space-x-3 px-4 py-2 rounded-full border-2 ${getDateTypeColor(date.dateType)}`}>
                      <span className="text-xl">{getDateTypeIcon(date.dateType)}</span>
                      <span className="font-semibold text-sm">{date.dateType}</span>
                    </div>
                    <button
                      onClick={() => copyInviteLink(date.id)}
                      className="text-gray-400 hover:text-rose-500 transition-colors p-2 rounded-full hover:bg-rose-50"
                      title="Copy invite link"
                    >
                      📋
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">With</p>
                      <p className="text-xl font-bold text-gray-800 handwriting">{date.partnerName} 💕</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl">
                      <p className="text-sm text-gray-500 mb-1">When</p>
                      <p className="font-semibold text-gray-800">
                        {dateTime.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="text-rose-600 font-medium">
                        {dateTime.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </p>
                    </div>

                    <div className="message-bubble">
                      <p className="text-gray-800 text-sm handwriting leading-relaxed">{date.message}</p>
                    </div>

                    {date.partnerEmail && (
                      <div className="bg-green-50 p-3 rounded-xl border border-green-200">
                        <p className="text-xs text-green-600 flex items-center">
                          <span className="mr-2">✉️</span>
                          Invite sent to {date.partnerEmail}
                        </p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-100">
                      {countdown.expired ? (
                        <div className="text-center">
                          <span className="text-gray-500 font-medium handwriting">A beautiful memory 📸</span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <span className="text-rose-500 font-semibold handwriting">{countdown.text} ✨</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex space-x-3">
                    <Link 
                      to={`/invite/${date.id}`}
                      className="flex-1 bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 text-rose-600 font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 text-sm border border-rose-200"
                    >
                      <span className="mr-1">👀</span>
                      View Invite
                    </Link>
                    <a 
                      href={date.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-600 font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 text-sm border border-blue-200"
                    >
                      <span className="mr-1">📹</span>
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