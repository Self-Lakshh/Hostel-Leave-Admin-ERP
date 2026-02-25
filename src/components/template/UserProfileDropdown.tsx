import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useSessionUser } from '@/store/authStore'
import { Link } from 'react-router-dom'
import { PiUserDuotone, PiSignOutDuotone } from 'react-icons/pi'
import { useAuth } from '@/auth'
import { ReactElement } from 'react'

type DropdownList = {
    label: string
    path: string
    icon: ReactElement
}

const dropdownItemList: DropdownList[] = [
]

const _UserDropdown = () => {
    const user = useSessionUser((state) => state.user)
    const userName = user?.emp_id
    const email = 'Security Gate'
    const avatar = user?.avatar

    const { signOut } = useAuth()

    const handleSignOut = () => {
        signOut()
    }

    const UserAvatar = ({ size }: { size?: number | 'sm' | 'md' | 'lg' }) => {
        const initials = (userName || 'SG').substring(0, 2).toUpperCase()

        return (
            <Avatar
                size={size}
                src={avatar || undefined}
                className={!avatar ? 'bg-primary text-white font-bold' : ''}
            >
                {!avatar ? initials : null}
            </Avatar>
        )
    }

    return (
        <Dropdown
            className="flex"
            toggleClassName="flex items-center"
            renderTitle={
                <div className="cursor-pointer flex items-center gap-2">
                    <span className="hidden md:inline text-[12px] font-medium text-gray-500">
                        Welcome, <span className="font-bold text-gray-900">{userName}</span>
                    </span>
                    <UserAvatar size={32} />
                </div>
            }
            placement="bottom-end"
        >
            <Dropdown.Item variant="header">
                <div className="py-2 px-3 flex items-center gap-3">
                    <UserAvatar />
                    <div>
                        <div className="font-bold text-gray-900 dark:text-gray-100">
                            {userName || 'Anonymous'}
                        </div>
                        <div className="text-xs">
                            {email || 'No email available'}
                        </div>
                    </div>
                </div>
            </Dropdown.Item>
            <Dropdown.Item variant="divider" />
            {dropdownItemList.map((item) => (
                <Dropdown.Item
                    key={item.label}
                    eventKey={item.label}
                    className="px-0"
                >
                    <Link className="flex h-full w-full px-2" to={item.path}>
                        <span className="flex gap-2 items-center w-full">
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
            ))}
            <Dropdown.Item
                eventKey="Sign Out"
                className="gap-2"
                onClick={handleSignOut}
            >
                <span className="text-xl">
                    <PiSignOutDuotone />
                </span>
                <span>Sign Out</span>
            </Dropdown.Item>
        </Dropdown>
    )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
