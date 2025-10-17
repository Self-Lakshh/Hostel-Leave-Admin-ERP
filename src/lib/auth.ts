export type Role = 'admin';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}

export interface AuthState {
    token: string | null;
    user: User | null;
}

export const AUTH_STORAGE_KEY = 'auth_state';

export const getStoredAuth = (): AuthState => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedAuth) {
        return { token: null, user: null };
    }
    try {
        return JSON.parse(storedAuth);
    } catch {
        return { token: null, user: null };
    }
};

export const setStoredAuth = (auth: AuthState) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const clearAuth = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isAuthenticated = () => {
    const { token } = getStoredAuth();
    return !!token;
};

export const hasRole = (requiredRole: Role) => {
    const { user } = getStoredAuth();
    return user?.role === requiredRole;
};

export const getCurrentUser = (): User | null => {
    const { user } = getStoredAuth();
    return user;
};

export const getAuthToken = (): string | null => {
    const { token } = getStoredAuth();
    return token;
};