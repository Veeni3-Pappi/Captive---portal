import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'mpesa' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]";

    const variants = {
      default: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-sm",
      mpesa: "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-950/40 border border-emerald-500/30",
      secondary: "bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800",
      outline: "border border-slate-750 hover:bg-slate-800/60 text-slate-200 border-slate-700",
      ghost: "hover:bg-slate-800/60 text-slate-300 hover:text-white",
      destructive: "bg-rose-950/60 text-rose-200 hover:bg-rose-900/70 border border-rose-800/40",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs rounded-lg gap-1.5",
      md: "h-11 px-4 text-sm rounded-xl gap-2",
      lg: "h-13 px-6 text-base rounded-xl gap-2.5 font-semibold",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
