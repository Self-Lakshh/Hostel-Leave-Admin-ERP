import React from 'react';
import { cn } from '@/utils/cn';

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
    /** Smaller padding variant */
    size?: 'sm' | 'md' | 'lg';
    elevated?: boolean;
};

export default function GlassCard({
    children,
    className = '',
    size = 'md',
    elevated = true,
    ...props
}: GlassCardProps) {
    const sizePadding = {
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-6',
    } as const;

    return (
        <div
            {...props}
            className={cn(
                'glass-card glass-hover rounded-2xl transition-all duration-200',
                elevated ? 'hover:shadow-lg' : '',
                sizePadding[size],
                className
            )}
        >
            {children}
        </div>
    );
}
