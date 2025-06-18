# Firebase Setup Guide for BookMyHeart

This guide will help you set up Firebase for your BookMyHeart application using Firebase's free tier.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `bookmyheart` (or your preferred name)
4. Choose whether to enable Google Analytics (optional for this project)
5. Click "Create project"

## Step 2: Set up Firestore Database

1. In your Firebase project console, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select a location closest to your users
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In your Firebase project console, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>`
5. Register your app with a nickname like "BookMyHeart Web"
6. Copy the Firebase configuration object

## Step 4: Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Fill in your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 5: Set up EmailJS (Optional - for email invitations)

1. Go to [EmailJS](https://www.emailjs.com/)
2. Create a free account
3. Create an email service (Gmail, Outlook, etc.)
4. Create an email template with these variables:
   - `{{to_email}}` - Recipient email
   - `{{to_name}}` - Recipient name
   - `{{from_name}}` - Sender name
   - `{{date_type}}` - Type of date
   - `{{date_time}}` - Date and time
   - `{{message}}` - Personal message
   - `{{invite_url}}` - Invitation link
   - `{{meeting_link}}` - Video call link

5. Add EmailJS configuration to your `.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Step 6: Firestore Security Rules (Optional)

For production, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to dates collection
    match /dates/{document} {
      allow read, write: if true;
    }
    
    // Allow read/write access to invites collection
    match /invites/{document} {
      allow read, write: if true;
    }
  }
}
```

## Firebase Free Tier Limits

Firebase's free "Spark" plan includes:
- **Firestore**: 1 GiB storage, 50K reads/day, 20K writes/day
- **Hosting**: 10 GB storage, 10 GB/month transfer
- **Functions**: 125K invocations/month, 40K GB-seconds/month

This is more than enough for a personal dating app!

## Testing Your Setup

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Try creating a date - it should save to Firestore
4. Check your Firebase console to see the data

## Deployment

You can deploy to:
- **Firebase Hosting** (free tier included)
- **Netlify** (as currently configured)
- **Vercel**

For Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Troubleshooting

- **CORS errors**: Make sure your domain is added to Firebase authorized domains
- **Permission denied**: Check your Firestore security rules
- **Email not sending**: Verify EmailJS configuration and template variables

Your BookMyHeart app is now powered by Firebase! 🚀💖