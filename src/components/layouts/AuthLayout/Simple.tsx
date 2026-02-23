import { cloneElement } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { CommonProps } from '@/@types/common'
import LayoutBase from '@/components/template/LayoutBase'

interface SimpleProps extends CommonProps {
    content?: ReactNode
}

const Simple = ({ children, content, ...rest }: SimpleProps) => {
    return (
        <LayoutBase type="blank" className="h-screen">
            <div className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 scale-105"
                    style={{
                        backgroundImage: `url('/img/others/spsu-bg.jpg')`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                </div>

                {/* Logo at Top Left */}
                <div className="absolute top-8 left-8 z-20 flex items-center gap-2">

                    <img
                        className="h-15 w-auto"
                        src="/img/logo/logo-dark-full.png"
                        alt="Logo"
                    />

                </div>

                {/* Glassmorphism Logic Container */}
                <div className="relative z-10 flex items-center justify-center h-full px-4">
                    <div className="w-full max-w-[440px] p-8 md:p-10 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
                        <div className="flex flex-col gap-1 mb-8 text-center">
                            <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
                            <p className="text-white/60 font-medium">Please enter your details to sign in</p>
                        </div>

                        <div className="auth-content">
                            {content}
                            {children
                                ? cloneElement(children as ReactElement, {
                                    ...rest,
                                })
                                : null}
                        </div>
                    </div>
                </div>

                {/* Footer / Info */}
                <div className="absolute bottom-8 left-0 right-0 z-20 text-center">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-widest">
                        Managed by Hostel Leave ERP Team &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </LayoutBase>
    )
}

export default Simple
