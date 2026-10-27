import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { claimsApi, inspectionApi, panchanamaApi } from '@/services/apiService';
import { ClaimRecord, DamageCause, InspectionRecord } from '@/types';
import { Button } from '@/components/common/Button';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { DAMAGE_CAUSES } from '@/utils/constants';
import {
  ShieldCheck,
  MapPin,
  Camera,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  FileSpreadsheet,
  Compass,
  ArrowRight
} from 'lucide-react';
import { formatDate, formatArea } from '@/utils/formatters';

export const OfficerInspectionPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error } = useToast();

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadClaims = async () => {
      setLoading(true);
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
      setLoading(false);
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
          // Simulated fallback
          setLatitude('16.7142');
          setLongitude('74.5235');
          success('Simulated GPS Coordinates Set', 'Field plot coordinates calibrated.');
        }
      );
    } else {
      setLatitude('16.7142');
      setLongitude('74.5235');
      success('Coordinates Calibrated', '16.7142° N, 74.5235° E');
    }
  };

  const currentClaim = claims.find((c) => c.id === selectedClaimId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentClaim) {
      error('Selection Error', 'Please select a claim to inspect.');
      return;
    }

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
        status: 'finalized'
      });

      // Automatically generate e-Panchanama draft
      await panchanamaApi.generateDraft(currentClaim, inspectionRecord, officerName);

      success('Spot Inspection Submitted', 'Draft e-Panchanama has been automatically compiled.');
      navigate(`/officer/panchanama?claimId=${currentClaim.id}`);
    } catch {
      error('Submission Failed', 'Could not record inspection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
            Form 2-B: Official Spot Verification Desk
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Record Field Spot Inspection
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
          Conduct on-site physical appraisal, record GPS coordinates, assess crop damage percentage, and compile provisional draft e-Panchanama.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Claim Selector */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-900">
            Select Intimation / Claim to Inspect
          </label>
          <select
            value={selectedClaimId}
            onChange={(e) => handleClaimChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            {claims.map((c) => (
              <option key={c.id} value={c.id}>
                {c.claimNumber} • {c.farmerName} • {c.cropName} (Gat {c.surveyNumber}, {c.village}) [Status: {c.status}]
              </option>
            ))}
          </select>

          {currentClaim && (
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-600 block text-xs uppercase font-bold">Farmer Name</span>
                <span className="font-bold text-slate-900">{currentClaim.farmerName}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-xs uppercase font-bold">Contact</span>
                <span className="font-bold text-slate-900">{currentClaim.farmerPhone}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-xs uppercase font-bold">Reported Crop</span>
                <span className="font-bold text-slate-900">{currentClaim.cropName}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-xs uppercase font-bold">Reported Loss</span>
                <span className="font-bold text-red-700">{formatArea(currentClaim.affectedAreaAcre)} ({currentClaim.estimatedLossPercentage}%)</span>
              </div>
            </div>
          )}
        </div>

        {/* GPS Calibration & Plot Verification */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" /> 1. Geo-Location & Ground Calibration
            </h2>
            <button
              type="button"
              onClick={handleCaptureLiveGPS}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" /> Calibrate / Capture Device GPS
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Inspection Date</label>
              <input
                type="date"
                value={inspectionDate}
                onChange={(e) => setInspectionDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Latitude (°N)</label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-semibold"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Longitude (°E)</label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-semibold"
                required
              />
            </div>
          </div>
        </div>

        {/* Verified Parameters */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 text-xs">
          <h2 className="font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" /> 2. Verified Crop & Loss Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Verified Crop / Variety</label>
              <input
                type="text"
                value={verifiedCrop}
                onChange={(e) => setVerifiedCrop(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Verified Gat / Survey Number</label>
              <input
                type="text"
                value={verifiedSurveyNumber}
                onChange={(e) => setVerifiedSurveyNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Verified Affected Area (Acres)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={verifiedAffectedAreaAcre}
                onChange={(e) => setVerifiedAffectedAreaAcre(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-emerald-800"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Assessed Damage Percentage (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={assessedLossPercentage}
                onChange={(e) => setAssessedLossPercentage(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-red-700"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Confirmed Calamity Cause</label>
              <select
                value={damageCauseConfirmed}
                onChange={(e) => setDamageCauseConfirmed(e.target.value as DamageCause)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold bg-white"
              >
                {DAMAGE_CAUSES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Crop Growth Stage at Calamity</label>
              <select
                value={cropGrowthStage}
                onChange={(e) => setCropGrowthStage(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold bg-white"
              >
                <option value="sowing">Sowing / Emergence</option>
                <option value="vegetative">Vegetative Growth</option>
                <option value="flowering">Flowering / Square Formation</option>
                <option value="maturity">Maturity / Pod Formation</option>
                <option value="harvesting">Harvesting / Ripening</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Officer Spot Observations & Panchas Remarks
            </label>
            <textarea
              rows={4}
              value={officerObservations}
              onChange={(e) => setOfficerObservations(e.target.value)}
              placeholder="Record water stagnation depth, lodging severity, panchas statements, condition of adjacent fields..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 leading-relaxed"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Officer Final Recommendation
            </label>
            <select
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-indigo-900 bg-white"
            >
              <option value="approve_full">Approve for Full SDRF Compensation</option>
              <option value="approve_partial">Approve for Partial Pro-rata Compensation</option>
              <option value="re_inspection_needed">Joint Re-inspection Needed with Senior Agronomist</option>
              <option value="reject">Reject Claim (Below 33% Statutory SDRF Threshold)</option>
            </select>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Saving inspection will instantly generate and bind the provisional draft e-Panchanama.
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => navigate('/officer')}
              disabled={isSubmitting}
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
            >
              Save Inspection & Open Draft Panchanama
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OfficerInspectionPage;
