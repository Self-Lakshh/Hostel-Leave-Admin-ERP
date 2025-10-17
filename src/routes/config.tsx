import type { Role } from '../lib/auth';
import { lazy, Suspense } from 'react';
import AppLayout from '../layouts/AppLayout';
import { ProtectedRoute } from '../layouts/ProtectedRoute';

// Lazy load page components
const LoginPage = lazy(() => import('../pages/login/LoginPage'));

// Admin pages      
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const AdminLeaves = lazy(() => import('../pages/admin/Leaves'));
const AdminStudents = lazy(() => import('../pages/admin/Students'));
const AdminStudentDetails = lazy(() => import('../pages/admin/StudentDetails'));
const AdminWardens = lazy(() => import('../pages/admin/Wardens'));
const AdminAssistantWardens = lazy(() => import('../pages/admin/AssistantWardens'));
const AdminSecurity = lazy(() => import('../pages/admin/Security'));
const AdminHostels = lazy(() => import('../pages/admin/Hostels'));
const AdminOverview = lazy(() => import('../pages/admin/Overview'));
const AdminAdmin = lazy(() => import('../pages/admin/Admins'))

const withSuspense = (Component: React.LazyExoticComponent<any>) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Component />
    </Suspense>
);

interface RouteConfig {
    path: string;
    element: React.ReactNode;
    children?: RouteConfig[];
}

const createProtectedRoute = (
    role: Role,
    Layout: React.ComponentType,
    children: RouteConfig[]
): RouteConfig => ({
    path: role,
    element: (
        <ProtectedRoute requiredRole={role}>
            <Layout />
        </ProtectedRoute>
    ),
    children,
});

export const routes: RouteConfig[] = [
    {
        path: 'login',
        element: <LoginPage />,
    },
    createProtectedRoute('admin', AppLayout, [
        {
            path: 'dashboard',
            element: withSuspense(AdminDashboard),
        },
        {
            path: 'overview',
            element: withSuspense(AdminOverview),
        },
        {
            path: 'leaves',
            element: withSuspense(AdminLeaves),
        },
        {
            path: 'students',
            element: withSuspense(AdminStudents),
        },
        {
            path: 'students/:enroll',
            element: withSuspense(AdminStudentDetails),
        },
        {
            path: 'wardens',
            element: withSuspense(AdminWardens),
        },
        {
            path: 'assistant-wardens',
            element: withSuspense(AdminAssistantWardens),
        },
        {
            path: 'security',
            element: withSuspense(AdminSecurity),
        },
        {
            path: 'hostels',
            element: withSuspense(AdminHostels),
        },
        {
            path: 'admin',
            element: withSuspense(AdminAdmin),
        }
    ]),
    // security routes removed - admin-only application
];