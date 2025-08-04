// API Configuration for separate backend/frontend deployment
const getApiUrl = (): string => {
  // Check if REACT_APP_API_URL is set (for production builds)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // In production, point to your backend service URL
  if (process.env.NODE_ENV === 'production') {
    // Replace this with your actual backend service URL from Render
    return 'https://prysm-backend.onrender.com';
  }
  
  // In development, use localhost
  return 'http://localhost:5000';
};

export const API_BASE_URL = `${getApiUrl()}/api`;

export default API_BASE_URL;
