import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach JWT Auth Token to outgoing requests if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('crop_nexus_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server returned error status code (4xx, 5xx)
      console.warn(`[Crop Nexus API Error ${error.response.status}]:`, error.response.data);
    } else if (error.request) {
      // Network unreachable or Flask backend not yet running
      console.info('[Crop Nexus Notice]: Backend unreachable at', API_BASE_URL, '— using local demo mock mode.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
