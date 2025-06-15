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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Date not found</h2>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const dateTime = new Date(dateData.dateTime);

  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl">💖</span>
          <span className="text-xl font-bold text-gray-800">BookMyHeart</span>
        </Link>
        <Link to="/my-dates" className="btn-secondary">
          My Dates
        </Link>
      </header>

      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Date Planned Successfully!</h1>
          <p className="text-gray-600">Your romantic surprise is ready to be shared</p>
        </div>

        {/* Date Summary Card */}
        <div className="card bg-gradient-to-br from-pink-50 to-purple-50 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{dateData.dateType}</h2>
            <p className="text-gray-600">for {dateData.partnerName}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-pink-100">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-semibold text-gray-800">
                {dateTime.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })} at {dateTime.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-pink-100">
              <span className="text-gray-600">Message</span>
              <span className="font-semibold text-gray-800 text-right max-w-xs">
                "{dateData.message}"
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600">Meeting Link</span>
              <a 
                href={dateData.meetingLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Join Call
              </a>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="card text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Share with Your Partner</h3>
          <p className="text-gray-600 mb-6">Send them the invite link to surprise them!</p>
          
          <button 
            onClick={copyInviteLink}
            className={`btn-primary ${linkCopied ? 'bg-green-500 hover:bg-green-600' : ''}`}
          >
            {linkCopied ? '✓ Link Copied!' : '📋 Copy Invite Link'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/plan" className="btn-secondary">
            Plan Another Date
          </Link>
          <Link to="/my-dates" className="btn-primary">
            View All My Dates
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;