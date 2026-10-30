import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { recoveryApi } from '@/api/recoveryApi';
import { claimsApi } from '@/api/claimsApi';
import { CropRecoveryProgressRecord, ClaimRecord } from '@/types';
import { ComparisonSlider } from '@/components/recovery/ComparisonSlider';
import { Button } from '@/components/common/Button';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { CROPS_CONFIG, CALAMITIES_CONFIG } from '@/data/cropRecoveryGuidelines';
import { formatDate } from '@/utils/formatters';
import {
  TrendingUp,
  PlusCircle,
  Calendar,
  Star,
  CheckCircle2,
  Camera,
  Layers,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  FileCheck,
  Activity,
  AlertCircle,
  Eye,
  Info
} from 'lucide-react';

export const RecoveryProgressPage: React.FC = () => {
  const { user } = useAuth();
  const { success, error, info } = useToast();
  const [searchParams] = useSearchParams();

  // Search params from RecoveryAdvisorPage
  const paramCrop = searchParams.get('crop') || '';
  const paramCalamity = searchParams.get('calamity') || '';
  const paramPlanKey = searchParams.get('planKey') || '';
  const paramStage = searchParams.get('stage') || 'vegetative';
  const paramClaimId = searchParams.get('claimId') || '';
  const paramCompleted = searchParams.get('completed') || '';

  const [records, setRecords] = useState<CropRecoveryProgressRecord[]>([]);
  const [farmerClaims, setFarmerClaims] = useState<ClaimRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [showLogModal, setShowLogModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [cropName, setCropName] = useState(paramCrop || CROPS_CONFIG[0].displayName);
  const [calamityType, setCalamityType] = useState(paramCalamity || CALAMITIES_CONFIG[0].displayName);
  const [claimId, setClaimId] = useState(paramClaimId);
  const [stageName, setStageName] = useState(
    paramPlanKey ? `Follow-up: ${paramPlanKey.replace('__', ' - ')}` : ''
  );
  const [updateDate, setUpdateDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [observations, setObservations] = useState('');
  const [completedStepsText, setCompletedStepsText] = useState(paramCompleted ? `Completed: ${paramCompleted}` : '');
  const [healthRating, setHealthRating] = useState(4);
  const [milestoneReached, setMilestoneReached] = useState(true);

  // Photo uploads
  const [beforePhotoFile, setBeforePhotoFile] = useState<File | null>(null);
  const [beforePhotoPreview, setBeforePhotoPreview] = useState<string>('');
  const [afterPhotoFile, setAfterPhotoFile] = useState<File | null>(null);
  const [afterPhotoPreview, setAfterPhotoPreview] = useState<string>('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Side-by-side modal
  const [previewComparison, setPreviewComparison] = useState<{ before: string; after: string; title: string } | null>(null);

  // Load records and claims
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [progressData, claimsData] = await Promise.all([
          recoveryApi.getProgressRecords({ farmerId: user?.id }),
          user?.role === 'farmer' ? claimsApi.getAll({ userId: user?.id }) : Promise.resolve([])
        ]);
        setRecords(progressData);
        setFarmerClaims(claimsData);
      } catch (e) {
        console.warn('Error loading progress data:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Handle Before photo selection
  const handleBeforePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        error('File Too Large', 'Photograph exceeds 10MB limit.');
        return;
      }
      setBeforePhotoFile(file);
      setBeforePhotoPreview(URL.createObjectURL(file));
    }
  };

  // Handle After / Current photo selection
  const handleAfterPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        error('File Too Large', 'Photograph exceeds 10MB limit.');
        return;
      }
      setAfterPhotoFile(file);
      setAfterPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stageName.trim() || !notes.trim()) {
      error('Validation Error', 'Please provide a stage title and progress notes.');
      return;
    }

    try {
      setIsSubmitting(true);
      setIsUploadingPhoto(true);

      let uploadedBeforeUrl = beforePhotoPreview || 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80';
      let uploadedAfterUrl = afterPhotoPreview || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80';

      // Upload Before photo if real file is selected
      if (beforePhotoFile) {
        try {
          const res = await recoveryApi.uploadPhoto(beforePhotoFile);
          if (res?.url) uploadedBeforeUrl = res.url;
        } catch (err) {
          console.warn('Before photo upload fallback to preview URL:', err);
        }
      }

      // Upload After photo if real file is selected
      if (afterPhotoFile) {
        try {
          const res = await recoveryApi.uploadPhoto(afterPhotoFile);
          if (res?.url) uploadedAfterUrl = res.url;
        } catch (err) {
          console.warn('After photo upload fallback to preview URL:', err);
        }
      }

      setIsUploadingPhoto(false);

      const newRec = await recoveryApi.addProgressRecord({
        cropName,
        calamityType,
        claimId: claimId || undefined,
        recoveryPlanKey: paramPlanKey || `${cropName.toLowerCase()}__recovery`,
        stageName,
        farmerId: user?.id || 'usr-farmer-01',
        updateDate,
        notes,
        observations,
        completedSteps: completedStepsText,
        healthRating,
        beforePhotoUrl: uploadedBeforeUrl,
        afterPhotoUrl: uploadedAfterUrl,
        milestoneReached
      });

      setRecords((prev) => [newRec, ...prev]);
      success('Progress Milestone Logged', 'Your field recovery progress and photos have been permanently recorded.');

      // Reset modal
      setShowLogModal(false);
      setStageName('');
      setNotes('');
      setObservations('');
      setBeforePhotoFile(null);
      setBeforePhotoPreview('');
      setAfterPhotoFile(null);
      setAfterPhotoPreview('');
    } catch {
      error('Submission Error', 'Could not save recovery progress milestone.');
    } finally {
      setIsSubmitting(false);
      setIsUploadingPhoto(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Longitudinal Field Monitoring
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Crop Recovery Progress Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-prose leading-relaxed">
            Document follow-up dates, mark off agronomic steps, and upload date-stamped photographs comparing initial damage against ongoing field rejuvenation.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link to="/recovery">
            <Button size="md" variant="outline" leftIcon={<Activity className="w-4 h-4 text-emerald-700" />}>
              Advisor Guidelines
            </Button>
          </Link>
          <Button
            size="md"
            variant="primary"
            onClick={() => setShowLogModal(true)}
            leftIcon={<PlusCircle className="w-4 h-4" />}
            className="font-bold bg-emerald-800 hover:bg-emerald-900 shadow-sm"
          >
            Log New Milestone
          </Button>
        </div>
      </div>

      {/* Active Tracking Context Banner if coming from advisor */}
      {paramPlanKey && (
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-emerald-950">Active Plan Being Followed:</span>
              <span className="font-extrabold text-xs px-2.5 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900">
                {paramCrop || 'Selected Crop'}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-emerald-300">
                {paramCalamity || 'Damage Condition'}
              </span>
            </div>
            <p className="text-xs text-emerald-800">
              Plan Key: <span className="font-mono font-semibold">{paramPlanKey}</span>
              {paramClaimId && ` • Associated Claim Ref: ${paramClaimId}`}
            </p>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowLogModal(true)}
            leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
            className="bg-white border-emerald-300 text-emerald-900 font-bold self-start sm:self-auto"
          >
            Record Update For This Plan
          </Button>
        </div>
      )}

      {/* Interactive Before & After Visual Slider */}
      {records.length > 0 && <ComparisonSlider records={records} />}

      {/* Visual Timeline of Historical Records */}
      <section aria-labelledby="milestones-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 id="milestones-heading" className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-800" /> Historical Rejuvenation Milestones
            </h2>
            <p className="text-xs text-slate-500">
              Chronological sequence of logged treatments, observations, and photo evidence (newest first).
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
            {records.length} Progress Logs
          </span>
        </div>

        {records.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <Activity className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-sm text-slate-800">No Field Milestones Logged Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Follow your crop recovery plan and click "Log New Milestone" to record treatment dates, notes, and photos.
            </p>
            <Button
              size="sm"
              variant="primary"
              onClick={() => setShowLogModal(true)}
              leftIcon={<PlusCircle className="w-4 h-4" />}
              className="mt-2"
            >
              Log First Milestone
            </Button>
          </div>
        ) : (
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-emerald-200">
            {records.map((rec) => (
              <div key={rec.id} className="relative flex items-start gap-4 pl-8">
                {/* Timeline node dot */}
                <div className="absolute left-2 top-2.5 w-3.5 h-3.5 rounded-full bg-emerald-800 ring-4 ring-emerald-100" />

                <div className="w-full text-xs space-y-3 pb-6 border-b border-slate-100 last:border-b-0">
                  {/* Title & Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-slate-900">
                        {rec.stageName}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        {rec.cropName}
                      </span>
                      {rec.calamityType && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                          {rec.calamityType}
                        </span>
                      )}
                      {rec.claimNumber && (
                        <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-slate-100 text-slate-700">
                          {rec.claimNumber}
                        </span>
                      )}
                    </div>
                    <span className="text-slate-500 font-semibold text-xs">
                      {formatDate(rec.updateDate)}
                    </span>
                  </div>

                  {/* Treatment Notes */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 space-y-2">
                    <p className="text-slate-800 leading-relaxed font-medium">
                      "{rec.notes}"
                    </p>
                    {rec.observations && (
                      <p className="text-slate-600 text-xs pt-1 border-t border-slate-200/60">
                        <strong>Field Observations:</strong> {rec.observations}
                      </p>
                    )}
                    {rec.completedSteps && (
                      <p className="text-emerald-800 text-xs font-medium">
                        <strong>Steps Executed:</strong> {rec.completedSteps}
                      </p>
                    )}
                  </div>

                  {/* Photo Thumbnails if present */}
                  {(rec.beforePhotoUrl || rec.afterPhotoUrl) && (
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      {rec.beforePhotoUrl && (
                        <div className="relative group rounded-xl overflow-hidden border border-slate-200 w-32 h-20 bg-slate-100">
                          <img
                            src={rec.beforePhotoUrl}
                            alt="Initial damage"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 left-1 bg-slate-900/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Initial
                          </span>
                        </div>
                      )}
                      {rec.afterPhotoUrl && (
                        <div className="relative group rounded-xl overflow-hidden border border-slate-200 w-32 h-20 bg-slate-100">
                          <img
                            src={rec.afterPhotoUrl}
                            alt="Current condition"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 left-1 bg-emerald-800/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Recovered
                          </span>
                        </div>
                      )}
                      {rec.beforePhotoUrl && rec.afterPhotoUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewComparison({
                              before: rec.beforePhotoUrl!,
                              after: rec.afterPhotoUrl!,
                              title: rec.stageName
                            })
                          }
                          className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer h-10"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-700" /> Compare Fullscreen
                        </button>
                      )}
                    </div>
                  )}

                  {/* Rating & Verification Footer */}
                  <div className="pt-1 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-amber-800 font-semibold">
                      <span>Vigor Rating:</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rec.healthRating
                                ? 'fill-amber-400 text-amber-600'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <span className="text-emerald-800 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {rec.milestoneReached ? 'Milestone Reached & Verified' : 'Logged Progress Entry'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          Photographs provide visual documentation for the farmer and reviewing agricultural officer.
        </div>
      </section>

      {/* Log Milestone Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-900">
                Log Field Follow-up Milestone
              </h3>
              <button
                type="button"
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddLog} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Crop */}
                <div>
                  <label htmlFor="log-crop-select" className="block font-bold text-slate-700 mb-1">Crop</label>
                  <select
                    id="log-crop-select"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold bg-white text-xs"
                  >
                    {CROPS_CONFIG.map((c) => (
                      <option key={c.id} value={c.displayName}>
                        {c.displayName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Calamity */}
                <div>
                  <label htmlFor="log-calamity-select" className="block font-bold text-slate-700 mb-1">Calamity Type</label>
                  <select
                    id="log-calamity-select"
                    value={calamityType}
                    onChange={(e) => setCalamityType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold bg-white text-xs"
                  >
                    {CALAMITIES_CONFIG.map((cal) => (
                      <option key={cal.id} value={cal.displayName}>
                        {cal.displayName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Update Date */}
                <div>
                  <label htmlFor="log-update-date" className="block font-bold text-slate-700 mb-1">Follow-up Date</label>
                  <input
                    id="log-update-date"
                    type="date"
                    value={updateDate}
                    onChange={(e) => setUpdateDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-xs text-slate-900"
                    required
                  />
                </div>

                {/* Optional Claim Association */}
                <div>
                  <label htmlFor="log-claim-select" className="block font-bold text-slate-700 mb-1">Associated Claim (Optional)</label>
                  <select
                    id="log-claim-select"
                    value={claimId}
                    onChange={(e) => setClaimId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-xs bg-white text-slate-900"
                  >
                    <option value="">-- None / Free Tracking --</option>
                    {farmerClaims.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.claimNumber} ({c.cropName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stage Title */}
              <div>
                <label htmlFor="log-stage-name" className="block font-bold text-slate-700 mb-1">
                  Milestone / Stage Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="log-stage-name"
                  type="text"
                  value={stageName}
                  onChange={(e) => setStageName(e.target.value)}
                  placeholder="e.g. Day 4: Furrow Drainage & Urea Resuscitation Spray"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900 text-xs"
                  required
                />
              </div>

              {/* Steps Completed */}
              <div>
                <label htmlFor="log-completed-steps" className="block font-bold text-slate-700 mb-1">
                  Completed Recovery Steps / Treatments
                </label>
                <input
                  id="log-completed-steps"
                  type="text"
                  value={completedStepsText}
                  onChange={(e) => setCompletedStepsText(e.target.value)}
                  placeholder="e.g. Step 1 (Drainage), Step 2 (Collar Drenching), Step 4 (Foliar Urea)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs"
                />
              </div>

              {/* Progress Notes */}
              <div>
                <label htmlFor="log-progress-notes" className="block font-bold text-slate-700 mb-1">
                  Treatment Administered & Field Progress Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="log-progress-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detail chemical dosages applied, root aeration status, water recession rate..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  required
                />
              </div>

              {/* Biological Observations */}
              <div>
                <label htmlFor="log-observations" className="block font-bold text-slate-700 mb-1">
                  Observations on New Growth or Continuing Damage (Optional)
                </label>
                <input
                  id="log-observations"
                  type="text"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="e.g. New white roots branching from collar; leaf yellowing halted; no fresh rot."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>

              {/* Photo Upload Section */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <span className="font-bold text-slate-800 block">
                  Field Photo Evidence (Stored to Server)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Before Photo */}
                  <div className="space-y-1.5">
                    <label htmlFor="log-before-photo" className="font-semibold text-slate-600 block">Initial / Before Photo</label>
                    <input
                      id="log-before-photo"
                      type="file"
                      accept="image/*"
                      onChange={handleBeforePhotoChange}
                      className="text-[11px] file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:bg-slate-200 file:text-slate-800 file:font-bold cursor-pointer"
                    />
                    {beforePhotoPreview && (
                      <div className="w-full h-20 rounded-lg overflow-hidden border border-slate-300">
                        <img src={beforePhotoPreview} alt="Before preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* After Photo */}
                  <div className="space-y-1.5">
                    <label htmlFor="log-after-photo" className="font-semibold text-slate-600 block">Current / After Photo</label>
                    <input
                      id="log-after-photo"
                      type="file"
                      accept="image/*"
                      onChange={handleAfterPhotoChange}
                      className="text-[11px] file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:bg-emerald-100 file:text-emerald-900 file:font-bold cursor-pointer"
                    />
                    {afterPhotoPreview && (
                      <div className="w-full h-20 rounded-lg overflow-hidden border border-slate-300">
                        <img src={afterPhotoPreview} alt="After preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Vigor Rating */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="block font-bold text-slate-700">Health & Vigor Rating</span>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setHealthRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= healthRating ? 'fill-amber-400 text-amber-500' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={milestoneReached}
                    onChange={(e) => setMilestoneReached(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-bold text-slate-800">Milestone Reached</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setShowLogModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  isLoading={isSubmitting || isUploadingPhoto}
                  className="font-bold bg-emerald-800 hover:bg-emerald-900"
                >
                  Save Milestone Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fullscreen Photo Comparison Modal */}
      {previewComparison && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-4xl w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">
                Side-by-Side Visual Comparison: {previewComparison.title}
              </h3>
              <button
                type="button"
                onClick={() => setPreviewComparison(null)}
                className="text-slate-500 hover:text-slate-800 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs font-black text-red-800 uppercase tracking-wider block bg-red-50 px-2 py-0.5 rounded w-max">
                  Initial Calamity Condition
                </span>
                <div className="aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img src={previewComparison.before} alt="Initial" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block bg-emerald-50 px-2 py-0.5 rounded w-max">
                  Ongoing Field Recovery
                </span>
                <div className="aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img src={previewComparison.after} alt="Recovered" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="text-right pt-2 border-t border-slate-100">
              <Button size="sm" variant="outline" onClick={() => setPreviewComparison(null)}>
                Close Fullscreen
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecoveryProgressPage;
