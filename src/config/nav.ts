import {
    Users,
    ScrollText,
    Building2,
    UserLock,
    UserPlus,
    ShieldX,
    ShieldUser,
    LayoutDashboard,
} from 'lucide-react';

export interface NavItem {
    label: string;
    path: string; // absolute path like /admin/dashboard
    icon: React.ComponentType<any>;
    children?: NavItem[];
}

export const ADMIN_NAV: NavItem[] = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Students', path: '/admin/students', icon: Users },
    { label: 'Wardens', path: '/admin/wardens', icon: UserPlus },
    { label: 'Assistant Wardens', path: '/admin/assistant-wardens', icon: UserLock },
    { label: 'Security', path: '/admin/security', icon: ShieldX },
    { label: 'Admin', path: '/admin/admin', icon: ShieldUser },
    { label: 'Leave Requests', path: '/admin/leaves', icon: ScrollText },
    { label: 'Hostels', path: '/admin/hostels', icon: Building2 },
];

export default ADMIN_NAV;
