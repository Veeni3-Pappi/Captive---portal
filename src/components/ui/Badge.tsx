import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'amber' | 'blue' | 'slate' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'slate',
  children,
  ...props
}) => {
  const variants = {
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
    outline: 'bg-transparent text-slate-400 border-slate-700',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide uppercase',
          variants[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
};
