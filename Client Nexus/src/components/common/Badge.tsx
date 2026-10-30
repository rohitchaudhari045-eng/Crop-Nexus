import React from 'react';
import { ClaimStatus, CompensationStatus, UserRole } from '@/types';
import { CLAIM_STATUS_MAP, COMPENSATION_STATUS_MAP } from '@/utils/constants';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'draft';
  size?: 'sm' | 'md';
  className?: string;
  claimStatus?: ClaimStatus;
  compensationStatus?: CompensationStatus;
  role?: UserRole | null;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  claimStatus,
  compensationStatus,
  role
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  if (claimStatus) {
    const info = CLAIM_STATUS_MAP[claimStatus];
    return (
      <span className={`inline-flex items-center font-medium rounded-full border ${info?.bg || 'bg-slate-100 border-slate-300'} ${info?.color || 'text-slate-700'} ${sizeClasses} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
        {info?.label || claimStatus}
      </span>
    );
  }

  if (compensationStatus) {
    const info = COMPENSATION_STATUS_MAP[compensationStatus];
    return (
      <span className={`inline-flex items-center font-medium rounded-full border ${info?.badgeClass || 'bg-slate-100 text-slate-700 border-slate-200'} ${sizeClasses} ${className}`}>
        {info?.label || compensationStatus}
      </span>
    );
  }

  if (role) {
    const roleConfig = {
      farmer: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      officer: 'bg-indigo-50 text-indigo-800 border-indigo-200'
    }[role];

    return (
      <span className={`inline-flex items-center capitalize font-semibold rounded-full border ${roleConfig} ${sizeClasses} ${className}`}>
        {role}
      </span>
    );
  }

  const variantClasses = {
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    neutral: 'bg-gray-100 text-gray-700 border-gray-200',
    draft: 'bg-cyan-50 text-cyan-800 border-cyan-300 border-dashed'
  }[variant];

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${variantClasses} ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
