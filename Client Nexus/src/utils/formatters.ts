import { DamageCause, ClaimStatus } from '@/types';
import { CLAIM_STATUS_MAP, DAMAGE_CAUSES } from './constants';

export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function formatDateTime(dateStr: string | undefined): string {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function formatCurrencyINR(amount: number | undefined): string {
  if (amount === undefined || amount === null) return 'Pending Calculation';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatArea(acres: number | undefined): string {
  if (acres === undefined || acres === null) return '0.00 Acres';
  return `${acres.toFixed(2)} Acres`;
}

export function getDamageCauseLabel(cause: DamageCause): string {
  const match = DAMAGE_CAUSES.find(c => c.value === cause);
  return match ? match.label : cause;
}

export function getClaimStatusInfo(status: ClaimStatus) {
  return CLAIM_STATUS_MAP[status] || {
    label: status,
    color: 'text-slate-700',
    bg: 'bg-slate-100 border-slate-300',
    step: 1
  };
}

export function formatFileSize(bytes: number | undefined): string {
  if (!bytes) return '0 KB';
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}
