// src/axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://revo-p3jw.onrender.com/api/v1', // Replace with your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the auth token from local storage or state management
    const token = Cookies.get('authToken'); // Adjust this as needed
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add the token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;