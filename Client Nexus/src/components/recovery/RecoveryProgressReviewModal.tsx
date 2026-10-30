import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { CropRecoveryProgressRecord, ClaimRecord } from '@/types';
import { recoveryApi } from '@/api/recoveryApi';
import { formatDate } from '@/utils/formatters';
import {
  TrendingUp,
  Star,
  CheckCircle2,
  Calendar,
  Layers,
  Image as ImageIcon,
  User,
  MapPin,
  Clock,
  ShieldCheck,
  Eye,
  AlertCircle
} from 'lucide-react';

interface RecoveryProgressReviewModalProps {
  claim: ClaimRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RecoveryProgressReviewModal: React.FC<RecoveryProgressReviewModalProps> = ({
  claim,
  isOpen,
  onClose
}) => {
  const [records, setRecords] = useState<CropRecoveryProgressRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  useEffect(() => {
    if (claim && isOpen) {
      const fetchProgress = async () => {
        setLoading(true);
        try {
          const data = await recoveryApi.getProgressRecords({
            claimId: claim.id,
            farmerId: claim.userId
          });
          setRecords(data);
        } catch (e) {
          console.warn('Error fetching recovery progress for officer view:', e);
        } finally {
          setLoading(false);
        }
      };
      fetchProgress();
    }
  }, [claim, isOpen]);

  if (!claim) return null;

  const latestRecord = records[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Farmer Crop Recovery Progress — Official Review Desk"
      description={`Report Ref: ${claim.claimNumber} • Farmer: ${claim.farmerName}`}
      maxWidth="3xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-slate-500 italic">
            Official read-only review view. Records cannot be altered by inspecting officers.
          </span>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Review
          </Button>
        </div>
      }
    >
      <div className="space-y-5 text-xs">
        {/* Overview Banner */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-slate-900">{claim.cropName}</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                {claim.damageCause.replace('_', ' ').toUpperCase()}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-200 text-slate-800">
                {claim.claimNumber}
              </span>
            </div>
            <p className="text-xs text-slate-600 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>{claim.farmerName} ({claim.farmerPhone})</span>
              <span>•</span>
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Gat {claim.surveyNumber}, {claim.village}, {claim.district}</span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">
              Current Rejuvenation Vigor
            </span>
            {latestRecord ? (
              <div className="flex items-center justify-end gap-1 mt-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < latestRecord.healthRating
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
            ) : (
              <span className="text-slate-400 italic">No ratings logged yet</span>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-12 text-center text-slate-500">
            <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p>Loading farmer's verified progress records...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="py-10 text-center space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="font-bold text-sm text-slate-800">No Recovery Progress Records Logged Yet</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              The farmer has not yet submitted follow-up photos or treatment milestone entries for this damage report.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-700" />
                Dated Rejuvenation Milestones ({records.length})
              </h4>
              <span className="text-slate-500 text-xs">
                First Log: {formatDate(records[records.length - 1].updateDate)}
              </span>
            </div>

            {/* Timeline cards */}
            <div className="space-y-3.5">
              {records.map((rec, idx) => (
                <div
                  key={rec.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      <h5 className="font-extrabold text-sm text-slate-900">{rec.stageName}</h5>
                    </div>
                    <span className="font-semibold text-slate-500">{formatDate(rec.updateDate)}</span>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-slate-800 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                      "{rec.notes}"
                    </p>
                    {rec.observations && (
                      <p className="text-slate-600 text-xs">
                        <strong>Officer Note:</strong> {rec.observations}
                      </p>
                    )}
                    {rec.completedSteps && (
                      <p className="text-emerald-800 text-xs font-semibold">
                        <strong>Steps Completed:</strong> {rec.completedSteps}
                      </p>
                    )}
                  </div>

                  {/* Photos */}
                  {(rec.beforePhotoUrl || rec.afterPhotoUrl) && (
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      {rec.beforePhotoUrl && (
                        <div
                          onClick={() => setActivePhoto(rec.beforePhotoUrl!)}
                          className="relative rounded-xl overflow-hidden border border-slate-200 w-28 h-20 bg-slate-100 cursor-pointer group"
                        >
                          <img src={rec.beforePhotoUrl} alt="Initial" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <span className="absolute bottom-1 left-1 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Initial
                          </span>
                        </div>
                      )}
                      {rec.afterPhotoUrl && (
                        <div
                          onClick={() => setActivePhoto(rec.afterPhotoUrl!)}
                          className="relative rounded-xl overflow-hidden border border-slate-200 w-28 h-20 bg-slate-100 cursor-pointer group"
                        >
                          <img src={rec.afterPhotoUrl} alt="Recovered" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <span className="absolute bottom-1 left-1 bg-emerald-800/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Recovered
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1 text-amber-800 font-semibold">
                      <span>Vigor Rating:</span>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rec.healthRating ? 'fill-amber-400 text-amber-600' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    {rec.milestoneReached && (
                      <span className="text-emerald-800 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Milestone Achieved
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enlarged Photo Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-70 bg-black/85 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActivePhoto(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh]">
            <img src={activePhoto} alt="Progress evidence" className="max-w-full max-h-[80vh] object-contain rounded-xl" />
            <p className="text-white text-center text-xs mt-2">Click anywhere to close preview</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

