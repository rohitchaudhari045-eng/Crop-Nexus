import React from 'react';
import { ClaimStatus } from '@/types';
import { CLAIM_STATUS_MAP } from '@/utils/constants';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { formatDateTime } from '@/utils/formatters';

interface ClaimStatusTimelineProps {
  currentStatus: ClaimStatus;
  statusHistory?: {
    status: ClaimStatus;
    timestamp: string;
    remarks: string;
    updatedBy: string;
  }[];
}

const STEPS: ClaimStatus[] = [
  'submitted',
  'under_review',
  'inspection_scheduled',
  'inspected',
  'panchanama_drafted',
  'verified',
  'approved'
];

export const ClaimStatusTimeline: React.FC<ClaimStatusTimelineProps> = ({
  currentStatus,
  statusHistory = []
}) => {
  const isAdditionalInfo = currentStatus === 'additional_info_required';
  const currentStepIndex = isAdditionalInfo ? 1 : STEPS.indexOf(currentStatus);
  const isRejected = currentStatus === 'rejected';

  return (
    <div className="py-4">
      {/* Stepper Bar for Desktop */}
      <div className="hidden lg:grid grid-cols-7 gap-2 mb-8">
        {STEPS.map((step, idx) => {
          const stepInfo = CLAIM_STATUS_MAP[step];
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex && !isRejected;

          return (
            <div key={step} className="flex flex-col items-center text-center relative">
              {/* Connector line */}
              {idx < STEPS.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-0.5 -z-0 ${
                    idx < currentStepIndex ? 'bg-emerald-600' : 'bg-slate-200'
                  }`}
                />
              )}

              {/* Circle Indicator */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isCurrent
                    ? 'bg-emerald-700 text-white ring-4 ring-emerald-100 shadow-md'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4 animate-pulse" />
                ) : (
                  idx + 1
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-xs font-semibold leading-tight ${
                  isCurrent
                    ? 'text-emerald-800'
                    : isCompleted
                    ? 'text-slate-800'
                    : 'text-slate-400'
                }`}
              >
                {stepInfo.label}
              </span>
            </div>
          );
        })}
      </div>

      {isAdditionalInfo && (
        <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>Additional Information Required: Please review officer notes below and submit the requested documents.</span>
        </div>
      )}

      {isRejected && (
        <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>Claim review outcome: Rejected. Check officer notes below for clarification.</span>
        </div>
      )}

      {/* Detailed Timeline Audit Log */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
        {statusHistory.map((historyItem, idx) => {
          const isLatest = idx === statusHistory.length - 1;
          const info = CLAIM_STATUS_MAP[historyItem.status];

          return (
            <div key={idx} className="relative flex items-start gap-3 pl-8">
              <div
                className={`absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                  isLatest ? 'bg-emerald-600 ring-2 ring-emerald-200' : 'bg-slate-400'
                }`}
              />

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 w-full text-xs">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-slate-900">{info?.label || historyItem.status}</span>
                  <span className="text-xs text-slate-600 font-medium">
                    {formatDateTime(historyItem.timestamp)}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{historyItem.remarks}</p>
                <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 text-xs text-slate-600">
                  Recorded by: <span className="font-semibold text-slate-800">{historyItem.updatedBy}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClaimStatusTimeline;
