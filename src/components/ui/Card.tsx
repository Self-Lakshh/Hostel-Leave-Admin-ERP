import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

// Core card component props
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'ghost';
}

// Card header props
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  decorative?: boolean;
}

// Card title props
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

// Card content props
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

// Card footer props
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg shadow-sm",
          {
            'glass-card glass-hover p-6 bg-white/10': variant === 'default',
            'border border-border/50': variant === 'ghost',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, decorative = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 mb-4",
        {
          'border-b pb-4': decorative,
        },
        className
      )}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => {
    const Heading = Component;
    return (
      <Heading
        ref={ref}
        className={cn(
          "text-xl font-semibold leading-none tracking-tight",
          className
        )}
        {...props}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padded = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        padded && 'p-6',
        className
      )}
      {...props}
    />
  )
);

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, align = 'left', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex mt-4 pt-4 border-t",
        {
          'justify-start': align === 'left',
          'justify-center': align === 'center',
          'justify-end': align === 'right',
        },
        className
      )}
      {...props}
    />
  )
);
