import {
  LogOut,
  LogIn,
  FileText,
} from "lucide-react"
import type { ReactElement } from "react"

export type NavigationIcons = Record<string, ReactElement>

const navigationIcon: NavigationIcons = {
  outRequest: <LogOut size={18} />,
  inRequest: <LogIn size={18} />,
  leaveRecords: <FileText size={18} />,
}

export default navigationIcon