# Prysm - Separate Backend & Frontend Deployment Guide

## Overview
This setup deploys the backend and frontend as separate services:
- **Backend**: Web Service (API only)
- **Frontend**: Static Site (React app)

## Benefits
- ✅ Better performance (CDN for static assets)
- ✅ Lower costs (static sites often free)
- ✅ Independent scaling
- ✅ Better separation of concerns

## Deployment Steps

### Step 1: Deploy Backend (Web Service)

1. **Create Web Service on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure Backend Service:**
   ```
   Name: prysm-backend
   Environment: Node
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

3. **Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://user1:bro12345@cluster0.cytksem.mongodb.net/password-manager
   PORT=10000
   ```

4. **Deploy Backend:**
   - Click "Create Web Service"
   - Note the URL (e.g., `https://prysm-backend.onrender.com`)

### Step 2: Deploy Frontend (Static Site)

1. **Create Static Site on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Static Site"
   - Connect your GitHub repository

2. **Configure Frontend Service:**
   ```
   Name: prysm-frontend
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

3. **Environment Variables:**
   ```
   NODE_ENV=production
   REACT_APP_API_URL=https://prysm-backend.onrender.com
   ```
   ⚠️ **Important**: Replace `https://prysm-backend.onrender.com` with your actual backend URL from Step 1

4. **Deploy Frontend:**
   - Click "Create Static Site"

### Step 3: Update CORS (After Frontend Deployment)

Once you have your frontend URL, update the backend CORS settings:

1. Edit `backend/server.js`
2. Update the CORS origin array with your frontend URL:
   ```javascript
   origin: process.env.NODE_ENV === 'production' 
     ? [
         'https://your-frontend-url.onrender.com',
         'https://your-frontend-url.onrender.com/'
       ]
     : ['http://localhost:3000']
   ```
3. Redeploy the backend service

## Local Development

### Run Backend:
```bash
cd backend
npm install
npm run dev
```

### Run Frontend:
```bash
cd frontend
npm install
npm start
```

## Service URLs Structure

- **Backend API**: `https://prysm-backend.onrender.com`
  - Health check: `/health`
  - API endpoints: `/api/*`
  
- **Frontend**: `https://prysm-frontend.onrender.com`
  - React app served as static files

## Testing the Deployment

1. **Test Backend:**
   - Visit: `https://prysm-backend.onrender.com/health`
   - Should return: `{"status":"healthy",...}`

2. **Test Frontend:**
   - Visit your frontend URL
   - Should load the React app
   - Try logging in - API calls should work

## Troubleshooting

### CORS Errors
- Make sure frontend URL is added to backend CORS configuration
- Redeploy backend after updating CORS settings

### API Connection Issues
- Verify `REACT_APP_API_URL` environment variable is set correctly
- Check that backend service is running and healthy

### Build Failures
- **Backend**: Check that all dependencies are in `backend/package.json`
- **Frontend**: Ensure build command has access to environment variables

## File Structure After Setup

```
prysm/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── render.yaml
│   └── .env (for local dev)
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── render.yaml
│   └── build/ (created during deployment)
└── README.md
```

## Cost Optimization

- **Backend**: Starter plan (~$7/month)
- **Frontend**: Static site (Free tier available)
- **Database**: MongoDB Atlas (Free tier M0 available)

Total monthly cost can be as low as $7 with free tiers! 💰
