import React from 'react';
import { ArrowUp, ArrowDown, type LucideIcon } from 'lucide-react';

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    value,
    icon,
    trend,
    className = '',
}) => {
    return (
        <div className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                    {trend && (
                        <p className={`text-sm mt-2 flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            <span className="mr-1">
                                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                            </span>
                            {trend.isPositive ? (
                                <ArrowUp className="w-3 h-3" />
                            ) : (
                                <ArrowDown className="w-3 h-3" />
                            )}
                        </p>
                    )}
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="w-6 h-6 text-primary">
                        {React.createElement(icon, { size: 24 })}
                    </div>
                </div>
            </div>
        </div>
    );
};