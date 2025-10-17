import {
    HomeIcon,
    ClipboardListIcon,
    UsersIcon,
    ClipboardIcon,
} from 'lucide-react';

export const ADMIN_SIDEBAR_ITEMS = [
    {
        label: 'Dashboard',
        path: 'dashboard',
        icon: HomeIcon
    },
    {
        label: 'Leave Requests',
        path: 'leaves',
        icon: ClipboardListIcon
    },
    {
        label: 'Students',
        path: 'students',
        icon: UsersIcon
    },
    {
        label: 'Hostels',
        path: 'hostels',
        icon: ClipboardListIcon
    },
    {
        label: 'Wardens',
        path: 'wardens',
        icon: UsersIcon
    },
    {
        label: 'Assistant Wardens',
        path: 'assistant-wardens',
        icon: ClipboardIcon
    },
];
