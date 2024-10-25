// axiosConfig.js
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:3000';

// Attach token from local storage to each request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ensure the key matches your storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
