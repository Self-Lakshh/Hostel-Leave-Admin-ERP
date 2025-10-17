import axios from 'axios';
import type { AxiosRequestHeaders } from 'axios';
import { getAuthToken } from './auth';

// Prefer VITE_API_BASE but fall back to legacy VITE_API_URL or '/api'
const BASE_URL = (import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            // ensure headers object exists and set Authorization
            const headers = (config.headers || {}) as AxiosRequestHeaders;
            headers.Authorization = `Bearer ${token}`;
            config.headers = headers;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);