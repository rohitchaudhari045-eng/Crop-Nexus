import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { claimsApi, weatherApi, recoveryApi } from '@/services/apiService';
import { ClaimRecord, WeatherAlertItem, CropRecoveryItem } from '@/types';
import { StatCard } from '@/components/common/StatCard';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { ClaimDetailsModal } from '@/components/claims/ClaimDetailsModal';
import { formatDate, formatCurrencyINR, formatArea, getDamageCauseLabel } from '@/utils/formatters';
import {
  FilePlus2,
  FileText,
  Activity,
  CloudSun,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
  Layers
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [claims, setClaims] = useState<ClaimRecord[]>([]);
  const [weatherAlerts, setWeatherAlerts] = useState<WeatherAlertItem[]>([]);
  const [recoveryTips, setRecoveryTips] = useState<CropRecoveryItem[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<ClaimRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      const [claimsData, alertsData, recoveryData] = await Promise.all([
        claimsApi.getAll(),
        weatherApi.getAlerts(user?.district || 'Kolhapur'),
        recoveryApi.getAdvisories()
      ]);
      setClaims(claimsData);
      setWeatherAlerts(alertsData);
      setRecoveryTips(recoveryData);
      setLoading(false);
    };
    loadDashboardData();
  }, [user]);

  // Aggregate stats
  const totalClaims = claims.length;
  const pendingInspection = claims.filter(
    (c) => c.status === 'submitted' || c.status === 'under_review' || c.status === 'inspection_scheduled'
  ).length;
  const verifiedClaims = claims.filter(
    (c) => c.status === 'inspected' || c.status === 'panchanama_drafted' || c.status === 'verified' || c.status === 'approved'
  ).length;
  const sanctionedRelief = claims.reduce(
    (sum, c) => sum + (c.sanctionedCompensationAmount || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Welcome & Quick Action Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Kisan Portal
            </span>
            <span className="text-xs text-slate-600 font-medium">• {user?.village || 'Shirol'}, {user?.district || 'Kolhapur'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Namaste, {user?.name || 'Farmer'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Monitor your damage intimations, review field inspection status, check local weather advisories, and track compensation relief.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/report-damage">
            <Button size="md" variant="primary" leftIcon={<FilePlus2 className="w-4 h-4" />}>
              Report Crop Damage
            </Button>
          </Link>
          <Link to="/claims">
            <Button size="md" variant="outline" leftIcon={<FileText className="w-4 h-4 text-slate-600" />}>
              All Claims
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Submitted Intimations"
          value={totalClaims}
          subtitle="Total claims registered"
          icon={<FileText className="w-6 h-6" />}
          iconBg="bg-blue-50 text-blue-700"
        />
        <StatCard
          title="Pending Inspections"
          value={pendingInspection}
          subtitle="Awaiting officer visit"
          icon={<Clock className="w-6 h-6" />}
          iconBg="bg-amber-50 text-amber-700"
        />
        <StatCard
          title="Verified & Drafted"
          value={verifiedClaims}
          subtitle="e-Panchanama in progress"
          icon={<ShieldCheck className="w-6 h-6" />}
          iconBg="bg-emerald-50 text-emerald-700"
        />
        <StatCard
          title="Sanctioned Relief"
          value={formatCurrencyINR(sanctionedRelief)}
          subtitle="State SDRF compensation"
          icon={<TrendingUp className="w-6 h-6" />}
          iconBg="bg-green-50 text-green-700"
        />
      </div>

      {/* Weather Alert Banner Summary if any active */}
      {weatherAlerts.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-200/70 text-amber-900 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-amber-950">Active Agromet Alert:</span>
                <span className="text-xs font-semibold text-amber-900">{weatherAlerts[0].title}</span>
              </div>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed max-w-3xl">
                {weatherAlerts[0].description}
              </p>
            </div>
          </div>
          <Link to="/weather">
            <Button size="sm" variant="outline" className="border-amber-300 text-amber-900 bg-white hover:bg-amber-100">
              View Preventive Advice
            </Button>
          </Link>
        </div>
      )}

      {/* Main Content Split: Recent Claims (2 cols) & Recovery Guidance (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Damage Claims Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base text-slate-900">Recent Damage Reports</h2>
              <p className="text-xs text-slate-500">Your latest registered crop loss intimations</p>
            </div>
            <Link
              to="/claims"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              View All ({claims.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-xs border-y border-slate-200">
                <tr>
                  <th className="py-3 px-3">Claim Ref</th>
                  <th className="py-3 px-3">Crop & Gat No</th>
                  <th className="py-3 px-3">Damage Cause</th>
                  <th className="py-3 px-3">Affected Area</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {claims.slice(0, 4).map((claim) => (
                  <tr key={claim.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-3 font-bold font-mono text-slate-900">
                      {claim.claimNumber}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900">{claim.cropName}</div>
                      <div className="text-xs text-slate-500">Gat {claim.surveyNumber} • {claim.village}</div>
                    </td>
                    <td className="py-3.5 px-3">{getDamageCauseLabel(claim.damageCause)}</td>
                    <td className="py-3.5 px-3 font-mono font-semibold text-emerald-800">
                      {formatArea(claim.affectedAreaAcre)}
                    </td>
                    <td className="py-3.5 px-3">
                      <Badge claimStatus={claim.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedClaim(claim)}
                        className="text-xs py-1 px-2.5"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Agronomic Recovery Spotlight */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-800" />
              <h3 className="font-bold text-sm text-slate-900">Crop Recovery Guidance</h3>
            </div>
            <Link to="/recovery" className="text-xs text-emerald-800 font-bold hover:underline">
              All Tips &rarr;
            </Link>
          </div>

          {recoveryTips.length > 0 && (
            <div className="space-y-5 text-xs divide-y divide-slate-100">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-950 text-sm">
                    {recoveryTips[0].cropName} Post-Flooding
                  </span>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                    Advisory
                  </span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  Avoid heavy machinery on submerged soil to prevent compaction. Spray 1% 19:19:19 foliar spray to stimulate nutrient uptake through leaves.
                </p>
                <div className="pt-2 flex justify-between items-center text-xs text-emerald-800 font-medium">
                  <span>Soil Drench: Copper Oxychloride 0.25%</span>
                  <Link to="/recovery" className="font-bold hover:underline">
                    Read More &rarr;
                  </Link>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-600 block">
                  Recovery Progression Tracker
                </span>
                <p className="text-slate-700 leading-relaxed text-xs">
                  Document your plot's rejuvenation with before-and-after photo comparisons to track recovery milestones.
                </p>
                <div className="pt-1">
                  <Link to="/recovery/progress">
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      Open Progression Timeline
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Claim Details Modal */}
      <ClaimDetailsModal
        claim={selectedClaim}
        isOpen={!!selectedClaim}
        onClose={() => setSelectedClaim(null)}
      />
    </div>
  );
};

export default FarmerDashboard;
