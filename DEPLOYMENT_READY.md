# 🚀 Prysm - Separate Backend & Frontend Deployment

## ✅ What We've Set Up

Your project is now configured for **separate deployment**:

### Backend (Web Service)
- **Location**: `/backend` folder
- **Type**: Node.js Web Service  
- **Port**: 5000 (development) / 10000 (production)
- **Health Check**: `/health` endpoint
- **API Endpoints**: `/api/*`

### Frontend (Static Site)
- **Location**: `/frontend` folder
- **Type**: React Static Site
- **Build Output**: `/frontend/build`
- **API Connection**: Environment-aware configuration

## 🔧 Changes Made

### Backend Changes:
1. ✅ Created standalone `backend/package.json`
2. ✅ Removed static file serving (frontend handled separately)
3. ✅ Added health check endpoint
4. ✅ Updated CORS for separate domains
5. ✅ Added backend-specific `render.yaml`

### Frontend Changes:
1. ✅ Updated API configuration to point to separate backend
2. ✅ Added environment variable support (`REACT_APP_API_URL`)
3. ✅ Added frontend-specific `render.yaml`

## 📋 Deployment Steps

### Step 1: Deploy Backend First

1. **Create Web Service on Render**
   - Service Name: `prysm-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://user1:bro12345@cluster0.cytksem.mongodb.net/password-manager
   PORT=10000
   ```

3. **Note the Backend URL** (e.g., `https://prysm-backend.onrender.com`)

### Step 2: Deploy Frontend

1. **Create Static Site on Render**
   - Service Name: `prysm-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`

2. **Environment Variables:**
   ```
   NODE_ENV=production
   REACT_APP_API_URL=https://prysm-backend.onrender.com
   ```
   ⚠️ **Replace with your actual backend URL from Step 1**

### Step 3: Update Backend CORS

After frontend deployment, update `backend/server.js`:

```javascript
origin: process.env.NODE_ENV === 'production' 
  ? [
      'https://your-frontend-url.onrender.com',
      'https://your-frontend-url.onrender.com/'
    ]
  : ['http://localhost:3000']
```

Then redeploy the backend.

## 🧪 Testing

### Local Testing:
1. **Backend**: `cd backend && npm run dev` → http://localhost:5000/health
2. **Frontend**: `cd frontend && npm start` → http://localhost:3000

### Production Testing:
1. **Backend Health**: `https://prysm-backend.onrender.com/health`
2. **Frontend**: `https://prysm-frontend.onrender.com`

## 💰 Cost Benefits

- **Backend**: ~$7/month (Starter plan)
- **Frontend**: FREE (Static site)
- **Total**: ~$7/month (vs ~$14 for two web services)

## 🔄 Development Workflow

### Backend Development:
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

### Frontend Development:
```bash
cd frontend  
npm start
# App runs on http://localhost:3000
# Automatically proxies API calls to localhost:5000
```

### Production Build Testing:
```bash
# Build frontend
cd frontend && npm run build

# Test backend with production settings
cd backend && npm run start:prod
```

## 📁 Final Project Structure

```
prysm/
├── backend/
│   ├── server.js              # Express API server
│   ├── package.json           # Backend dependencies
│   ├── render.yaml           # Backend deployment config
│   ├── .env                  # Local environment
│   └── env.config           # Environment variables
├── frontend/
│   ├── src/
│   │   ├── config/api.ts     # API configuration
│   │   └── components/       # React components
│   ├── package.json          # Frontend dependencies
│   ├── render.yaml          # Frontend deployment config
│   └── build/               # Production build (auto-generated)
└── docs/
    ├── SEPARATE_DEPLOYMENT.md
    └── RENDER_FIX.md
```

## ✨ Benefits of This Setup

1. **Performance**: Frontend served via CDN
2. **Cost-Effective**: Static site is free
3. **Scalability**: Services scale independently
4. **Maintainability**: Clear separation of concerns
5. **Development**: Easier to work on each part separately

Your project is now ready for separate deployment! 🎉
