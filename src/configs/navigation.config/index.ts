import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'

import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'Dashboard',
        path: '/admin/dashboard',
        title: 'Dashboard',
        translateKey: 'nav.dashboard',
        icon: 'dashboard',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['admin'],
        subMenu: [],
    },
    {
        key: 'Manage Students',
        path: '/admin/manage-students',
        title: 'Manage Students',
        translateKey: 'nav.manageStudents',
        icon: 'manageStudents',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['admin'],
        subMenu: [],
    },
    {
        key: 'Manage Leave',
        path: '/admin/manage-leaves',
        title: 'Manage Leave',
        translateKey: 'nav.manageLeave',
        icon: 'manageLeave',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['admin'],
        subMenu: [],
    },
    {
        key: 'Manage Warden',
        path: '/admin/manage-warden',
        title: 'Manage Warden',
        translateKey: 'nav.manageWarden',
        icon: 'manageWarden',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['admin'],
        subMenu: [],
    },
    {
        key: 'Manage Asst Warden',
        path: '/admin/manage-asst-warden',
        title: 'Manage Asst Warden',
        translateKey: 'nav.manageAsstWarden',
        icon: 'manageAsstWarden',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['admin'],
        subMenu: [],
    },
    {
        key: 'Manage Admins',
        path: '/admin/manage-admins',
        title: 'Manage Admins',
        translateKey: 'nav.manageAdmins',
        icon: 'manageAdmins',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['admin'],
        subMenu: [],
    },
    {
        key: 'Manage Security',
        path: '/admin/manage-security',
        title: 'Manage Security',
        translateKey: 'nav.manageSecurity',
        icon: 'manageSecurity',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['admin'],
        subMenu: [],
    },
]

export default navigationConfig
