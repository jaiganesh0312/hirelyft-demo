import axios from 'axios';

// Replace with your actual backend API URL
const API_BASE_URL = 'https://73f1-122-172-86-115.ngrok-free.app';
// const API_BASE_URL = 'http://localhost:5000'

console.log(API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptor to include JWT token in requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Assuming you store the token in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add interceptor to handle token refresh on 401 errors
// This requires a refresh token endpoint and logic to store/retrieve the refresh token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Check if the error is 401 and it's not a retry request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retry request
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token found');

        // Call your refresh token endpoint
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });

        // Update stored tokens
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);

        // Update the Authorization header for the original request
        originalRequest.headers.Authorization = `Bearer ${data.token}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Unable to refresh token:', refreshError);
        // If refresh fails, clear tokens and potentially redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        // Optionally trigger logout logic here (e.g., using context)
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 