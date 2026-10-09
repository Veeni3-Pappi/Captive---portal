import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftAddon, rightAddon, disabled, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={twMerge(
              clsx(
                "w-full h-12 bg-slate-900/90 text-slate-100 placeholder:text-slate-500 rounded-xl border border-slate-700/80 px-4 text-sm font-medium transition-all duration-150",
                "focus:outline-none focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                leftAddon && "pl-11",
                rightAddon && "pr-11",
                error && "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20",
                className
              )
            )}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-3.5 flex items-center text-slate-400">
              {rightAddon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-rose-400 font-medium pl-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
