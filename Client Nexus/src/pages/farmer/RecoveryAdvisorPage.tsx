import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getRecoveryPlan, CROPS_CONFIG, CALAMITIES_CONFIG, CropRecoveryPlan } from '@/data/cropRecoveryGuidelines';
import { claimsApi } from '@/api/claimsApi';
import { ClaimRecord, DamageCause } from '@/types';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  Sprout,
  ShieldAlert,
  HelpCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Calendar,
  Layers,
  ChevronRight,
  Info,
  PhoneCall,
  Printer
} from 'lucide-react';

export const RecoveryAdvisorPage: React.FC = () => {
  const { user } = useAuth();
  const { success, info } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Dropdown states with query param support
  const initialCrop = searchParams.get('crop') || CROPS_CONFIG[0].id;
  const initialCalamity = searchParams.get('calamity') || CALAMITIES_CONFIG[0].id;

  const [selectedCropId, setSelectedCropId] = useState(initialCrop);
  const [selectedCalamityId, setSelectedCalamityId] = useState(initialCalamity);
  const [growthStage, setGrowthStage] = useState('vegetative');
  const [damageSeverity, setDamageSeverity] = useState('moderate');
  const [selectedClaimId, setSelectedClaimId] = useState<string>('');
  const [farmerClaims, setFarmerClaims] = useState<ClaimRecord[]>([]);

  // Generated Plan State
  const [recoveryPlan, setRecoveryPlan] = useState<CropRecoveryPlan | null>(null);
  const [completedStepIds, setCompletedStepIds] = useState<Record<string, boolean>>({});
  const [checkedInspectionItems, setCheckedInspectionItems] = useState<Record<number, boolean>>({});

  // Load farmer's existing damage reports/claims for easy linking
  useEffect(() => {
    const loadClaims = async () => {
      try {
        const claims = await claimsApi.getAll({ userId: user?.id });
        setFarmerClaims(claims);
        // If a claim matches current crop, pre-select it
        if (claims.length > 0 && !selectedClaimId) {
          const match = claims.find((c) => c.cropName.toLowerCase().includes(selectedCropId));
          if (match) setSelectedClaimId(match.id);
        }
      } catch (e) {
        console.warn('Could not load claims for linking:', e);
      }
    };
    if (user?.role === 'farmer') {
      loadClaims();
    }
  }, [user]);

  // Initial plan load
  useEffect(() => {
    const plan = getRecoveryPlan(selectedCropId, selectedCalamityId);
    setRecoveryPlan(plan);
    setCompletedStepIds({});
    setCheckedInspectionItems({});
  }, []);

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    // 100% frontend only hardcoded lookup
    const plan = getRecoveryPlan(selectedCropId, selectedCalamityId);
    setRecoveryPlan(plan);
    setCompletedStepIds({});
    setCheckedInspectionItems({});
    success('Recovery Plan Generated', `Tailored recovery guidance for ${plan?.cropName} - ${plan?.calamityName} loaded.`);
  };

  const toggleStepCompleted = (stepId: string) => {
    setCompletedStepIds((prev) => {
      const next = { ...prev, [stepId]: !prev[stepId] };
      const completedCount = Object.values(next).filter(Boolean).length;
      if (next[stepId]) {
        info('Step Completed', `Marked step as finished. Total completed: ${completedCount}`);
      }
      return next;
    });
  };

  const toggleInspectionItem = (idx: number) => {
    setCheckedInspectionItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleStartTracking = () => {
    if (!recoveryPlan) return;
    const planKey = `${recoveryPlan.cropId}__${selectedCalamityId}`;
    const claimParam = selectedClaimId ? `&claimId=${encodeURIComponent(selectedClaimId)}` : '';
    const completedList = Object.keys(completedStepIds).filter((k) => completedStepIds[k]).join(',');
    const completedParam = completedList ? `&completed=${encodeURIComponent(completedList)}` : '';

    navigate(
      `/recovery/progress?crop=${encodeURIComponent(recoveryPlan.cropName)}&calamity=${encodeURIComponent(
        recoveryPlan.calamityName
      )}&planKey=${encodeURIComponent(planKey)}&stage=${encodeURIComponent(growthStage)}${claimParam}${completedParam}`
    );
  };

  const completedStepsCount = Object.values(completedStepIds).filter(Boolean).length;
  const totalStepsCount = recoveryPlan?.steps.length || 0;
  const progressPercent = totalStepsCount > 0 ? Math.round((completedStepsCount / totalStepsCount) * 100) : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <Activity className="w-3.5 h-3.5 text-emerald-600" /> Agronomic Rehabilitation Desk
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">• 112 Tailored Combinations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Crop Recovery Advisor
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Practical, step-by-step agronomic restoration plans for crops damaged by extreme weather. Follow calibrated ICAR & KVK guidelines to revive root systems, prevent disease spread, and minimize yield loss.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <Button
            size="md"
            variant="outline"
            onClick={() => navigate('/recovery/progress')}
            leftIcon={<TrendingUp className="w-4 h-4 text-emerald-700" />}
            className="w-full sm:w-auto font-bold"
          >
            Track Ongoing Recovery
          </Button>
        </div>
      </div>

      {/* Input Selection Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <form onSubmit={handleGeneratePlan} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Crop Selector */}
            <div>
              <label htmlFor="crop-select" className="block font-bold text-slate-800 mb-1">
                Select Crop <span className="text-emerald-700">*</span>
              </label>
              <select
                id="crop-select"
                value={selectedCropId}
                onChange={(e) => setSelectedCropId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold bg-white text-slate-900 text-xs"
              >
                {CROPS_CONFIG.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.displayName}
                  </option>
                ))}
              </select>
            </div>

            {/* Calamity Selector */}
            <div>
              <label htmlFor="calamity-select" className="block font-bold text-slate-800 mb-1">
                Calamity / Damage Type <span className="text-emerald-700">*</span>
              </label>
              <select
                id="calamity-select"
                value={selectedCalamityId}
                onChange={(e) => setSelectedCalamityId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold bg-white text-slate-900 text-xs"
              >
                {CALAMITIES_CONFIG.map((cal) => (
                  <option key={cal.id} value={cal.id}>
                    {cal.displayName}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Growth Stage */}
            <div>
              <label htmlFor="stage-select" className="block font-bold text-slate-800 mb-1">
                Crop Growth Stage <span className="text-slate-600 font-normal">(Optional)</span>
              </label>
              <select
                id="stage-select"
                value={growthStage}
                onChange={(e) => setGrowthStage(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-white text-slate-900 text-xs"
              >
                <option value="sowing">Sowing / Seedling Stage</option>
                <option value="vegetative">Vegetative Growth Stage</option>
                <option value="flowering">Flowering / Reproductive Stage</option>
                <option value="maturity">Maturity / Grain Filling Stage</option>
                <option value="harvesting">Harvesting / Ripe Stage</option>
              </select>
            </div>

            {/* Optional Damage Severity */}
            <div>
              <label htmlFor="severity-select" className="block font-bold text-slate-800 mb-1">
                Damage Severity <span className="text-slate-600 font-normal">(Optional)</span>
              </label>
              <select
                id="severity-select"
                value={damageSeverity}
                onChange={(e) => setDamageSeverity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-white text-slate-900 text-xs"
              >
                <option value="mild">Mild (Under 25% loss / light distress)</option>
                <option value="moderate">Moderate (25% to 50% loss / partial lodging)</option>
                <option value="severe">Severe (Over 50% loss / severe structural damage)</option>
              </select>
            </div>
          </div>

          {/* Optional Claim Association for Farmers */}
          {farmerClaims.length > 0 && (
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label htmlFor="claim-select" className="font-semibold text-slate-700 flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                Associate with existing damage report (Optional):
              </label>
              <select
                id="claim-select"
                value={selectedClaimId}
                onChange={(e) => setSelectedClaimId(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-slate-50 font-medium text-slate-900 sm:w-72"
              >
                <option value="">-- No Damage Report (Independent) --</option>
                {farmerClaims.map((claim) => (
                  <option key={claim.id} value={claim.id}>
                    {claim.claimNumber} ({claim.cropName} - {claim.surveyNumber})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              Guidance tailored for Maharashtra agricultural zones (ICAR & MPKV Rahuri / VNMKV Parbhani).
            </span>

            <Button
              type="submit"
              size="md"
              variant="primary"
              className="w-full sm:w-auto font-bold bg-emerald-800 hover:bg-emerald-900"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Generate Recovery Guidelines
            </Button>
          </div>
        </form>
      </div>

      {/* Recovery Plan Section */}
      {recoveryPlan ? (
        <div className="space-y-6">
          {/* Plan Header Bar */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base sm:text-lg font-black text-slate-900">
                    {recoveryPlan.cropName}
                  </span>
                  <span className="text-slate-400 font-bold">•</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    {recoveryPlan.calamityName}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 uppercase tracking-wide">
                    {growthStage} Stage
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 capitalize">
                    {damageSeverity} Severity
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  Plan Key: <span className="font-semibold text-slate-700">{recoveryPlan.cropId}__{selectedCalamityId}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.print()}
                  leftIcon={<Printer className="w-3.5 h-3.5" />}
                  className="hidden sm:inline-flex text-xs"
                >
                  Print Guidelines
                </Button>
                <Button
                  size="md"
                  variant="primary"
                  onClick={handleStartTracking}
                  leftIcon={<TrendingUp className="w-4 h-4 text-white" />}
                  className="font-bold bg-emerald-800 hover:bg-emerald-900 shadow-sm"
                >
                  Start Recovery Tracking
                </Button>
              </div>
            </div>

            {/* Completion Progress Bar */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 pr-2">
                  <span>Rehabilitation Steps Progress:</span>
                  <span className="text-emerald-800 font-black">
                    {completedStepsCount} of {totalStepsCount} Completed ({progressPercent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-slate-500 shrink-0">
                Mark steps completed as you execute them in the field.
              </span>
            </div>
          </div>

          {/* Damage Overview Box */}
          <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-200 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-700" /> Damage Overview & Biological Prospects
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-pretty">
              {recoveryPlan.damageOverview}
            </p>
          </div>

          {/* Field Inspection Checklist */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Field Inspection Checklist
              </h3>
              <span className="text-xs text-slate-500">
                Check off items during on-site plot walk
              </span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-700">
              {recoveryPlan.inspectionChecklist.map((item, idx) => {
                const isChecked = !!checkedInspectionItems[idx];
                return (
                  <li
                    key={idx}
                    onClick={() => toggleInspectionItem(idx)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950 line-through opacity-85'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by parent onClick
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Ordered Step-by-Step Recovery Plan */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Chronological Recovery Action Plan
                </h3>
                <p className="text-xs text-slate-500">
                  Ordered sequential steps. Carry out immediate safety steps before secondary nutritional interventions.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {recoveryPlan.steps.length} Steps
              </span>
            </div>

            <div className="space-y-3">
              {recoveryPlan.steps.map((step, idx) => {
                const isDone = !!completedStepIds[step.id];
                return (
                  <div
                    key={step.id}
                    className={`rounded-2xl p-5 border transition-all ${
                      isDone
                        ? 'bg-emerald-50/40 border-emerald-300/80 shadow-2xs'
                        : step.isImmediateSafety
                        ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                        : 'bg-white border-slate-200/90 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                              isDone
                                ? 'bg-emerald-700 text-white'
                                : step.isImmediateSafety
                                ? 'bg-amber-600 text-white'
                                : 'bg-slate-800 text-white'
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900">
                            {step.title}
                          </h4>
                          {step.isImmediateSafety && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-red-600" />
                              Immediate Safety Priority
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" /> {step.timeframe}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed pr-2">
                          {step.description}
                        </p>

                        <div className="bg-slate-50/90 rounded-xl p-2.5 border border-slate-200/70 text-xs text-slate-600 flex items-start gap-2">
                          <span className="font-bold text-slate-800 shrink-0">Completion Criteria:</span>
                          <span className="italic">{step.completionCriteria}</span>
                        </div>
                      </div>

                      <div className="shrink-0 pt-1">
                        <Button
                          size="sm"
                          variant={isDone ? 'primary' : 'outline'}
                          onClick={() => toggleStepCompleted(step.id)}
                          leftIcon={isDone ? <CheckCircle2 className="w-4 h-4" /> : undefined}
                          className={`min-h-[38px] text-xs font-bold ${
                            isDone
                              ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          {isDone ? 'Completed' : 'Mark Completed'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Precautions Box */}
          <div className="bg-red-50/50 rounded-3xl p-6 border border-red-200/80 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-red-950 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600" /> Critical Precautions — What to Avoid
            </h3>
            <ul className="space-y-2 text-xs text-red-950">
              {recoveryPlan.precautions.map((prec, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-red-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{prec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2-Column: Recovery Timeline & Recovery Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Timeline */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-700" /> Recovery Timeline Phases
              </h3>
              <p className="text-xs text-slate-500">
                Realistic recuperation phases. Recovery depends on weather, soil aeration, and crop vigor.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 pt-1">
                {recoveryPlan.recoveryTimeline.map((timePhase, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{timePhase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Biological Indicators */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-700" /> Field Recovery Indicators
              </h3>
              <p className="text-xs text-slate-500">
                Biological markers signaling that the plant has resumed normal metabolism.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 pt-1">
                {recoveryPlan.recoveryIndicators.map((indicator, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Escalation Guidance */}
          <div className="bg-amber-50/70 rounded-3xl p-6 border border-amber-300 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-amber-950 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-700" /> When to Contact Agricultural Officers / Extension Services
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-950">
              {recoveryPlan.escalationGuidance.map((guide, idx) => (
                <li key={idx} className="bg-white/80 p-3 rounded-xl border border-amber-200 flex items-start gap-2">
                  <span className="text-amber-700 font-black text-sm">!</span>
                  <span className="leading-relaxed">{guide}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2 border-t border-amber-200">
              <span>Taluka Krishi Adhikari (TKA) • Krishi Vigyan Kendra (KVK) • Gram Sevak Office</span>
              <span className="font-bold text-emerald-800">Toll-Free Kisan Call Centre: 1800-180-1551</span>
            </div>
          </div>

          {/* Bottom Tracking Action Callout */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black">
                Ready to follow this recovery plan in your field?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
                Start tracking follow-up dates, mark off steps over days and weeks, and upload field condition photos for date-stamped verification.
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              onClick={handleStartTracking}
              rightIcon={<ChevronRight className="w-4 h-4" />}
              className="bg-white text-emerald-950 hover:bg-emerald-50 font-black shrink-0 min-h-[46px]"
            >
              Start Recovery Tracking Now
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
          <Activity className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-800">No Recovery Plan Selected</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Choose your crop and natural calamity type above, then click Generate Recovery Guidelines to view your custom recovery steps.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecoveryAdvisorPage;
