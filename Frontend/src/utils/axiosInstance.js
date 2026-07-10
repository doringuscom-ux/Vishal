import axios from 'axios';
import { API_BASE_URL, ADMIN_REFRESH } from './api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add access token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        // Request new access token
        const { data } = await axios.post(ADMIN_REFRESH, { refreshToken });
        
        // Save new token
        localStorage.setItem('adminToken', data.token);
        
        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return axiosInstance(originalRequest);
        
      } catch (refreshError) {
        // Refresh token failed or expired (e.g., after 3 days)
        console.error('Refresh token expired, logging out');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/admin'; // Redirect to login
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
