import React from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '../utils/cn';

interface BaseLayoutProps {
    sidebar: React.ReactNode;
    header: React.ReactNode;
    footer: React.ReactNode;
}

export function BaseLayout({ sidebar, header, footer }: BaseLayoutProps) {
    return (
        <div className="min-h-screen flex w-full bg-background">
            {sidebar}

            <div className="flex-1 flex flex-col min-h-screen">
                {header}

                <main className={cn(
                    "flex-1 overflow-auto",
                    "p-4 md:p-6 lg:p-8",
                    "space-y-4 md:space-y-6 lg:space-y-8"
                )}>
                    <Outlet />
                </main>

                {footer}
            </div>
        </div>
    );
}