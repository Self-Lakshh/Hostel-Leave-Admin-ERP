import { useEffect, useCallback, forwardRef, useId } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

export type DialogRootProps = {
    isOpen: boolean;
    onClose: () => void;
    size?: "sm" | "md" | "lg" | "xl" | "full";
} & Omit<React.HTMLAttributes<HTMLDivElement>, "role" | "aria-modal">;

export type DialogContentProps = {
    title?: React.ReactNode;
    description?: React.ReactNode;
} & DialogRootProps;

const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[95vw]"
};

function useDialog() {
    const titleId = useId();
    const descriptionId = useId();
    return { titleId, descriptionId };
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
    function DialogContent(
        { isOpen, onClose, title, description, size = "md", className, children, ...props },
        ref
    ) {
        const { titleId, descriptionId } = useDialog();

        useEffect(() => {
            const originalOverflow = document.body.style.overflow || "";
            if (isOpen) document.body.style.overflow = "hidden";
            return (): void => {
                document.body.style.overflow = originalOverflow;
            };
        }, [isOpen]);

        const handleBackdropClick = useCallback(
            (e: React.MouseEvent) => {
                if (e.target === e.currentTarget) onClose();
            },
            [onClose]
        );

        if (!isOpen) return null;

        return (
            <div
                className={cn(
                    "fixed inset-0 z-50 flex items-center justify-center overflow-hidden",
                    "bg-white/40 backdrop-blur-[10px] backdrop-saturate-[1.8] animate-fadeIn"
                )}
                onClick={handleBackdropClick}
                role="dialog"
                aria-labelledby={title ? titleId : undefined}
                aria-describedby={description ? descriptionId : undefined}
                aria-modal="true"
            >
                <div
                    ref={ref}
                    className={cn(
                        "relative w-full animate-slideUp transition-all duration-300",
                        sizeClasses[size],
                        className
                    )}
                    {...props}
                >
                    {/* Frosted white glass card */}
                    <div
                        className={cn(
                            "relative rounded-3xl overflow-hidden border border-white/60",
                            "bg-[rgba(255,255,255,0.95)] backdrop-blur-3xl backdrop-saturate-150",
                            "shadow-[0_10px_35px_rgba(0,0,0,0.08),0_0_40px_rgba(255,255,255,0.2)]",
                            "transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1),0_0_50px_rgba(255,255,255,0.25)]"
                        )}
                    >
                        {/* Subtle luminous sheen */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-transparent pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className={cn(
                                "absolute right-5 top-5 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm",
                                "backdrop-blur-lg transition-all duration-300 hover:scale-110 active:scale-95"
                            )}
                            type="button"
                            aria-label="Close dialog"
                        >
                            <X className="h-4 w-4 text-gray-500" />
                        </button>

                        {/* Modal content */}
                        <div className="p-8">
                            {title && (
                                <div className="mb-5">
                                    <h2
                                        id={titleId}
                                        className="text-xl font-semibold text-gray-800 tracking-wide"
                                    >
                                        {title}
                                    </h2>
                                    {description && (
                                        <p
                                            id={descriptionId}
                                            className="mt-1.5 text-sm text-gray-500"
                                        >
                                            {description}
                                        </p>
                                    )}
                                </div>
                            )}
                            <div className={cn("relative", !title && "pt-2")}>{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export const DialogHeader = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(function DialogHeader({ className, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={cn(
                "flex flex-col space-y-1.5 text-center sm:text-left",
                "pb-2 border-b border-white/60",
                className
            )}
            {...props}
        />
    );
});

export const DialogFooter = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(function DialogFooter({ className, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={cn(
                "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 mt-6 pt-4 border-t border-white/60",
                className
            )}
            {...props}
        />
    );
});

export const DialogTitle = forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(function DialogTitle({ className, children, ...props }, ref) {
    return (
        <h3
            ref={ref}
            className={cn(
                "text-base font-semibold leading-none tracking-tight text-gray-800",
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
});

export const Dialog = {
    Content: DialogContent,
    Header: DialogHeader,
    Footer: DialogFooter,
    Title: DialogTitle,
};
