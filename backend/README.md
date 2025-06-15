# BookMyHeart Backend Setup

## Overview
This backend uses PocketBase as the database and API server, with custom hooks for email functionality.

## Local Development Setup

### 1. Install PocketBase

#### Option A: Download Binary
1. Go to https://pocketbase.io/docs/
2. Download PocketBase for your OS
3. Extract the executable to the `backend` folder
4. The executable should be named `pocketbase` (or `pocketbase.exe` on Windows)

#### Option B: Using Go (if you have Go installed)
```bash
cd backend
go install github.com/pocketbase/pocketbase@latest
```

### 2. Start PocketBase
```bash
cd backend
./pocketbase serve
```

The admin UI will be available at: http://127.0.0.1:8090/_/

### 3. Initial Setup
1. Open http://127.0.0.1:8090/_/ in your browser
2. Create an admin account
3. The database schema will be automatically created from the migration files

### 4. Environment Variables
Create a `.env` file in the root directory with:
```
VITE_POCKETBASE_URL=http://127.0.0.1:8090
VITE_RESEND_API_KEY=your_resend_api_key_here
VITE_APP_URL=http://localhost:5173
```

## Email Setup (Resend)

### 1. Get Resend API Key
1. Go to https://resend.com
2. Sign up for a free account
3. Verify your email domain (or use the test domain for development)
4. Go to API Keys section
5. Create a new API key
6. Copy the key and add it to your `.env` file

### 2. Configure Email Hook
The email hook is already configured in `pb_hooks/send_invite_email.pb.js`

## Database Schema
The database schema is defined in the migration files:
- `pb_migrations/001_initial_schema.sql` - Creates the main tables
- Collections: `dates`, `invites`

## API Endpoints
- `POST /api/collections/dates/records` - Create a new date
- `GET /api/collections/dates/records` - Get dates
- `POST /api/collections/invites/records` - Create invite
- `POST /api/send-invite-email` - Send email invite

## Deployment to Fly.io (Future)

### 1. Install Fly CLI
```bash
curl -L https://fly.io/install.sh | sh
```

### 2. Login and Deploy
```bash
fly auth login
fly launch
fly deploy
```

### 3. Set Environment Variables
```bash
fly secrets set RESEND_API_KEY=your_key_here
```

## Frontend Integration
The frontend automatically falls back to localStorage if PocketBase is unavailable, ensuring offline functionality.