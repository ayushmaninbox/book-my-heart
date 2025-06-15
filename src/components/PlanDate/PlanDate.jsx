import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getUserId, generateShortId } from '../../utils/generateUserId';
import { generateMeetingLink } from '../../utils/formatCountdown';
import { createDate, sendDateInvite } from '../../lib/pocketbase';

const PlanDate = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetingLink, setMeetingLink] = useState(generateMeetingLink());
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      dateType: 'Game Night',
      partnerName: '',
      partnerEmail: '',
      message: '',
      date: '',
      time: '',
      spotifyPlaylist: '',
      senderName: ''
    }
  });

  const watchedValues = watch();

  const dateTypes = [
    { 
      value: 'Game Night', 
      icon: '🎮', 
      color: 'border-blue-300 bg-blue-50 hover:bg-blue-100',
      selectedColor: 'border-blue-500 bg-blue-100',
      description: 'Play together online'
    },
    { 
      value: 'Movie Night', 
      icon: '🎬', 
      color: 'border-purple-300 bg-purple-50 hover:bg-purple-100',
      selectedColor: 'border-purple-500 bg-purple-100',
      description: 'Watch films together'
    },
    { 
      value: 'Dinner Date', 
      icon: '🍽️', 
      color: 'border-pink-300 bg-pink-50 hover:bg-pink-100',
      selectedColor: 'border-pink-500 bg-pink-100',
      description: 'Share a meal virtually'
    },
    { 
      value: 'Coffee Chat', 
      icon: '☕', 
      color: 'border-amber-300 bg-amber-50 hover:bg-amber-100',
      selectedColor: 'border-amber-500 bg-amber-100',
      description: 'Cozy conversation time'
    },
    { 
      value: 'Study Session', 
      icon: '📚', 
      color: 'border-green-300 bg-green-50 hover:bg-green-100',
      selectedColor: 'border-green-500 bg-green-100',
      description: 'Learn together'
    },
    { 
      value: 'Surprise Date', 
      icon: '🎁', 
      color: 'border-red-300 bg-red-50 hover:bg-red-100',
      selectedColor: 'border-red-500 bg-red-100',
      description: 'Something special'
    }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const dateId = generateShortId();
      const userId = getUserId();
      const dateTime = new Date(`${data.date}T${data.time}`);
      
      const dateData = {
        id: dateId,
        userId,
        ...data,
        meetingLink,
        dateTime: dateTime.toISOString(),
        createdAt: new Date().toISOString()
      };

      await createDate(dateData);
      console.log('Date created in PocketBase only');

      if (data.partnerEmail) {
        try {
          await sendDateInvite(dateId, data.partnerEmail, data.partnerName, {
            ...dateData,
            senderName: data.senderName || 'Someone special'
          });
        } catch (emailError) {
          console.warn('Email sending failed, but date was created:', emailError);
        }
      }

      navigate(`/confirmation/${dateId}`);
    } catch (error) {
      console.error('Error creating date:', error);
      alert('Failed to create date. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDateType = dateTypes.find(type => type.value === watchedValues.dateType);

  const regenerateMeetingLink = () => {
    setMeetingLink(generateMeetingLink());
  };

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
            <p className="text-sm text-gray-500 handwriting">planning your perfect moment</p>
          </div>
        </Link>
        <Link to="/my-dates" className="btn-secondary">
          <span className="mr-2">📅</span>
          My Dates
        </Link>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-rose-200 mb-6">
            <span className="text-2xl">💕</span>
            <span className="text-sm text-gray-600">Step 1 of 1</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Plan Your <span className="handwriting text-rose-500">Perfect Date</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create a magical moment that will make your partner's heart skip a beat ✨
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Date Type Selection */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Choose Your Date Vibe</h3>
                    <p className="text-gray-600">What kind of magic do you want to create?</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {dateTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`date-type-card ${
                        watchedValues.dateType === type.value
                          ? type.selectedColor + ' ring-2 ring-offset-2 ring-rose-300'
                          : type.color
                      }`}
                    >
                      <input
                        type="radio"
                        value={type.value}
                        {...register('dateType')}
                        className="sr-only"
                      />
                      <div className="text-4xl mb-3">{type.icon}</div>
                      <div className="text-lg font-semibold text-gray-700 mb-1">{type.value}</div>
                      <div className="text-sm text-gray-500">{type.description}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Your Details */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">👤</span>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">About You</h3>
                    <p className="text-gray-600">Let your partner know who's planning this surprise</p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Your name (e.g., Sarah, Your Secret Admirer)"
                  {...register('senderName')}
                  className="input-field"
                />
              </div>

              {/* Partner Details */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">💕</span>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Your Special Someone</h3>
                    <p className="text-gray-600">Tell us about the person who makes your heart flutter</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Their name (e.g., Alex, My Love)"
                    {...register('partnerName', { required: 'Partner name is required' })}
                    className="input-field"
                  />
                  {errors.partnerName && (
                    <p className="text-red-500 text-sm flex items-center">
                      <span className="mr-2">⚠️</span>
                      {errors.partnerName.message}
                    </p>
                  )}
                  
                  <input
                    type="email"
                    placeholder="Their email (for the surprise invitation)"
                    {...register('partnerEmail', {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className="input-field"
                  />
                  {errors.partnerEmail && (
                    <p className="text-red-500 text-sm flex items-center">
                      <span className="mr-2">⚠️</span>
                      {errors.partnerEmail.message}
                    </p>
                  )}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl">
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="mr-2">💌</span>
                      We'll send them a beautiful, personalized invitation email with all the date details
                    </p>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">📅</span>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">When Magic Happens</h3>
                    <p className="text-gray-600">Choose the perfect moment for your date</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      {...register('date', { required: 'Date is required' })}
                      className="input-field"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      {...register('time', { required: 'Time is required' })}
                      className="input-field"
                    />
                  </div>
                </div>
                {(errors.date || errors.time) && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Please select both date and time
                  </p>
                )}
              </div>

              {/* Special Message */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">💌</span>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Your Love Note</h3>
                    <p className="text-gray-600">Write something that will make them smile</p>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    placeholder="Can't wait to spend this special time with you! You mean the world to me 💖"
                    {...register('message', { required: 'A sweet message is required' })}
                    rows="4"
                    className="input-field resize-none handwriting text-lg"
                  />
                  <div className="absolute bottom-4 right-4 text-gray-400">
                    <span className="text-2xl">✍️</span>
                  </div>
                </div>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="mr-2">⚠️</span>
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Extras */}
              <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">✨</span>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Extra Special Touches</h3>
                    <p className="text-gray-600">Optional additions to make it even more memorable</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">🎵</span>
                      <label className="font-medium text-gray-700">Spotify Playlist</label>
                    </div>
                    <input
                      type="url"
                      placeholder="https://open.spotify.com/playlist/..."
                      {...register('spotifyPlaylist')}
                      className="input-field"
                    />
                    <p className="text-sm text-gray-500 mt-2">Share the perfect soundtrack for your date</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">📹</span>
                      <label className="font-medium text-gray-700">Video Call Link</label>
                    </div>
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={meetingLink}
                        className="input-field flex-1 bg-white/80"
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={regenerateMeetingLink}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-colors"
                        title="Generate new link"
                      >
                        🔄
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      📱 Google Meet link - no login required for your partner
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-8">
              <div className="card bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 sticky top-8">
                <div className="text-center mb-6">
                  <span className="text-4xl mb-4 block">👀</span>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Live Preview</h3>
                  <p className="text-gray-600">See how your date invitation will look</p>
                </div>
                
                <div className="space-y-6">
                  {selectedDateType && (
                    <div className={`inline-flex items-center space-x-3 px-4 py-3 rounded-full ${selectedDateType.color} border-2`}>
                      <span className="text-2xl">{selectedDateType.icon}</span>
                      <span className="font-semibold text-gray-700">{watchedValues.dateType}</span>
                    </div>
                  )}
                  
                  {watchedValues.partnerName && (
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">For</p>
                      <p className="text-2xl font-bold text-gray-800 handwriting">{watchedValues.partnerName} 💕</p>
                    </div>
                  )}
                  
                  {watchedValues.date && watchedValues.time && (
                    <div className="bg-white/80 p-4 rounded-2xl text-center">
                      <p className="text-sm text-gray-500 mb-2">When</p>
                      <p className="font-bold text-gray-800 text-lg">
                        {new Date(`${watchedValues.date}T${watchedValues.time}`).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-gray-600">
                        at {new Date(`${watchedValues.date}T${watchedValues.time}`).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </p>
                    </div>
                  )}
                  
                  {watchedValues.message && (
                    <div className="message-bubble">
                      <p className="text-gray-800 handwriting text-lg leading-relaxed">{watchedValues.message}</p>
                    </div>
                  )}

                  {watchedValues.partnerEmail && (
                    <div className="bg-green-50 p-4 rounded-2xl border border-green-200">
                      <p className="text-sm text-green-700 flex items-center">
                        <span className="mr-2">✉️</span>
                        Beautiful email invite will be sent to {watchedValues.partnerEmail}
                      </p>
                    </div>
                  )}

                  {watchedValues.spotifyPlaylist && (
                    <div className="bg-green-50 p-4 rounded-2xl border border-green-200">
                      <p className="text-sm text-green-700 flex items-center">
                        <span className="mr-2">🎵</span>
                        Playlist included for the perfect mood
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-8">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary text-xl px-16 py-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-3">⏳</span>
                  Creating Your Perfect Date...
                </>
              ) : (
                <>
                  <span className="mr-3">💕</span>
                  Create & Send Love Invitation
                  <span className="ml-3">✨</span>
                </>
              )}
            </button>
            <p className="text-gray-500 mt-4">
              Your partner will receive a beautiful surprise invitation ✨
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanDate;