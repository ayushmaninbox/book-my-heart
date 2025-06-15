import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatCountdown } from '../../utils/formatCountdown';
import { getDateById } from '../../lib/pocketbase';

const Invite = () => {
  const { id } = useParams();
  const [dateData, setDateData] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDateData = async () => {
      try {
        // Try to load from PocketBase first
        const pocketBaseDate = await getDateById(id);
        
        if (pocketBaseDate) {
          setDateData(pocketBaseDate);
        } else {
          // Fallback to localStorage
          const dates = JSON.parse(localStorage.getItem('bookmyheart_dates') || '[]');
          const foundDate = dates.find(date => date.id === id);
          setDateData(foundDate);
        }
      } catch (error) {
        console.error('Error loading date:', error);
        // Fallback to localStorage
        const dates = JSON.parse(localStorage.getItem('bookmyheart_dates') || '[]');
        const foundDate = dates.find(date => date.id === id);
        setDateData(foundDate);
      } finally {
        setLoading(false);
      }
    };

    loadDateData();
  }, [id]);

  useEffect(() => {
    if (!dateData) return;

    const updateCountdown = () => {
      const countdownData = formatCountdown(dateData.dateTime);
      setCountdown(countdownData);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [dateData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="text-center">
          <div className="text-6xl mb-4">💖</div>
          <p className="text-gray-600">Loading your special invite...</p>
        </div>
      </div>
    );
  }

  if (!dateData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="text-center">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invite not found</h2>
          <p className="text-gray-600">This date invitation doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const dateTime = new Date(dateData.dateTime);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="floating-hearts">
        <div className="heart">💖</div>
        <div className="heart">💕</div>
        <div className="heart">💗</div>
        <div className="heart">💖</div>
        <div className="heart">💕</div>
        <div className="heart">💗</div>
        <div className="heart">💖</div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          {/* Main Invite Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="text-6xl mb-4">{getDateTypeIcon(dateData.dateType)}</div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              You're Invited!
            </h1>
            
            <p className="text-gray-600 mb-6">
              {dateData.senderName || 'Someone special'} has planned a surprise for you
            </p>

            {/* Date Type Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-full font-medium mb-6">
              <span>{getDateTypeIcon(dateData.dateType)}</span>
              <span>{dateData.dateType}</span>
            </div>

            {/* Date & Time */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">When</h3>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {dateTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <p className="text-xl text-gray-600">
                {dateTime.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            </div>

            {/* Special Message */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Special Message</h3>
              <p className="text-gray-800 italic text-lg">"{dateData.message}"</p>
            </div>

            {/* Countdown */}
            {countdown && (
              <div className="mb-6">
                {countdown.expired ? (
                  <div className="text-center">
                    <p className="text-red-500 font-semibold text-lg mb-4">The date has started!</p>
                    <a 
                      href={dateData.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Join Now! 💖
                    </a>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">Your special time starts in...</p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-pink-100 rounded-xl p-3">
                        <div className="text-2xl font-bold text-pink-600">{countdown.days}</div>
                        <div className="text-sm text-pink-600">Days</div>
                      </div>
                      <div className="bg-purple-100 rounded-xl p-3">
                        <div className="text-2xl font-bold text-purple-600">{countdown.hours}</div>
                        <div className="text-sm text-purple-600">Hours</div>
                      </div>
                      <div className="bg-pink-100 rounded-xl p-3">
                        <div className="text-2xl font-bold text-pink-600">{countdown.minutes}</div>
                        <div className="text-sm text-pink-600">Minutes</div>
                      </div>
                    </div>
                    <a 
                      href={dateData.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Get Ready to Join! 💖
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Meeting Link Info */}
            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <p className="text-sm text-blue-600 mb-2">📱 No login required!</p>
              <p className="text-xs text-blue-500">
                Click the button above to join directly via Google Meet
              </p>
            </div>

            {/* Additional Info */}
            {dateData.spotifyPlaylist && (
              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">🎵 Playlist for the date:</p>
                <a 
                  href={dateData.spotifyPlaylist}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Listen on Spotify
                </a>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Made with 💖 by BookMyHeart
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invite;