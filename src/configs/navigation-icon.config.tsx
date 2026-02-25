import {
  LayoutDashboard,
  Users,
  Shield,
  UserCheck,
  UserCog,
  ClipboardList,
} from "lucide-react"
import type { ReactElement } from "react"

export type NavigationIcons = Record<string, ReactElement>

const navigationIcon: NavigationIcons = {
  dashboard: <LayoutDashboard size={18} />,
  manageStudents: <Users size={18} />,          // Student management
  manageWarden: <UserCheck size={18} />,        // Warden authority role
  manageAsstWarden: <UserCog size={18} />,      // Assistant warden (admin-level user)
  manageSecurity: <Shield size={18} />,         // Security module
  manageAdmins: <UserCog size={18} />,          // Admin management
  manageLeave: <ClipboardList size={18} />,     // Leave / request handling
}

export default navigationIcon