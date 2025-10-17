import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, hasRole, getCurrentUser } from '../lib/auth';

interface Props {
  children: React.ReactNode;
  requiredRole?: 'admin';
}

export const ProtectedRoute: React.FC<Props> = ({ children, requiredRole }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect to login while remembering the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    // If user doesn't have the required role, redirect to their appropriate dashboard if known
    const user = getCurrentUser();
    const userRole = user?.role;
    if (userRole) return <Navigate to={`/${userRole}/dashboard`} replace />;
    // fallback to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
