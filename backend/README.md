# BookMyHeart Backend - Render Deployment

## Render Deployment Steps

### 1. Create Render Account
1. Go to https://render.com
2. Sign up with your GitHub account
3. Connect your repository

### 2. Deploy to Render
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select the repository containing your backend
4. Configure the service:
   - **Name**: `bookmyheart-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Runtime**: `Docker`
   - **Build Command**: (leave empty - Docker handles this)
   - **Start Command**: (leave empty - Docker handles this)

### 3. Environment Variables
Add these environment variables in Render dashboard:
- `PORT`: `8080`
- `PB_ENCRYPTION_KEY`: (Render will auto-generate this)

### 4. Add Persistent Disk
1. In your service settings, go to "Disks"
2. Add a new disk:
   - **Name**: `pb-data`
   - **Mount Path**: `/pb_data`
   - **Size**: `1 GB` (free tier)

### 5. Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Your backend will be available at: `https://your-service-name.onrender.com`

## After Deployment

### Update Frontend Configuration
Update your Netlify environment variables:
1. Go to Netlify dashboard → Site settings → Environment variables
2. Update `VITE_POCKETBASE_URL` to your Render URL
3. Redeploy your frontend

### Test the API
Your PocketBase admin panel will be available at:
`https://your-service-name.onrender.com/_/`

## Important Notes

- **Free Tier Limitations**: Render free tier spins down after 15 minutes of inactivity
- **Database Persistence**: The persistent disk ensures your data survives deployments
- **CORS**: Already configured to allow requests from any origin
- **Email**: Configure email settings in PocketBase admin panel after deployment

## Troubleshooting

### If deployment fails:
1. Check the build logs in Render dashboard
2. Ensure all files are in the `backend` directory
3. Verify Dockerfile syntax

### If CORS errors occur:
1. Check that CORS hook is properly deployed
2. Verify the frontend is using the correct backend URL

### If database issues occur:
1. Check that the persistent disk is properly mounted
2. Verify migration files are in the correct location
3. Check PocketBase logs in Render dashboard

## Local Development
To run locally:
```bash
cd backend
./pocketbase serve
```

Admin panel: http://127.0.0.1:8090/_/