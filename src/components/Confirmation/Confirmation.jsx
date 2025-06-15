import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Confirmation = () => {
  const { id } = useParams();
  const [dateData, setDateData] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const dates = JSON.parse(localStorage.getItem('bookmyheart_dates') || '[]');
    const foundDate = dates.find(date => date.id === id);
    setDateData(foundDate);
  }, [id]);

  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}/invite/${id}`;
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };

  if (!dateData) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="floating-elements">
          <div className="floating-element">💔</div>
          <div className="floating-element">😢</div>
          <div className="floating-element">🥺</div>
        </div>
        <div className="text-center relative z-10">
          <div className="text-8xl mb-6">💔</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 handwriting">Date Not Found</h2>
          <p className="text-gray-600 mb-6">This date seems to have gotten lost in the clouds of love</p>
          <Link to="/" className="btn-primary">
            <span className="mr-2">🏠</span>
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const dateTime = new Date(dateData.dateTime);

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element">🎉</div>
        <div className="floating-element">✨</div>
        <div className="floating-element">💖</div>
        <div className="floating-element">🎊</div>
        <div className="floating-element">💕</div>
        <div className="floating-element">🌟</div>
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
            <p className="text-sm text-gray-500 handwriting">mission accomplished!</p>
          </div>
        </Link>
        <Link to="/my-dates" className="btn-secondary">
          <span className="mr-2">📅</span>
          My Dates
        </Link>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-8">
        {/* Success Animation */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="text-9xl mb-6 animate-bounce">🎉</div>
            <div className="absolute -top-4 -right-4 text-4xl animate-spin">✨</div>
            <div className="absolute -bottom-2 -left-4 text-3xl animate-pulse">💖</div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 handwriting">
            Date Planned Successfully!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your romantic surprise is ready to sweep them off their feet! 💕
          </p>
          
          {/* Celebration particles */}
          <div className="flex justify-center space-x-4 mt-6">
            <span className="text-2xl animate-bounce" style={{animationDelay: '0s'}}>🎊</span>
            <span className="text-2xl animate-bounce" style={{animationDelay: '0.1s'}}>🎉</span>
            <span className="text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>✨</span>
            <span className="text-2xl animate-bounce" style={{animationDelay: '0.3s'}}>💖</span>
            <span className="text-2xl animate-bounce" style={{animationDelay: '0.4s'}}>🎊</span>
          </div>
        </div>

        {/* Date Summary Card */}
        <div className="card bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-6xl opacity-20 transform rotate-12">💕</div>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 bg-white/80 px-6 py-3 rounded-full shadow-lg mb-4">
              <span className="text-3xl">🎯</span>
              <span className="text-2xl font-bold text-gray-800">{dateData.dateType}</span>
            </div>
            <p className="text-xl text-gray-600 handwriting">
              A special surprise for <span className="font-bold text-rose-600">{dateData.partnerName}</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">📅</span>
                  <span className="font-semibold text-gray-700">Date & Time</span>
                </div>
                <p className="text-lg font-bold text-gray-800">
                  {dateTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-rose-600 font-semibold">
                  {dateTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">📹</span>
                  <span className="font-semibold text-gray-700">Meeting Link</span>
                </div>
                <a 
                  href={dateData.meetingLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium transition-colors"
                >
                  <span>Join Video Call</span>
                  <span>🚀</span>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="message-bubble">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl">💌</span>
                  <span className="font-semibold text-gray-700">Your Love Note</span>
                </div>
                <p className="text-gray-800 handwriting text-lg leading-relaxed">{dateData.message}</p>
              </div>

              {dateData.partnerEmail && (
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">✉️</span>
                    <span className="font-semibold text-green-700">Email Sent!</span>
                  </div>
                  <p className="text-green-600 text-sm">
                    Beautiful invitation delivered to {dateData.partnerEmail}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="card text-center mb-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="text-4xl mb-4">📤</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 handwriting">Share the Love</h3>
          <p className="text-gray-600 mb-8 text-lg">
            Send your partner the magical invitation link to surprise them!
          </p>
          
          <button 
            onClick={copyInviteLink}
            className={`btn-primary text-lg px-10 py-4 transition-all duration-300 ${
              linkCopied ? 'bg-gradient-to-r from-green-400 to-emerald-400' : ''
            }`}
          >
            {linkCopied ? (
              <>
                <span className="mr-3">✅</span>
                Link Copied to Clipboard!
                <span className="ml-3">🎉</span>
              </>
            ) : (
              <>
                <span className="mr-3">📋</span>
                Copy Magical Invite Link
                <span className="ml-3">✨</span>
              </>
            )}
          </button>
          
          {linkCopied && (
            <p className="text-green-600 mt-4 handwriting">
              Now paste it anywhere to share the surprise! 💕
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/plan" className="btn-secondary text-lg px-8 py-4">
            <span className="mr-3">💕</span>
            Plan Another Date
          </Link>
          <Link to="/my-dates" className="btn-primary text-lg px-8 py-4">
            <span className="mr-3">📅</span>
            View All My Dates
            <span className="ml-3">→</span>
          </Link>
        </div>

        {/* Tips Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="card text-center bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="text-4xl mb-4">💡</div>
            <h4 className="font-semibold text-gray-800 mb-2">Pro Tip</h4>
            <p className="text-gray-600 text-sm">
              Set a reminder 15 minutes before your date to prepare the perfect atmosphere
            </p>
          </div>
          
          <div className="card text-center bg-gradient-to-br from-green-50 to-teal-50">
            <div className="text-4xl mb-4">🎵</div>
            <h4 className="font-semibold text-gray-800 mb-2">Mood Setting</h4>
            <p className="text-gray-600 text-sm">
              {dateData.spotifyPlaylist ? 'Your playlist is ready!' : 'Consider adding background music for ambiance'}
            </p>
          </div>
          
          <div className="card text-center bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="text-4xl mb-4">📱</div>
            <h4 className="font-semibold text-gray-800 mb-2">Easy Access</h4>
            <p className="text-gray-600 text-sm">
              Your partner can join with just one click - no downloads or accounts needed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;