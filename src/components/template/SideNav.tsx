import classNames from '@/utils/classNames'
import ScrollBar from '@/components/ui/ScrollBar'
import Logo from '@/components/template/Logo'
import VerticalMenuContent from '@/components/template/VerticalMenuContent'
import { useThemeStore } from '@/store/themeStore'
import { useSessionUser } from '@/store/authStore'
import { useRouteKeyStore } from '@/store/routeKeyStore'
import navigationConfig from '@/configs/navigation.config'
import appConfig from '@/configs/app.config'
import { Link } from 'react-router-dom'
import {
    SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH,
    SIDE_NAV_CONTENT_GUTTER,
    HEADER_HEIGHT,
    LOGO_X_GUTTER,
} from '@/constants/theme.constant'
import type { Mode } from '@/@types/theme'

type SideNavProps = {
    translationSetup?: boolean
    background?: boolean
    className?: string
    contentClass?: string
    mode?: Mode
}

const sideNavStyle = {
    width: SIDE_NAV_WIDTH,
    minWidth: SIDE_NAV_WIDTH,
}

const sideNavCollapseStyle = {
    width: SIDE_NAV_COLLAPSED_WIDTH,
    minWidth: SIDE_NAV_COLLAPSED_WIDTH,
}

const SideNav = ({
    translationSetup = true,
    background = true,
    className,
    contentClass,
    mode,
}: SideNavProps) => {
    const defaultMode = useThemeStore((state) => state.mode)
    const direction = useThemeStore((state) => state.direction)
    const sideNavCollapse = useThemeStore(
        (state) => state.layout.sideNavCollapse,
    )

    const currentRouteKey = useRouteKeyStore((state) => state.currentRouteKey)

    const userAuthority = useSessionUser((state) => state.user.authority)

    return (
        <div
            style={sideNavCollapse ? sideNavCollapseStyle : sideNavStyle}
            className={classNames(
                'side-nav',
                background && 'side-nav-bg',
                !sideNavCollapse && 'side-nav-expand',
                className,
            )}
        >
            <Link
                to={appConfig.authenticatedEntryPath}
                className={classNames(
                    'side-nav-header flex flex-col pt-4',
                    sideNavCollapse && 'items-center justify-center'
                )}
                style={{ height: HEADER_HEIGHT }}
            >
                <Logo
                    imgClass="max-h-10"
                    mode={mode || defaultMode}
                    type={sideNavCollapse ? 'streamline' : 'full'}
                    className={
                        sideNavCollapse
                            ? 'mx-auto'
                            : LOGO_X_GUTTER
                    }
                />
                <div className="border-b border-gray-200 pt-2 w-full"></div>
            </Link>
            <div className={classNames('side-nav-content', contentClass)}>
                <VerticalMenuContent
                    collapsed={sideNavCollapse}
                    navigationTree={navigationConfig}
                    routeKey={currentRouteKey}
                    direction={direction}
                    translationSetup={translationSetup}
                    userAuthority={userAuthority || []}
                />
            </div>
        </div>
    )
}

export default SideNav
