import React, { useState } from 'react';
import { recoveryApi } from '@/services/apiService';
import { CropRecoveryItem, DamageCause } from '@/types';
import { CROPS_LIST, DAMAGE_CAUSES } from '@/utils/constants';
import { Button } from '@/components/common/Button';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  Sprout,
  ShieldAlert,
  HelpCircle,
  Camera,
  ArrowRight
} from 'lucide-react';

export const RecoveryAdvisorPage: React.FC = () => {
  const [cropName, setCropName] = useState(CROPS_LIST[0]);
  const [damageType, setDamageType] = useState<DamageCause>('heavy_rainfall');
  const [symptomsDesc, setSymptomsDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [advisoryResult, setAdvisoryResult] = useState<CropRecoveryItem | null>(null);

  const handleGenerateAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await recoveryApi.getAdvisoryByFilter(cropName, damageType);
    setAdvisoryResult(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Agronomic Rehabilitation
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Crop Recovery Advisor
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
          Receive tailored agronomic rehabilitation guidelines for crops partially damaged by heavy rainfall, hailstorms, flooding, or squall winds.
        </p>
      </div>

      {/* Input Selection Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <form onSubmit={handleGenerateAdvice} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Select Crop</label>
              <select
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold bg-white"
              >
                {CROPS_LIST.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Calamity / Damage Type</label>
              <select
                value={damageType}
                onChange={(e) => setDamageType(e.target.value as DamageCause)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold bg-white"
              >
                {DAMAGE_CAUSES.map((cause) => (
                  <option key={cause.value} value={cause.value}>
                    {cause.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Field Symptoms & Observed Plant Distress
            </label>
            <textarea
              rows={3}
              value={symptomsDesc}
              onChange={(e) => setSymptomsDesc(e.target.value)}
              placeholder="e.g. Lower leaves yellowing, soil flooded for 48 hours, broken side branches, boll shedding..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs placeholder:text-slate-500 text-slate-900"
            />
          </div>

          <div className="pt-2 flex justify-between items-center">
            <span className="text-xs text-slate-500">
              *Preliminary advisory based on standard ICAR & KVK package of practices.
            </span>
            <Button
              type="submit"
              size="md"
              variant="primary"
              isLoading={loading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Generate Recovery Guidelines
            </Button>
          </div>
        </form>
      </div>

      {/* Advisory Guidance Display */}
      {advisoryResult && (
        <div className="space-y-6">
          {/* Important Agronomy Disclaimer Banner */}
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>ILLUSTRATIVE AGRONOMIC GUIDELINES:</strong> The following suggestions are compiled for immediate post-calamity stabilization. Dosage and pesticide formulations must be validated with your local Gram Sevak or Krishi Vigyan Kendra agronomist based on soil characteristics.
            </div>
          </div>

          {/* Structured Guidance Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Immediate Steps */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>1. Immediate Field Stabilization</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {advisoryResult.immediateSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soil & Nutrient Care */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                <Sprout className="w-5 h-5 text-indigo-600" />
                <span>2. Soil & Nutrient Replenishment</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {advisoryResult.soilAndNutrientManagement.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Water and Drainage Management */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <Droplets className="w-5 h-5 text-blue-600" />
                <span>3. Drainage & Aeration Care</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {advisoryResult.waterAndDrainageCare.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fungicide and Pest Mitigation */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>4. Disease & Fungal Protection</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {advisoryResult.fungicideAndPestManagement.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-red-50/50 p-2.5 rounded-xl border border-red-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Expert Consultation Criteria */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-700" /> When to Consult a Krishi Vigyan Kendra (KVK) Agronomist
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              {advisoryResult.expertConsultationCriteria.map((crit, idx) => (
                <li key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-start gap-2">
                  <span className="text-emerald-700 font-black">!</span>
                  <span>{crit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecoveryAdvisorPage;
