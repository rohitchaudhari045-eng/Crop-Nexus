import React, { useState, useEffect } from 'react';
import { recoveryApi } from '@/services/apiService';
import { CropRecoveryProgressRecord } from '@/types';
import { ComparisonSlider } from '@/components/recovery/ComparisonSlider';
import { Button } from '@/components/common/Button';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import {
  TrendingUp,
  PlusCircle,
  Calendar,
  Star,
  CheckCircle2,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';
import { formatDate } from '@/utils/formatters';

export const RecoveryProgressPage: React.FC = () => {
  const { user } = useAuth();
  const { success, error } = useToast();
  const [records, setRecords] = useState<CropRecoveryProgressRecord[]>([]);
  const [showLogModal, setShowLogModal] = useState(false);
  const [stageName, setStageName] = useState('');
  const [notes, setNotes] = useState('');
  const [healthRating, setHealthRating] = useState(4);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await recoveryApi.getProgressRecords();
      setRecords(data);
    };
    fetchRecords();
  }, []);

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stageName.trim() || !notes.trim()) {
      error('Validation', 'Please provide a stage title and progress notes.');
      return;
    }

    try {
      setIsSubmitting(true);
      const newRec = await recoveryApi.addProgressRecord({
        cropName: 'Sugarcane',
        stageName,
        farmerId: user?.id || 'usr-farmer-01',
        updateDate: new Date().toISOString().split('T')[0],
        notes,
        healthRating,
        beforePhotoUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
        afterPhotoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        milestoneReached: true
      });

      setRecords((prev) => [newRec, ...prev]);
      success('Progress Milestone Logged', 'Your field recovery log has been recorded.');
      setShowLogModal(false);
      setStageName('');
      setNotes('');
    } catch {
      error('Error', 'Could not record milestone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Crop Recovery Progress
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-prose mt-1">
            Track follow-up dates, side-by-side photo comparisons, and milestone notes documenting how your damaged plots are recuperating.
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          onClick={() => setShowLogModal(true)}
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Log New Milestone
        </Button>
      </div>

      {/* Interactive Before & After Visual Slider */}
      {records.length > 0 && <ComparisonSlider records={records} />}

      {/* Visual Timeline of Historical Records */}
      <section aria-labelledby="milestones-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <h2 id="milestones-heading" className="font-bold text-base text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <Calendar className="w-4 h-4 text-emerald-800" /> Historical Rejuvenation Milestones
        </h2>

        <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-emerald-200">
          {records.map((rec) => (
            <div key={rec.id} className="relative flex items-start gap-4 pl-8">
              <div className="absolute left-2 top-2 w-3.5 h-3.5 rounded-full bg-emerald-800 ring-4 ring-emerald-100" />

              <div className="w-full text-xs space-y-2 pb-4 border-b border-slate-100 last:border-b-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{rec.stageName}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      {rec.cropName}
                    </span>
                  </div>
                  <span className="text-slate-600 font-medium">{formatDate(rec.updateDate)}</span>
                </div>

                <p className="text-slate-700 leading-relaxed italic max-w-prose">"{rec.notes}"</p>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-800 font-semibold">
                    <span>Vigor Rating:</span>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rec.healthRating
                            ? 'fill-amber-400 text-amber-700'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-emerald-800 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Milestone Verified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Log Milestone Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-slate-900">Record Field Follow-up</h3>
            <form onSubmit={handleAddLog} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Milestone Stage Title
                </label>
                <input
                  type="text"
                  value={stageName}
                  onChange={(e) => setStageName(e.target.value)}
                  placeholder="e.g. Day 14 Follow-up — Soil Dressing & Tillering"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-900 placeholder:text-slate-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Health & Vigor Rating (1 to 5)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setHealthRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= healthRating
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Field Observations & Treatment Administered
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detail changes in foliage color, newly emerged shoots, soil dryness level..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-900 placeholder:text-slate-500"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setShowLogModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting}>
                  Save Milestone
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecoveryProgressPage;
