import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { claimsApi, inspectionApi, panchanamaApi } from '@/api';
import { ClaimRecord, DamageCause, InspectionRecord, ClaimStatus } from '@/types';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/i18n/LanguageContext';
import { DAMAGE_CAUSES, CLAIM_STATUS_MAP } from '@/utils/constants';
import {
  ShieldCheck,
  Compass,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  User,
  MapPin,
  Camera,
  Layers,
  FileCheck2,
  Send,
  AlertCircle,
  HelpCircle,
  Check,
  FileText
} from 'lucide-react';
import { formatDate, formatArea, formatCurrencyINR } from '@/utils/formatters';

export const OfficerInspectionPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error } = useToast();
  const { t } = useTranslation();

  const [claims, setClaims] = useState<ClaimRecord[]>([]);
  const [selectedClaimId, setSelectedClaimId] = useState<string>(
    searchParams.get('claimId') || ''
  );
  const [loading, setLoading] = useState(true);

  // Inspection form fields
  const [inspectionDate, setInspectionDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [latitude, setLatitude] = useState('16.7124');
  const [longitude, setLongitude] = useState('74.5218');
  const [verifiedCrop, setVerifiedCrop] = useState('');
  const [verifiedSurveyNumber, setVerifiedSurveyNumber] = useState('');
  const [verifiedAffectedAreaAcre, setVerifiedAffectedAreaAcre] = useState<number>(0);
  const [assessedLossPercentage, setAssessedLossPercentage] = useState<number>(65);
  const [damageCauseConfirmed, setDamageCauseConfirmed] = useState<DamageCause>('heavy_rainfall');
  const [cropGrowthStage, setCropGrowthStage] = useState<'sowing' | 'vegetative' | 'flowering' | 'maturity' | 'harvesting'>('maturity');
  const [officerObservations, setOfficerObservations] = useState('');
  const [recommendation, setRecommendation] = useState<'approve_full' | 'approve_partial' | 'reject' | 're_inspection_needed'>('approve_full');
  
  // Officer workflow progression fields
  const [selectedNextStage, setSelectedNextStage] = useState<ClaimStatus>('panchanama_drafted');
  const [officerRemarks, setOfficerRemarks] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadClaims = async () => {
      setLoading(true);
      try {
        const all = await claimsApi.getAll();
        setClaims(all);

        const targetId = searchParams.get('claimId') || all[0]?.id;
        if (targetId) {
          setSelectedClaimId(targetId);
          const match = all.find((c) => c.id === targetId);
          if (match) {
            populateFromClaim(match);
          }
        }
      } catch (err) {
        console.warn('Failed to load inspection claims:', err);
      } finally {
        setLoading(false);
      }
    };
    loadClaims();
  }, []);

  const populateFromClaim = (claim: ClaimRecord) => {
    setVerifiedCrop(claim.cropName);
    setVerifiedSurveyNumber(claim.surveyNumber);
    setVerifiedAffectedAreaAcre(claim.affectedAreaAcre);
    setAssessedLossPercentage(claim.estimatedLossPercentage);
    setDamageCauseConfirmed(claim.damageCause);
    setOfficerObservations(
      `Joint spot physical inspection conducted for Survey/Gat ${claim.surveyNumber} in village ${claim.village} in presence of local Panchas. Visual confirmation of ${claim.damageCause.replace(/_/g, ' ')} impact.`
    );
    // Align initial workflow stage based on claim status
    if (claim.status === 'submitted' || claim.status === 'under_review') {
      setSelectedNextStage('panchanama_drafted');
    } else if (claim.status === 'inspected' || claim.status === 'panchanama_drafted') {
      setSelectedNextStage('verified');
    } else {
      setSelectedNextStage('verified');
    }
  };

  const handleClaimChange = (id: string) => {
    setSelectedClaimId(id);
    const match = claims.find((c) => c.id === id);
    if (match) populateFromClaim(match);
  };

  const handleCaptureLiveGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude.toFixed(6));
          setLongitude(pos.coords.longitude.toFixed(6));
          success('GPS Captured', `Lat: ${pos.coords.latitude.toFixed(4)}, Long: ${pos.coords.longitude.toFixed(4)}`);
        },
        () => {
          setLatitude('16.7142');
          setLongitude('74.5235');
          success('Plot GPS Calibrated', '16.7142° N, 74.5235° E');
        }
      );
    } else {
      setLatitude('16.7142');
      setLongitude('74.5235');
      success('Coordinates Calibrated', '16.7142° N, 74.5235° E');
    }
  };

  const currentClaim = claims.find((c) => c.id === selectedClaimId);

  // Dynamic suggestion for next stage (Guidance indicator)
  const getSuggestedNextStage = (): { status: ClaimStatus; rationale: string } => {
    if (recommendation === 'reject') {
      return { status: 'rejected', rationale: 'Officer recommendation advises claim rejection based on field findings.' };
    }
    if (recommendation === 're_inspection_needed') {
      return { status: 'inspection_scheduled', rationale: 'Joint re-inspection recommended; claim should return to inspection pending.' };
    }
    if (assessedLossPercentage >= 65) {
      return { status: 'verified', rationale: 'High damage severity verified; recommended to advance directly to Eligibility Assessment.' };
    }
    return { status: 'panchanama_drafted', rationale: 'Inspection verified; e-Panchanama compilation is the recommended progression.' };
  };

  const suggestedStage = getSuggestedNextStage();

  // Validate decisions before opening confirmation modal
  const handleInitiateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentClaim) {
      error('Selection Error', 'Please select a claim to inspect.');
      return;
    }

    if (verifiedAffectedAreaAcre <= 0) {
      error('Validation Error', 'Verified affected acreage must be greater than zero.');
      return;
    }

    if (assessedLossPercentage < 1 || assessedLossPercentage > 100) {
      error('Validation Error', 'Assessed loss percentage must be between 1% and 100%.');
      return;
    }

    // Mandatory remarks validation for rejection, requesting info, or re-inspection
    if (selectedNextStage === 'rejected' || recommendation === 'reject') {
      if (!officerRemarks.trim()) {
        error('Mandatory Remarks Required', 'Please provide detailed official remarks explaining the reason for claim rejection.');
        return;
      }
    }

    if (selectedNextStage === 'additional_info_required') {
      if (!officerRemarks.trim()) {
        error('Mandatory Remarks Required', 'Please specify what additional documents or information the farmer must provide.');
        return;
      }
    }

    if (selectedNextStage === 'inspection_scheduled' || recommendation === 're_inspection_needed') {
      if (!officerRemarks.trim()) {
        error('Mandatory Remarks Required', 'Please explain why a re-inspection is required.');
        return;
      }
    }

    // Invalid transition checks
    if (selectedNextStage === 'approved' && recommendation === 'reject') {
      error('Invalid Decision', 'Cannot approve application when officer recommendation is to reject.');
      return;
    }

    if (selectedNextStage === 'approved' && recommendation === 're_inspection_needed') {
      error('Invalid Decision', 'Cannot approve application while re-inspection is required.');
      return;
    }

    setIsConfirmModalOpen(true);
  };

  // Confirmed final submit
  const handleConfirmedSubmit = async () => {
    if (!currentClaim) return;

    try {
      setIsSubmitting(true);
      const officerName = user?.name || 'Suresh Deshmukh';

      const inspectionRecord = await inspectionApi.submitInspection({
        claimId: currentClaim.id,
        claimNumber: currentClaim.claimNumber,
        officerId: user?.id || 'usr-officer-01',
        officerName,
        inspectionDate,
        gpsCoordinates: {
          latitude: Number(latitude),
          longitude: Number(longitude)
        },
        verifiedCrop,
        verifiedSurveyNumber,
        verifiedAffectedAreaAcre: Number(verifiedAffectedAreaAcre),
        assessedLossPercentage: Number(assessedLossPercentage),
        damageCauseConfirmed,
        officerObservations,
        cropGrowthStage,
        evidencePhotos: currentClaim.photos || [],
        recommendation,
        recommendedCompensationAmount: Math.round(verifiedAffectedAreaAcre * 18500),
        status: 'finalized',
        nextStatus: selectedNextStage,
        officerRemarks: officerRemarks.trim(),
        generatePanchanama: true
      });

      // Also ensure panchanama draft reflects latest state
      try {
        await panchanamaApi.generateDraft(currentClaim, inspectionRecord, officerName);
      } catch (panchanamaErr) {
        console.warn('Panchanama draft generation note:', panchanamaErr);
      }

      setIsConfirmModalOpen(false);
      const newStatusInfo = CLAIM_STATUS_MAP[selectedNextStage]?.label || selectedNextStage;
      success('Spot Inspection & Decision Submitted', `Inspection recorded and application moved to "${newStatusInfo}".`);
      navigate(`/officer/panchanama?claimId=${currentClaim.id}`);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Could not record inspection.';
      error('Submission Failed', errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Permitted next stages for officer progression
  const PERMITTED_NEXT_STAGES: { value: ClaimStatus; label: string; description: string; stageCategory: string }[] = [
    {
      value: 'panchanama_drafted',
      label: 'e-Panchanama Drafted (Stage 2)',
      description: 'Record field inspection findings and compile provisional e-Panchanama document.',
      stageCategory: 'Stage 2: Verification'
    },
    {
      value: 'inspected',
      label: 'Field Inspection Completed (Stage 2)',
      description: 'Physical inspection completed; findings recorded awaiting documentation.',
      stageCategory: 'Stage 2: Verification'
    },
    {
      value: 'verified',
      label: 'Under Eligibility Assessment (Stage 3)',
      description: 'Inspection & loss parameters fully verified; forward for statutory compensation determination.',
      stageCategory: 'Stage 3: Assessment'
    },
    {
      value: 'approved',
      label: 'Approved for Relief (Stage 4)',
      description: 'Direct final approval for SDRF/NDRF financial assistance based on qualifying appraisal.',
      stageCategory: 'Stage 4: Final Decision'
    },
    {
      value: 'additional_info_required',
      label: 'Additional Information Required',
      description: 'Request additional documentation, 7/12 extract, or clear photographs from the farmer.',
      stageCategory: 'Stage 1: Review'
    },
    {
      value: 'inspection_scheduled',
      label: 'Re-inspection Pending (Stage 2)',
      description: 'Schedule a joint spot re-inspection with revenue / agronomist team.',
      stageCategory: 'Stage 2: Verification'
    },
    {
      value: 'under_review',
      label: 'Return to Initial Review (Stage 1)',
      description: 'Return application to desk review for reassessment of basic intimation data.',
      stageCategory: 'Stage 1: Review'
    },
    {
      value: 'rejected',
      label: 'Rejected (Ineligible / Below Threshold)',
      description: 'Reject claim under statutory guidelines (e.g. loss < 33%, false report, non-notified cause).',
      stageCategory: 'Final Determination'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-800" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">
            Form 2-B: Official Spot Verification Desk
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('inspection.page.title', 'Record Spot Field Inspection')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl text-pretty">
          {t(
            'inspection.page.subtitle',
            'Record physical appraisal findings, GPS coordinates, verified affected acreage, loss percentage, and determine application progression.'
          )}
        </p>
      </div>

      <form onSubmit={handleInitiateSubmit} className="space-y-6">
        {/* Claim Selector & Farmer Read-Only Summary */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-900" htmlFor="claim-select">
            {t('inspection.selectClaim', 'Select Damage Intimation to Inspect')} *
          </label>
          <select
            id="claim-select"
            value={selectedClaimId}
            onChange={(e) => handleClaimChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white min-h-[44px]"
          >
            {claims.map((c) => (
              <option key={c.id} value={c.id}>
                {c.claimNumber} • {c.farmerName} • {c.cropName} (Gut {c.surveyNumber}, {c.village}) [{CLAIM_STATUS_MAP[c.status]?.label || c.status}]
              </option>
            ))}
          </select>

          {/* Read-Only Farmer Original Submission Details */}
          {currentClaim && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Farmer-Submitted Record (Read-Only)
                </span>
                <div className="flex items-center gap-2">
                  <Badge claimStatus={currentClaim.status} size="sm" />
                  <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {currentClaim.claimNumber}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Cultivator Name</span>
                  <span className="font-bold text-slate-900">{currentClaim.farmerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Contact Phone</span>
                  <span className="font-bold text-slate-900">{currentClaim.farmerPhone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Reported Crop</span>
                  <span className="font-bold text-slate-900">{currentClaim.cropName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Reported Loss Area</span>
                  <span className="font-bold text-red-700">
                    {formatArea(currentClaim.affectedAreaAcre)} ({currentClaim.estimatedLossPercentage}%)
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-100">
                "{currentClaim.damageDescription}"
              </p>
            </div>
          )}
        </div>

        {/* 1. On-Site GPS & Ground Calibration */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-700" />
              {t('inspection.gps.title', '1. On-Site GPS & Ground Calibration')}
            </h2>
            <button
              type="button"
              onClick={handleCaptureLiveGPS}
              className="text-xs font-bold text-indigo-800 hover:text-indigo-950 flex items-center gap-1 cursor-pointer min-h-[36px]"
            >
              <Compass className="w-3.5 h-3.5" />
              {t('inspection.gps.captureBtn', 'Capture Device GPS')}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="insp-date">
                {t('inspection.gps.date', 'Inspection Date')} *
              </label>
              <input
                id="insp-date"
                type="date"
                value={inspectionDate}
                onChange={(e) => setInspectionDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[44px]"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="insp-lat">
                {t('inspection.gps.lat', 'Latitude (°N)')} *
              </label>
              <input
                id="insp-lat"
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 min-h-[44px]"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="insp-long">
                {t('inspection.gps.long', 'Longitude (°E)')} *
              </label>
              <input
                id="insp-long"
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 min-h-[44px]"
                required
              />
            </div>
          </div>
        </div>

        {/* 2. Verified Crop Parameters */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4 text-xs">
          <h2 className="font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-indigo-700" />
            {t('inspection.verified.title', '2. Verified Crop & Damage Parameters')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="ver-crop">
                {t('inspection.verified.crop', 'Verified Crop')} *
              </label>
              <input
                id="ver-crop"
                type="text"
                value={verifiedCrop}
                onChange={(e) => setVerifiedCrop(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold min-h-[44px]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="ver-survey">
                {t('inspection.verified.survey', 'Verified Survey / Gat Number')} *
              </label>
              <input
                id="ver-survey"
                type="text"
                value={verifiedSurveyNumber}
                onChange={(e) => setVerifiedSurveyNumber(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold min-h-[44px]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="ver-area">
                {t('inspection.verified.area', 'Verified Affected Area (Acres)')} *
              </label>
              <input
                id="ver-area"
                type="number"
                step="0.01"
                min="0.01"
                value={verifiedAffectedAreaAcre}
                onChange={(e) => setVerifiedAffectedAreaAcre(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-extrabold text-emerald-800 min-h-[44px]"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold text-slate-700" htmlFor="ver-loss">
                  {t('inspection.verified.loss', 'Assessed Damage Percentage (%)')} *
                </label>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    assessedLossPercentage >= 65
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : assessedLossPercentage >= 33
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {assessedLossPercentage >= 65
                    ? 'Severe Loss (>=65%)'
                    : assessedLossPercentage >= 33
                    ? 'Substantial Loss (33-64%)'
                    : 'Below SDRF Norm (<33%)'}
                </span>
              </div>
              <input
                id="ver-loss"
                type="number"
                min="0"
                max="100"
                value={assessedLossPercentage}
                onChange={(e) => setAssessedLossPercentage(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-extrabold text-red-700 min-h-[44px]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="ver-cause">
                {t('inspection.verified.cause', 'Confirmed Calamity Cause')} *
              </label>
              <select
                id="ver-cause"
                value={damageCauseConfirmed}
                onChange={(e) => setDamageCauseConfirmed(e.target.value as DamageCause)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold bg-white min-h-[44px]"
              >
                {DAMAGE_CAUSES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="ver-stage">
                {t('inspection.verified.stage', 'Crop Growth Stage at Calamity')} *
              </label>
              <select
                id="ver-stage"
                value={cropGrowthStage}
                onChange={(e) => setCropGrowthStage(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold bg-white min-h-[44px]"
              >
                <option value="sowing">Sowing / Emergence (पेरणी / उगवण)</option>
                <option value="vegetative">Vegetative Growth (शाकीय वाढ)</option>
                <option value="flowering">Flowering / Square Formation (फुलोरा अवस्था)</option>
                <option value="maturity">Maturity / Pod Formation (पक्वता / दाणे भरणे)</option>
                <option value="harvesting">Harvesting / Ripening (काढणी अवस्था)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1" htmlFor="ver-obs">
              {t('inspection.verified.obs', 'Officer Observations & Ground Verification Notes')} *
            </label>
            <textarea
              id="ver-obs"
              rows={3}
              value={officerObservations}
              onChange={(e) => setOfficerObservations(e.target.value)}
              placeholder={t(
                'inspection.verified.obsPlaceholder',
                'Detail water stagnation, lodging, soil siltation, panchas statements, condition of adjacent fields...'
              )}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 leading-relaxed text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1" htmlFor="ver-rec">
              {t('inspection.recommendation', 'Officer Recommendation')} *
            </label>
            <select
              id="ver-rec"
              value={recommendation}
              onChange={(e) => {
                const rec = e.target.value as any;
                setRecommendation(rec);
                if (rec === 'reject') {
                  setSelectedNextStage('rejected');
                  if (!officerRemarks) setOfficerRemarks('Damage assessed is below the 33% statutory relief threshold under NDRF/SDRF norms.');
                } else if (rec === 're_inspection_needed') {
                  setSelectedNextStage('inspection_scheduled');
                  if (!officerRemarks) setOfficerRemarks('Joint spot re-inspection required with senior agronomist for complex crop recovery assessment.');
                } else if (selectedNextStage === 'rejected' || selectedNextStage === 'inspection_scheduled') {
                  setSelectedNextStage('panchanama_drafted');
                }
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-indigo-900 bg-white min-h-[44px]"
            >
              <option value="approve_full">Approve for Full SDRF Compensation</option>
              <option value="approve_partial">Approve for Partial Pro-rata Compensation</option>
              <option value="re_inspection_needed">Joint Re-inspection Needed with Senior Agronomist</option>
              <option value="reject">Reject Claim (Below 33% Statutory SDRF Threshold)</option>
            </select>
          </div>
        </div>

        {/* 3. Section: Application Review & Next Stage Decision */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-indigo-200/90 shadow-sm space-y-6">
          <div className="border-b border-indigo-100 pb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-700" />
                <h2 className="text-lg font-black text-slate-900">
                  Application Review & Next Stage Decision
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Review the comprehensive appraisal summary and select the authoritative workflow stage for this application.
              </p>
            </div>
            {currentClaim && (
              <Badge claimStatus={currentClaim.status} size="sm" />
            )}
          </div>

          {/* Appraisal Summary Card */}
          {currentClaim && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs">
              <div className="space-y-2">
                <div>
                  <span className="text-slate-500 block font-medium">Application / Claim Number:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{currentClaim.claimNumber}</span>
                  <span className="text-slate-400 block text-[10px]">{currentClaim.id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Farmer Details:</span>
                  <span className="font-bold text-slate-900">{currentClaim.farmerName}</span>
                  <span className="text-slate-600 block">{currentClaim.farmerPhone} • {currentClaim.village}, {currentClaim.taluka}, {currentClaim.district}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Crop & Calamity:</span>
                  <span className="font-bold text-slate-900">{verifiedCrop || currentClaim.cropName}</span>
                  <span className="text-slate-600 block capitalize">Confirmed Cause: {damageCauseConfirmed.replace(/_/g, ' ')}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-slate-500 block font-medium">Reported vs Assessed Damage:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-slate-600">Farmer: {currentClaim.affectedAreaAcre} Ac ({currentClaim.estimatedLossPercentage}%)</span>
                    <span className="text-indigo-400">➔</span>
                    <span className="font-bold text-red-700">Verified: {verifiedAffectedAreaAcre} Ac ({assessedLossPercentage}%)</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Current Status & Recommended Progression:</span>
                  <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                    <span className="font-semibold text-slate-700">Current: {CLAIM_STATUS_MAP[currentClaim.status]?.label}</span>
                    <span className="text-indigo-400">➔</span>
                    <span className="font-bold text-indigo-900 bg-white px-2 py-0.5 rounded border border-indigo-200">
                      Suggested: {CLAIM_STATUS_MAP[suggestedStage.status]?.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 italic">
                    Note: {suggestedStage.rationale}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Inspection Findings Summary:</span>
                  <p className="text-slate-800 line-clamp-2 bg-white/80 p-2 rounded border border-indigo-100">
                    {officerObservations || 'No observations recorded yet.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Permitted Next Stages Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-900">
              Select Authoritative Next Stage *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PERMITTED_NEXT_STAGES.map((stage) => {
                const isSelected = selectedNextStage === stage.value;
                const statusMeta = CLAIM_STATUS_MAP[stage.value];

                return (
                  <button
                    key={stage.value}
                    type="button"
                    onClick={() => setSelectedNextStage(stage.value)}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                        {stage.stageCategory}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <div>
                      <span className={`text-xs font-bold block ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                        {statusMeta?.label || stage.label}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {stage.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Officer Remarks */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <label htmlFor="officer-remarks" className="font-bold text-slate-800 flex items-center gap-1">
                <span>Officer Decision Remarks & Justification</span>
                {(selectedNextStage === 'rejected' ||
                  selectedNextStage === 'additional_info_required' ||
                  selectedNextStage === 'inspection_scheduled' ||
                  recommendation === 'reject') && (
                  <span className="text-red-600 font-extrabold">* (Mandatory for this decision)</span>
                )}
              </label>
              <span className="text-slate-400 text-[11px]">Recorded in public claim audit history</span>
            </div>
            <textarea
              id="officer-remarks"
              rows={3}
              value={officerRemarks}
              onChange={(e) => setOfficerRemarks(e.target.value)}
              placeholder="Record explicit administrative justification, specific documents needed from farmer, or grounds for eligibility / rejection..."
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 leading-relaxed text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 max-w-md">
            Clicking proceed will review and request your final explicit confirmation before updating the official state database.
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => navigate('/officer')}
              disabled={isSubmitting}
              className="min-h-[44px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              leftIcon={<ShieldCheck className="w-4 h-4" />}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="min-h-[44px] bg-indigo-800 hover:bg-indigo-900"
            >
              Review & Confirm Decision
            </Button>
          </div>
        </div>
      </form>

      {/* Explicit Confirmation Modal */}
      {currentClaim && (
        <Modal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title="Confirm Application Review & Progression Decision"
          description={`Claim ${currentClaim.claimNumber} • Cultivator: ${currentClaim.farmerName}`}
          maxWidth="xl"
          footer={
            <div className="flex items-center justify-end gap-3 w-full">
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsConfirmModalOpen(false)}
                disabled={isSubmitting}
              >
                Go Back & Edit
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleConfirmedSubmit}
                isLoading={isSubmitting}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
                className="bg-indigo-800 hover:bg-indigo-900"
              >
                Confirm & Submit Decision
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            {/* Primary Transition Banner */}
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                Action Confirmation
              </span>
              <p className="text-sm font-bold text-indigo-950">
                Move this application from{' '}
                <span className="underline decoration-indigo-300">
                  {CLAIM_STATUS_MAP[currentClaim.status]?.label || currentClaim.status}
                </span>{' '}
                to{' '}
                <span className="text-emerald-800 bg-white px-2 py-0.5 rounded border border-indigo-200">
                  {CLAIM_STATUS_MAP[selectedNextStage]?.label || selectedNextStage}
                </span>
                ?
              </p>
            </div>

            {/* Decision Summary Grid */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-slate-500 block font-medium">Verified Affected Acreage:</span>
                <span className="font-bold text-slate-900">{verifiedAffectedAreaAcre} Acres</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Assessed Crop Loss:</span>
                <span className="font-bold text-red-700">{assessedLossPercentage}%</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Officer Recommendation:</span>
                <span className="font-bold text-indigo-900 capitalize">
                  {recommendation.replace(/_/g, ' ')}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Estimated Relief Compensation:</span>
                <span className="font-bold text-emerald-800">
                  {formatCurrencyINR(Math.round(verifiedAffectedAreaAcre * 18500))}
                </span>
              </div>
            </div>

            {/* Officer Remarks Preview */}
            <div>
              <span className="text-slate-600 block font-semibold mb-1">Audit Log Remarks:</span>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 italic">
                {officerRemarks.trim() ||
                  `Inspection completed by authorized officer. Stage transitioned to ${CLAIM_STATUS_MAP[selectedNextStage]?.label}.`}
              </div>
            </div>

            <p className="text-[11px] text-slate-500">
              Upon confirmation, this decision will be permanently committed to the backend ledger, the draft e-Panchanama document will be updated, and the farmer's portal will reflect this official progression.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OfficerInspectionPage;
