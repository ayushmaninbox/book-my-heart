# Supabase Setup Guide for BookMyHeart

This guide will help you set up Supabase for your BookMyHeart application using Supabase's free tier.

## Step 1: Create a Supabase Account & Project

1. Go to [Supabase](https://supabase.com/)
2. Click "Start your project" and sign up with GitHub (recommended)
3. Click "New project"
4. Choose your organization (or create one)
5. Enter project details:
   - **Name**: `bookmyheart` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for the project to be set up (takes about 2 minutes)

## Step 2: Set up Database Tables

1. In your Supabase dashboard, go to the **SQL Editor** (in the left sidebar)
2. Click "New query"
3. Copy and paste this SQL to create your tables:

```sql
-- Create dates table
CREATE TABLE dates (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  dateType TEXT NOT NULL,
  partnerName TEXT NOT NULL,
  partnerEmail TEXT,
  message TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  dateTime TIMESTAMPTZ NOT NULL,
  meetingLink TEXT NOT NULL,
  spotifyPlaylist TEXT,
  senderName TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create invites table
CREATE TABLE invites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dateId TEXT NOT NULL,
  partnerEmail TEXT NOT NULL,
  partnerName TEXT NOT NULL,
  dateType TEXT NOT NULL,
  dateTime TIMESTAMPTZ NOT NULL,
  message TEXT NOT NULL,
  meetingLink TEXT NOT NULL,
  spotifyPlaylist TEXT,
  inviteUrl TEXT NOT NULL,
  senderName TEXT,
  emailSent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE invites ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (since we're not using auth)
CREATE POLICY "Allow all operations on dates" ON dates FOR ALL USING (true);
CREATE POLICY "Allow all operations on invites" ON invites FOR ALL USING (true);
```

4. Click "Run" to execute the SQL

## Step 3: Get Your Supabase Configuration

1. In your Supabase dashboard, go to **Settings** → **API**
2. You'll see your project details:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **API Keys**: 
     - `anon` key (public key - safe to use in frontend)
     - `service_role` key (secret key - never expose this!)

## Step 4: Configure Your App

1. In your project, create a `.env` file (copy from `.env.example`)
2. Fill in your Supabase configuration:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# EmailJS Configuration (leave empty for now)
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=

# App URL (your deployment URL - leave as localhost for now)
VITE_APP_URL=http://localhost:5173
```

## Step 5: Test Your Setup

1. **Start Your App**
   ```bash
   npm run dev
   ```

2. **Test Creating a Date**
   - Go to your app in the browser
   - Click "Plan Your First Date"
   - Fill out the form and submit
   - If it works, you should see the confirmation page!

3. **Check Supabase Dashboard**
   - Go back to your Supabase dashboard
   - Click "Table Editor" in the sidebar
   - Select the `dates` table
   - You should see your test data!

## Step 6: Optional - Set up Email Invitations

If you want to send email invitations (optional):

1. **Go to EmailJS**
   - Visit [https://www.emailjs.com/](https://www.emailjs.com/)
   - Create a free account

2. **Set Up Email Service**
   - Add an email service (Gmail, Outlook, etc.)
   - Create an email template with these variables:
     - `{{to_email}}` - Recipient email
     - `{{to_name}}` - Recipient name
     - `{{from_name}}` - Sender name
     - `{{date_type}}` - Type of date
     - `{{date_time}}` - Date and time
     - `{{message}}` - Personal message
     - `{{invite_url}}` - Invitation link
     - `{{meeting_link}}` - Video call link

3. **Add EmailJS configuration to your `.env`:**

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Supabase Free Tier Limits

Supabase's free tier includes:
- **Database**: 500 MB storage, unlimited API requests
- **Auth**: 50,000 monthly active users
- **Storage**: 1 GB
- **Edge Functions**: 500,000 invocations/month
- **Realtime**: Unlimited connections

This is more than enough for a personal dating app!

## Troubleshooting

- **Connection errors**: Double-check your URL and API key in `.env`
- **Table not found**: Make sure you ran the SQL commands in Step 2
- **Permission denied**: Check that RLS policies are set up correctly
- **Email not sending**: Verify EmailJS configuration

## Security Notes

- The `anon` key is safe to use in your frontend
- Never expose your `service_role` key in client-side code
- RLS policies are set to allow all operations since we're not using authentication
- For production, consider implementing proper user authentication

Your BookMyHeart app is now powered by Supabase! 🚀💖

## Next Steps

- Deploy your app to Netlify or Vercel
- Set up custom domain
- Add user authentication (optional)
- Set up email notifications
- Monitor usage in Supabase dashboard