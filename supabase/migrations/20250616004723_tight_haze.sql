/*
  # BookMyHeart Initial Schema

  1. New Collections
    - `dates` - Main date planning records
      - `id` (text, primary key)
      - `userId` (text, required)
      - `dateType` (text, required)
      - `partnerName` (text, required)
      - `partnerEmail` (email, optional)
      - `senderName` (text, optional)
      - `message` (text, required)
      - `date` (text, required)
      - `time` (text, required)
      - `dateTime` (text, required)
      - `meetingLink` (url, required)
      - `spotifyPlaylist` (url, optional)
      - `created` (date, auto)
      - `updated` (date, auto)

    - `invites` - Email invitation records
      - `id` (text, primary key)
      - `dateId` (text, required)
      - `partnerEmail` (email, required)
      - `partnerName` (text, required)
      - `dateType` (text, required)
      - `dateTime` (text, required)
      - `message` (text, required)
      - `meetingLink` (url, required)
      - `spotifyPlaylist` (url, optional)
      - `inviteUrl` (url, required)
      - `senderName` (text, required)
      - `emailSent` (bool, default false)
      - `created` (date, auto)
      - `updated` (date, auto)

  2. Security
    - Collections are created with default API rules
    - No authentication required for basic operations
*/

-- This file is intentionally empty as PocketBase uses JavaScript hooks for schema creation
-- The actual schema is defined in pb_hooks/migrations.pb.js