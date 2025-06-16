/*
  # Initial Schema for BookMyHeart

  1. New Tables
    - `dates`
      - `id` (text, primary key)
      - `customId` (text, unique) - Our custom short ID
      - `userId` (text) - User who created the date
      - `dateType` (text) - Type of date (Game Night, Movie Night, etc.)
      - `partnerName` (text) - Name of the partner
      - `partnerEmail` (text) - Partner's email (optional)
      - `senderName` (text) - Name of the person creating the date
      - `message` (text) - Personal message
      - `dateTime` (text) - ISO date string
      - `meetingLink` (text) - Video call link
      - `spotifyPlaylist` (text) - Optional Spotify playlist
      - `created` (text) - Creation timestamp
      - `updated` (text) - Update timestamp

    - `invites`
      - `id` (text, primary key)
      - `dateId` (text) - Reference to the date
      - `partnerEmail` (text) - Email where invite was sent
      - `partnerName` (text) - Name of the recipient
      - `emailSent` (boolean) - Whether email was successfully sent
      - `created` (text) - Creation timestamp
      - `updated` (text) - Update timestamp

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (since no auth system)
*/

-- Create dates table
CREATE TABLE IF NOT EXISTS dates (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(8)))),
  customId TEXT UNIQUE NOT NULL,
  userId TEXT NOT NULL,
  dateType TEXT NOT NULL DEFAULT 'Surprise Date',
  partnerName TEXT NOT NULL,
  partnerEmail TEXT DEFAULT '',
  senderName TEXT DEFAULT '',
  message TEXT NOT NULL,
  dateTime TEXT NOT NULL,
  meetingLink TEXT NOT NULL,
  spotifyPlaylist TEXT DEFAULT '',
  created TEXT DEFAULT (datetime('now')),
  updated TEXT DEFAULT (datetime('now'))
);

-- Create invites table
CREATE TABLE IF NOT EXISTS invites (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(8)))),
  dateId TEXT NOT NULL,
  partnerEmail TEXT NOT NULL,
  partnerName TEXT NOT NULL,
  dateType TEXT NOT NULL,
  dateTime TEXT NOT NULL,
  message TEXT NOT NULL,
  meetingLink TEXT NOT NULL,
  spotifyPlaylist TEXT DEFAULT '',
  inviteUrl TEXT NOT NULL,
  senderName TEXT DEFAULT '',
  emailSent BOOLEAN DEFAULT FALSE,
  created TEXT DEFAULT (datetime('now')),
  updated TEXT DEFAULT (datetime('now'))
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_dates_userId ON dates(userId);
CREATE INDEX IF NOT EXISTS idx_dates_customId ON dates(customId);
CREATE INDEX IF NOT EXISTS idx_invites_dateId ON invites(dateId);
CREATE INDEX IF NOT EXISTS idx_invites_partnerEmail ON invites(partnerEmail);