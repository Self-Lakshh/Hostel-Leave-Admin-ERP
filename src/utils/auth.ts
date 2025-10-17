import { getStoredAuth, clearAuth as clearStoredAuth } from '../lib/auth';

export const isAuthenticated = () => {
    const { token } = getStoredAuth();
    return !!token;
};

export const hasRole = (requiredRole: 'admin') => {
    const user = getStoredAuth().user;
    return user?.role === requiredRole;
};

export const clearAuth = () => {
    clearStoredAuth();
};