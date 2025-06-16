/*
  # Initial Database Schema for BookMyHeart

  1. New Tables
    - `dates` - Store virtual date information
      - `id` (text, primary key) - Auto-generated PocketBase ID
      - `customId` (text, unique) - Our custom short ID for URLs
      - `userId` (text) - User identifier from localStorage
      - `dateType` (text) - Type of date (Game Night, Movie Night, etc.)
      - `partnerName` (text) - Name of the date partner
      - `partnerEmail` (text, optional) - Email for invitation
      - `senderName` (text, optional) - Name of person planning the date
      - `message` (text) - Personal message for the date
      - `dateTime` (text) - ISO string of when the date is scheduled
      - `meetingLink` (text) - Video call link
      - `spotifyPlaylist` (text, optional) - Spotify playlist URL
      - `created` (datetime) - Auto-generated creation timestamp
      - `updated` (datetime) - Auto-generated update timestamp

    - `invites` - Store email invitation records
      - `id` (text, primary key) - Auto-generated PocketBase ID
      - `dateId` (text) - Reference to the date
      - `partnerEmail` (text) - Email address of recipient
      - `partnerName` (text) - Name of recipient
      - `dateType` (text) - Type of date
      - `dateTime` (text) - ISO string of date time
      - `message` (text) - Personal message
      - `meetingLink` (text) - Video call link
      - `spotifyPlaylist` (text, optional) - Spotify playlist URL
      - `inviteUrl` (text) - Full URL to the invitation page
      - `senderName` (text) - Name of sender
      - `emailSent` (bool) - Whether email was successfully sent
      - `created` (datetime) - Auto-generated creation timestamp
      - `updated` (datetime) - Auto-generated update timestamp

  2. Security
    - No authentication required (public access)
    - No RLS policies needed for this use case

  3. Indexes
    - Index on customId for fast lookups
    - Index on userId for user's dates
    - Index on partnerEmail for recipient lookups
*/

-- Create dates collection
CREATE TABLE IF NOT EXISTS dates (
  id TEXT PRIMARY KEY,
  customId TEXT UNIQUE NOT NULL,
  userId TEXT NOT NULL,
  dateType TEXT NOT NULL,
  partnerName TEXT NOT NULL,
  partnerEmail TEXT,
  senderName TEXT,
  message TEXT NOT NULL,
  dateTime TEXT NOT NULL,
  meetingLink TEXT NOT NULL,
  spotifyPlaylist TEXT,
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create invites collection
CREATE TABLE IF NOT EXISTS invites (
  id TEXT PRIMARY KEY,
  dateId TEXT NOT NULL,
  partnerEmail TEXT NOT NULL,
  partnerName TEXT NOT NULL,
  dateType TEXT NOT NULL,
  dateTime TEXT NOT NULL,
  message TEXT NOT NULL,
  meetingLink TEXT NOT NULL,
  spotifyPlaylist TEXT,
  inviteUrl TEXT NOT NULL,
  senderName TEXT NOT NULL,
  emailSent BOOLEAN DEFAULT FALSE,
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_dates_customId ON dates(customId);
CREATE INDEX IF NOT EXISTS idx_dates_userId ON dates(userId);
CREATE INDEX IF NOT EXISTS idx_dates_dateTime ON dates(dateTime);
CREATE INDEX IF NOT EXISTS idx_invites_dateId ON invites(dateId);
CREATE INDEX IF NOT EXISTS idx_invites_partnerEmail ON invites(partnerEmail);
CREATE INDEX IF NOT EXISTS idx_invites_dateTime ON invites(dateTime);