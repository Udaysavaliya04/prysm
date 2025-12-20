# Deploying Prysm to Render

## Prerequisites

- GitHub account
- Render account (free tier available at render.com)
- MongoDB Atlas account (free tier available at mongodb.com)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Whitelist all IPs (0.0.0.0/0) for Render access
5. Get your connection string (should look like: `mongodb+srv://username:password@cluster.mongodb.net/prysm`)

## Step 2: Push Code to GitHub

1. Initialize git repository (if not already done):

   ```bash
   git init
   git add .
   git commit -m "Initial commit for Render deployment"
   ```

2. Create a new repository on GitHub

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/prysm.git
   git branch -M main
   git push -u origin main
   ```

## Step 3: Deploy on Render

### Option A: Using render.yaml (Recommended - Deploy Both Services)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will detect `render.yaml` automatically
5. Set the following environment variables for the backend:

   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - Other variables are auto-generated

6. Click **"Apply"** to deploy both frontend and backend

### Option B: Manual Deployment (Deploy Services Separately)

#### Deploy Backend:

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: prysm-backend
   - **Runtime**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     - `NODE_ENV`: production
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `PORT`: 10000

#### Deploy Frontend:

1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: prysm-frontend
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
   - **Environment Variables**:
     - `REACT_APP_API_URL`: Your backend URL (e.g., https://prysm-backend.onrender.com)

## Step 4: Update CORS Settings (if needed)

After deployment, if you encounter CORS issues, update the backend CORS settings in `backend/server.js` to include your frontend URL.

## Important Notes

- **Free Tier**: Services spin down after 15 minutes of inactivity and may take 30-60 seconds to restart
- **Database**: Use MongoDB Atlas free tier (512MB storage)
- **Custom Domain**: You can add a custom domain in Render settings
- **Environment Variables**: Keep your MongoDB URI and other secrets secure, never commit them to Git

## Verifying Deployment

1. Backend health check: Visit `https://your-backend-url.onrender.com/api/health`
2. Frontend: Visit `https://your-frontend-url.onrender.com`

## Troubleshooting

- Check Render logs if deployment fails
- Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Verify all environment variables are set correctly
- Check that build and start commands are correct

## Post-Deployment

Your app is now live! Share your frontend URL with users. Remember:

- First request after inactivity may be slow (free tier limitation)
- Consider upgrading to paid tier for production use
- Set up monitoring and alerts in Render dashboard
