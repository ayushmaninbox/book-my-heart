import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { getUserId } from '../../utils/generateUserId';
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
    { value: 'Game Night', icon: '🎮', color: 'bg-blue-100 text-blue-600' },
    { value: 'Movie Night', icon: '🎬', color: 'bg-purple-100 text-purple-600' },
    { value: 'Dinner Date', icon: '🍽️', color: 'bg-pink-100 text-pink-600' },
    { value: 'Coffee Chat', icon: '☕', color: 'bg-amber-100 text-amber-600' },
    { value: 'Study Session', icon: '📚', color: 'bg-green-100 text-green-600' },
    { value: 'Surprise Date', icon: '🎁', color: 'bg-red-100 text-red-600' }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const dateId = uuidv4();
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

      // Save to PocketBase
      await createDate(dateData);

      // Also save to localStorage as backup
      const existingDates = JSON.parse(localStorage.getItem('bookmyheart_dates') || '[]');
      existingDates.push(dateData);
      localStorage.setItem('bookmyheart_dates', JSON.stringify(existingDates));

      // Send email invite if email is provided
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

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Plan Your Perfect Date</h1>
          <p className="text-gray-600">Create a magical moment for you and your partner</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              {/* Date Type Selection */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Pick a date type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {dateTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        watchedValues.dateType === type.value
                          ? 'border-pink-300 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-200'
                      }`}
                    >
                      <input
                        type="radio"
                        value={type.value}
                        {...register('dateType')}
                        className="sr-only"
                      />
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="text-sm font-medium text-gray-700">{type.value}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Your Details */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Details</h3>
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  {...register('senderName')}
                  className="input-field"
                />
              </div>

              {/* Partner Details */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Partner Details</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Partner's name"
                    {...register('partnerName', { required: 'Partner name is required' })}
                    className="input-field"
                  />
                  {errors.partnerName && (
                    <p className="text-red-500 text-sm">{errors.partnerName.message}</p>
                  )}
                  
                  <input
                    type="email"
                    placeholder="Partner's email (for notifications)"
                    {...register('partnerEmail', {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="input-field"
                  />
                  {errors.partnerEmail && (
                    <p className="text-red-500 text-sm">{errors.partnerEmail.message}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    💌 We'll send them a beautiful invite email with the date details
                  </p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Pick date & time</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                    className="input-field"
                  />
                  <input
                    type="time"
                    {...register('time', { required: 'Time is required' })}
                    className="input-field"
                  />
                </div>
                {(errors.date || errors.time) && (
                  <p className="text-red-500 text-sm mt-2">Date and time are required</p>
                )}
              </div>

              {/* Special Message */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add special message</h3>
                <textarea
                  placeholder="Can't wait for our date! 💖"
                  {...register('message', { required: 'Message is required' })}
                  rows="3"
                  className="input-field resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>

              {/* Extras */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add extras (optional)</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-500">🎵</span>
                    <input
                      type="url"
                      placeholder="Spotify playlist link"
                      {...register('spotifyPlaylist')}
                      className="input-field flex-1"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-500">📹</span>
                    <input
                      type="text"
                      value={meetingLink}
                      className="input-field flex-1 bg-gray-50"
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={regenerateMeetingLink}
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                      🔄 New Link
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    📱 Google Meet link - no login required for guests
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-6">
              <div className="card bg-gradient-to-br from-pink-50 to-purple-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
                
                <div className="space-y-4">
                  <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full ${selectedDateType?.color}`}>
                    <span>{selectedDateType?.icon}</span>
                    <span className="font-medium">{watchedValues.dateType}</span>
                  </div>
                  
                  {watchedValues.partnerName && (
                    <div>
                      <p className="text-sm text-gray-600">For</p>
                      <p className="font-semibold text-gray-800">{watchedValues.partnerName}</p>
                    </div>
                  )}
                  
                  {watchedValues.date && watchedValues.time && (
                    <div>
                      <p className="text-sm text-gray-600">When</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(`${watchedValues.date}T${watchedValues.time}`).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })} at {new Date(`${watchedValues.date}T${watchedValues.time}`).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </p>
                    </div>
                  )}
                  
                  {watchedValues.message && (
                    <div>
                      <p className="text-sm text-gray-600">Message</p>
                      <p className="text-gray-800 italic">"{watchedValues.message}"</p>
                    </div>
                  )}

                  {watchedValues.partnerEmail && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-600">
                        ✉️ Email invite will be sent to {watchedValues.partnerEmail}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Date...' : 'Create & Send Invite'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanDate;