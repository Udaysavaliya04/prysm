// API Configuration
const getApiUrl = (): string => {
  // In production, use relative URLs so they work with the same domain
  if (process.env.NODE_ENV === 'production') {
    return '';
  }
  
  // In development, use localhost
  return 'http://localhost:5000';
};

export const API_BASE_URL = `${getApiUrl()}/api`;

export default API_BASE_URL;
