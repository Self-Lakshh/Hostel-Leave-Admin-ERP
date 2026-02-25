import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'Dashboard',
        path: '/admin/dashboard',
        component: lazy(() => import('@/views/admin/Overview')),
        authority: ['admin'],
        meta: {
            pageContainerType: 'gutterless',
        },
    },
    {
        key: 'Manage Students',
        path: '/admin/manage-students',
        component: lazy(() => import('@/views/admin/ManageStudents')),
        authority: ['admin'],
        meta: {
            pageContainerType: 'gutterless',
        },
    },
    {
        key: 'Manage Warden',
        path: '/admin/manage-warden',
        component: lazy(() => import('@/views/admin/ManageWarden')),
        authority: ['admin'],
        meta: {
            pageContainerType: 'gutterless',
        },
    },
    {
        key: 'Manage Asst Warden',
        path: '/admin/manage-asst-warden',
        component: lazy(() => import('@/views/admin/ManageAsstWarden')),
        authority: ['admin'],
        meta: {
            pageContainerType: 'gutterless',
        },
    },
    {
        key: 'Manage Admins',
        path: '/admin/manage-admins',
        component: lazy(() => import('@/views/admin/ManageAdmins')),
        authority: ['admin'],
        meta: {
            pageContainerType: 'gutterless',
        },
    },
    {   
        key: 'Manage Security',
        path: '/admin/manage-security',
        component: lazy(() => import('@/views/admin/ManageSecurity')),
        authority: ['admin'],
        meta: {
            pageContainerType: 'gutterless',
        },
    },
    {
        key: 'Manage Leaves',
        path: '/admin/manage-leaves',
        component: lazy(() => import('@/views/admin/ManageLeaves')),
        authority: ['admin'],
        meta: {
            pageContainerType: 'gutterless',
        },
    },
]
