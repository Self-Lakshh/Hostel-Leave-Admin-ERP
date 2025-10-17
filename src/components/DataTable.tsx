import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface Column<T> {
    header: string;
    accessor: keyof T;
    align?: 'left' | 'center' | 'right';
    render?: (value: T[keyof T], item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    emptyMessage?: string;
    actions?: {
        icon: LucideIcon;
        label: string;
        onClick: (item: T) => void;
        className?: string;
    }[];
}

export const DataTable = <T extends Record<string, unknown>>({
    columns,
    data,
    loading = false,
    emptyMessage = 'No data available',
    actions,
}: DataTableProps<T>) => {
    if (loading) {
        return (
            <div className="w-full bg-white rounded-lg shadow-sm">
                <div className="animate-pulse">
                    <div className="h-12 bg-gray-100 rounded-t-lg"></div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 border-t border-gray-100">
                            <div className="grid grid-cols-4 gap-4 p-4">
                                {columns.map((_, j) => (
                                    <div key={j} className="h-4 bg-gray-100 rounded"></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="w-full bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            {columns.map((column) => (
                                <th
                                    key={String(column.accessor)}
                                    className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${column.align === 'right'
                                        ? 'text-right'
                                        : column.align === 'center'
                                            ? 'text-center'
                                            : 'text-left'
                                        }`}
                                >
                                    {column.header}
                                </th>
                            ))}
                            {actions && <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((item, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={String(column.accessor)}
                                        className={`px-6 py-4 whitespace-nowrap text-sm ${column.align === 'right'
                                            ? 'text-right'
                                            : column.align === 'center'
                                                ? 'text-center'
                                                : 'text-left'
                                            }`}
                                    >
                                        {column.render
                                            ? column.render(item[column.accessor], item)
                                            : String(item[column.accessor])}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center space-x-3">
                                            {actions.map((action, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => action.onClick(item)}
                                                    className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${action.className || ''}`}
                                                    title={action.label}
                                                >
                                                    {React.createElement(action.icon, { size: 16 })}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};