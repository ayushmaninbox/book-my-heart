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
        const pocketBaseDate = await getDateById(id);
        
        if (pocketBaseDate) {
          setDateData(pocketBaseDate);
        } else {
          const dates = JSON.parse(localStorage.getItem('bookmyheart_dates') || '[]');
          const foundDate = dates.find(date => date.id === id);
          setDateData(foundDate);
        }
      } catch (error) {
        console.error('Error loading date:', error);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
        <div className="floating-elements">
          <div className="floating-element">💕</div>
          <div className="floating-element">✨</div>
          <div className="floating-element">💖</div>
          <div className="floating-element">🌙</div>
        </div>
        <div className="text-center relative z-10">
          <div className="text-8xl mb-6 animate-pulse">💖</div>
          <p className="text-xl text-gray-600 handwriting">Loading your special invitation...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!dateData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
        <div className="floating-elements">
          <div className="floating-element">💔</div>
          <div className="floating-element">😢</div>
          <div className="floating-element">🥺</div>
        </div>
        <div className="text-center relative z-10">
          <div className="text-8xl mb-6">💔</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 handwriting">Oops! Invitation Not Found</h2>
          <p className="text-gray-600 text-lg">This date invitation seems to have wandered off into the digital sunset.</p>
          <p className="text-gray-500 mt-2">Maybe it's hiding behind a cloud of love? ☁️💕</p>
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Floating Elements Background */}
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

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          {/* Main Invite Card */}
          <div className="invite-card p-10 text-center">
            {/* Header */}
            <div className="mb-8">
              <div className="text-8xl mb-4 animate-bounce">{getDateTypeIcon(dateData.dateType)}</div>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-100 to-purple-100 px-4 py-2 rounded-full mb-4">
                <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-600">Special Invitation</span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-800 mb-3 handwriting">
                You're Invited! 💕
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                <span className="font-semibold text-rose-600">{dateData.senderName || 'Someone special'}</span> has planned something magical just for you
              </p>
            </div>

            {/* Date Type Badge */}
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-rose-100 to-purple-100 rounded-full font-semibold text-gray-700 mb-8 shadow-lg">
              <span className="text-2xl">{getDateTypeIcon(dateData.dateType)}</span>
              <span className="text-lg">{dateData.dateType}</span>
            </div>

            {/* Date & Time */}
            <div className="bg-gradient-to-r from-white/80 to-rose-50/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-inner">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-2xl">📅</span>
                <h3 className="text-xl font-semibold text-gray-800">When the Magic Happens</h3>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-2 handwriting">
                {dateTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <p className="text-2xl text-rose-600 font-semibold">
                {dateTime.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            </div>

            {/* Special Message */}
            <div className="message-bubble mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-2xl">💌</span>
                <h3 className="text-lg font-semibold text-gray-800">A Message From the Heart</h3>
              </div>
              <p className="text-gray-800 text-xl leading-relaxed handwriting">{dateData.message}</p>
            </div>

            {/* Countdown */}
            {countdown && (
              <div className="mb-8">
                {countdown.expired ? (
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-3xl mb-6">
                      <p className="text-2xl font-bold text-green-600 mb-2 handwriting">The moment is here! 🎉</p>
                      <p className="text-green-700">Your special date has begun!</p>
                    </div>
                    <a 
                      href={dateData.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xl px-12 py-4"
                    >
                      <span className="mr-3">💖</span>
                      Join Your Date Now!
                      <span className="ml-3">✨</span>
                    </a>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4 text-lg handwriting">Your magical moment begins in...</p>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="countdown-card">
                        <div className="countdown-number">{countdown.days}</div>
                        <div className="text-sm text-gray-600 font-medium">Days</div>
                      </div>
                      <div className="countdown-card">
                        <div className="countdown-number">{countdown.hours}</div>
                        <div className="text-sm text-gray-600 font-medium">Hours</div>
                      </div>
                      <div className="countdown-card">
                        <div className="countdown-number">{countdown.minutes}</div>
                        <div className="text-sm text-gray-600 font-medium">Minutes</div>
                      </div>
                    </div>
                    <a 
                      href={dateData.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xl px-12 py-4"
                    >
                      <span className="mr-3">💖</span>
                      Get Ready to Join!
                      <span className="ml-3">✨</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Meeting Link Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-xl">📱</span>
                <p className="font-semibold text-blue-700">No Login Required!</p>
              </div>
              <p className="text-sm text-blue-600">
                Just click the button above to join directly via Google Meet. It's that simple! 
              </p>
            </div>

            {/* Additional Info */}
            {dateData.spotifyPlaylist && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <span className="text-xl">🎵</span>
                  <p className="font-semibold text-green-700">Perfect Playlist Included</p>
                </div>
                <a 
                  href={dateData.spotifyPlaylist}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  <span>Listen on Spotify</span>
                  <span>🎧</span>
                </a>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-500 handwriting text-lg">
              Made with 💖 by BookMyHeart
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Connecting hearts, one date at a time ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invite;