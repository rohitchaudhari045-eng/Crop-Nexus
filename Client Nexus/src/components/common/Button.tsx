import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'dark-outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.99] cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 shadow-xs',
    md: 'text-sm px-4 py-2.5 gap-2 shadow-xs',
    lg: 'text-base px-6 py-3 gap-2.5 shadow-xs'
  }[size];

  const variantStyles = {
    primary: 'bg-emerald-800 hover:bg-emerald-900 text-white focus-visible:ring-emerald-800 shadow-emerald-950/10',
    secondary: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 focus-visible:ring-emerald-800',
    outline: 'border border-slate-300 hover:bg-slate-100 text-slate-900 focus-visible:ring-slate-500 bg-white',
    'dark-outline': 'border border-slate-600 hover:bg-slate-800 text-white focus-visible:ring-slate-400 bg-transparent',
    danger: 'bg-red-700 hover:bg-red-800 text-white focus-visible:ring-red-600',
    ghost: 'text-slate-800 hover:text-slate-950 hover:bg-slate-100 focus-visible:ring-slate-400'
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;
