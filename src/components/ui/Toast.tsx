import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

type Toast = {
    id: string;
    title?: string;
    description?: string;
    type?: ToastType;
    duration?: number;
};

type ToastContextShape = {
    addToast: (t: Omit<Toast, 'id'>) => string;
    removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextShape | null>(null);

export const ToastProvider: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((t: Omit<Toast, 'id'>) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        setToasts((s) => [...s, { ...t, id }]);
        return id;
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((s) => s.filter((x) => x.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}

            {/* Toast container (top-right) */}
            <div aria-live="polite" className="fixed top-4 right-4 z-50 flex flex-col gap-3">
                {toasts.map((t) => (
                    <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), toast.duration ?? 4000);
        return () => clearTimeout(timer);
    }, [toast.id, toast.duration, onClose]);

    const colorClass = toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'error' ? 'bg-rose-600' : 'bg-sky-500';

    return (
        <div
            role="status"
            className={`w-80 max-w-xs p-3 rounded-lg shadow-lg text-white flex items-start gap-3 ${colorClass}`}
        >
            <div className="flex-1">
                {toast.title && <div className="font-semibold">{toast.title}</div>}
                {toast.description && <div className="text-sm mt-1 opacity-95">{toast.description}</div>}
            </div>
            <button onClick={onClose} className="ml-3 text-white/90" aria-label="close toast">
                ✕
            </button>
        </div>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return ctx;
}

export default ToastProvider;
