import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { ProtectedRoute } from '../layouts/ProtectedRoute';
import LoginPage from '../pages/login/LoginPage';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminLeaves from '../pages/admin/Leaves';
import AdminStudents from '../pages/admin/Students';
import AdminWarden from '../pages/admin/Wardens';
import AdminAssistantWardens from '../pages/admin/AssistantWardens';
import { isAuthenticated } from '../utils/auth';

export const AppRoutes: React.FC = () => {
  const location = useLocation();

  // If user is authenticated, redirect from login page to appropriate dashboard
  if (location.pathname === '/login' && isAuthenticated()) {
    const role = localStorage.getItem('role');
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  // Redirect root to appropriate dashboard or login
  if (location.pathname === '/') {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    const role = localStorage.getItem('role');
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole="admin">
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="leaves" element={<AdminLeaves />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="wardens" element={<AdminWarden />} />
        <Route path="assistant-wardens" element={<AdminAssistantWardens />} />
        
      </Route>

      {/* security routes removed - admin-only application */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
