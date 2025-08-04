# Prysm Password Manager

A secure password manager built with React and Node.js.

## Deployment Instructions for Render

### Method 1: Using Render Dashboard (Recommended)

1. **Create a Web Service on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure Build & Deploy Settings:**
   ```
   Name: prysm
   Environment: Node
   Region: Choose your preferred region
   Branch: main
   Build Command: npm run build:frontend
   Start Command: npm start
   ```

3. **Add Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=10000
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app

### Method 2: Using render.yaml (Alternative)

If you prefer using Infrastructure as Code, you can use the `render.yaml` file in the root directory:

1. Update the `render.yaml` file with your specific configuration
2. Connect your repository to Render
3. Render will automatically detect and use the `render.yaml` configuration

## Local Development

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   Create `backend/env.config` with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

3. **Run in development mode:**
   ```bash
   npm run dev:full
   ```

## Build for Production

To build the project locally:

```bash
npm run build:frontend
```

This will:
1. Install frontend dependencies
2. Build the React app for production
3. Create optimized static files in `frontend/build/`

## Project Structure

```
├── backend/
│   ├── server.js          # Express server (serves API + static files)
│   └── env.config         # Environment variables
├── frontend/
│   ├── src/               # React source code
│   ├── public/            # Static assets
│   └── build/             # Frontend build (created during build)
├── build/                 # Production build (copied from frontend/build)
├── package.json           # Root dependencies and scripts
├── build-deploy.js        # Build script for deployment
└── render.yaml           # Render deployment configuration
```

## API Endpoints

- `GET /api/master-key/check` - Check if master key is valid
- `POST /api/master-key` - Set up master key
- `GET /api/passwords` - Get all passwords
- `POST /api/passwords` - Create new password entry
- `PUT /api/passwords/:id` - Update password entry
- `DELETE /api/passwords/:id` - Delete password entry

## Security Features

- Master key encryption
- Password strength validation
- Secure password storage
- CORS protection
- Input validation and sanitization

## Troubleshooting

### Build Directory Not Found Error

If you see the error: `Publish directory build does not exist!`

This means the React app build wasn't copied to the root directory. The fix is:

1. **Ensure build command is correct**: `npm run build:frontend`
2. **Check build process**: The build script should:
   - Install frontend dependencies
   - Build the React app in `frontend/build/`
   - Copy the build files to root `build/` directory
3. **Verify files are copied**: After build, you should see `build/index.html` in the root
4. **Server configuration**: The server serves static files from `build/` in production

The build process now:
1. Runs `npm install` for both backend and frontend
2. Builds the React app with `npm run build` in frontend/
3. Copies `frontend/build/` to root `build/` directory
4. Server serves static files from root `build/` directory

### Environment Variables

Make sure all required environment variables are set:
- `NODE_ENV=production`
- `MONGODB_URI=your_mongodb_connection_string`
- `PORT=10000` (or your preferred port)

### CORS Issues

If you experience CORS issues, make sure your domain is added to the CORS configuration in `backend/server.js`.
