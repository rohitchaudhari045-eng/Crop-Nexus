import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/i18n/LanguageContext';
import { claimsApi } from '@/api/claimsApi';
import { ClaimRecord } from '@/types';
import { StatCard } from '@/components/common/StatCard';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { ClaimDetailsModal } from '@/components/claims/ClaimDetailsModal';
import { formatDate, formatArea, getDamageCauseLabel } from '@/utils/formatters';
import {
  FilePlus2,
  FileText,
  ShieldCheck,
  Clock,
  ArrowRight,
  MapPin,
  Calendar,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [claims, setClaims] = useState<ClaimRecord[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<ClaimRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const claimsData = await claimsApi.getAll({ userId: user?.id });
        setClaims(claimsData);
      } catch (err) {
        console.warn('Error loading farmer claims:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, [user]);

  // Aggregate meaningful operational metrics (no fabricated financial numbers)
  const totalClaims = claims.length;
  const pendingInspection = claims.filter(
    (c) => c.status === 'submitted' || c.status === 'under_review' || c.status === 'inspection_scheduled'
  ).length;
  const inspectedClaims = claims.filter(
    (c) => c.status === 'inspected' || c.status === 'panchanama_drafted' || c.status === 'verified' || c.status === 'approved'
  ).length;

  const latestClaim = claims[0];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. Header & Primary Action Callout */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {t('role.farmer', 'Farmer Portal')}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              • {user?.village || 'Shirol'}, {user?.district || 'Kolhapur'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('farmer.dash.namaste', 'Namaste')}, {user?.name || 'Farmer'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl text-pretty">
            {t(
              'farmer.dash.welcome',
              'Welcome to your farmer dashboard. Report damage intimations, monitor field verification, and view claim progress.'
            )}
          </p>
        </div>

        {/* Primary prominent action button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <Link to="/report-damage" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto min-h-[48px] shadow-sm font-bold"
              leftIcon={<FilePlus2 className="w-5 h-5" />}
            >
              {t('farmer.dash.reportDamageBtn', 'Report Crop Damage')}
            </Button>
          </Link>
          <Link to="/claims" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto min-h-[48px]"
              leftIcon={<FileText className="w-4 h-4 text-slate-600" />}
            >
              {t('farmer.dash.allClaimsBtn', 'My Reports')} ({totalClaims})
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Current Status Highlight of Most Recent Claim */}
      {latestClaim && (
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  Latest Submitted Report:
                </span>
                <span className="font-mono text-xs font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  {latestClaim.claimNumber}
                </span>
                <Badge claimStatus={latestClaim.status} size="sm" />
              </div>
              <p className="text-xs text-slate-700">
                <strong>{latestClaim.cropName}</strong> on Gut {latestClaim.surveyNumber} ({latestClaim.village}).{' '}
                {latestClaim.status === 'submitted' || latestClaim.status === 'under_review'
                  ? 'Local Taluka Agriculture Officer has been notified to schedule on-site physical appraisal.'
                  : latestClaim.status === 'inspected'
                  ? 'Field inspection completed. e-Panchanama compilation is in progress.'
                  : 'Verification findings recorded.'}
              </p>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setSelectedClaim(latestClaim)}
            className="self-end md:self-center bg-white shrink-0 min-h-[40px] text-xs font-bold"
          >
            {t('common.details', 'View Timeline')}
          </Button>
        </div>
      )}

      {/* 3. Three Clean Summary Cards (Operational Metrics Only) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
        <StatCard
          title={t('farmer.dash.statTotal', 'Submitted Reports')}
          value={totalClaims}
          subtitle={t('farmer.dash.statTotalSub', 'Total intimations registered')}
          icon={<FileText className="w-5 h-5" />}
          iconBg="bg-blue-50 text-blue-800"
        />
        <StatCard
          title={t('farmer.dash.statPending', 'Pending Inspection')}
          value={pendingInspection}
          subtitle={t('farmer.dash.statPendingSub', 'Awaiting field visit')}
          icon={<Clock className="w-5 h-5" />}
          iconBg="bg-amber-50 text-amber-800"
        />
        <StatCard
          title={t('farmer.dash.statVerified', 'Verified & Inspected')}
          value={inspectedClaims}
          subtitle={t('farmer.dash.statVerifiedSub', 'Field inspection conducted')}
          icon={<ShieldCheck className="w-5 h-5" />}
          iconBg="bg-emerald-50 text-emerald-800"
        />
      </div>

      {/* 4. Recent Reports Section: Mobile Cards + Desktop Table */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base text-slate-900">
              {t('farmer.dash.recentTitle', 'Recent Crop Damage Reports')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('farmer.dash.recentSubtitle', 'Latest disaster damage intimations submitted for inspection')}
            </p>
          </div>
          {claims.length > 0 && (
            <Link
              to="/claims"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 min-h-[44px] items-center"
            >
              {t('common.all', 'View All')} ({claims.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Empty State for new farmers with no reports */}
        {claims.length === 0 ? (
          <div className="text-center py-10 px-4 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-200">
              <FilePlus2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              {t('farmer.dash.noClaimsTitle', 'No Damage Reports Yet')}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto text-pretty">
              {t(
                'farmer.dash.noClaimsDesc',
                'If your standing crops suffered damage due to natural calamities like heavy rain, hailstorms, or flood, submit an intimation to initiate official inspection.'
              )}
            </p>
            <div className="pt-2">
              <Link to="/report-damage">
                <Button size="md" variant="primary">
                  {t('farmer.dash.reportNow', 'Report Crop Loss Now')}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Mobile View: Clean, Readable Cards */}
            <div className="grid grid-cols-1 gap-3 md:hidden">
              {claims.slice(0, 4).map((claim) => (
                <div
                  key={claim.id}
                  onClick={() => setSelectedClaim(claim)}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-400 bg-white space-y-3 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {claim.claimNumber}
                    </span>
                    <Badge claimStatus={claim.status} size="sm" />
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{claim.cropName}</h3>
                    <p className="text-xs text-slate-500">
                      Gut {claim.surveyNumber} • {claim.village}, {claim.taluka}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <div>
                      <span>Area: </span>
                      <strong className="text-slate-900">{formatArea(claim.affectedAreaAcre)}</strong>
                    </div>
                    <div>
                      <span>Date: </span>
                      <strong className="text-slate-900">{formatDate(claim.submissionDate)}</strong>
                    </div>
                    <span className="text-emerald-800 font-bold flex items-center gap-0.5">
                      Details <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Clean Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-xs border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Claim Ref</th>
                    <th className="py-3 px-3">Crop & Survey No</th>
                    <th className="py-3 px-3">Calamity Cause</th>
                    <th className="py-3 px-3">Affected Area</th>
                    <th className="py-3 px-3">Reported Date</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {claims.slice(0, 5).map((claim) => (
                    <tr key={claim.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3 font-bold font-mono text-slate-900">
                        {claim.claimNumber}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-slate-900">{claim.cropName}</div>
                        <div className="text-xs text-slate-500">
                          Gut {claim.surveyNumber} • {claim.village}
                        </div>
                      </td>
                      <td className="py-3.5 px-3">{getDamageCauseLabel(claim.damageCause)}</td>
                      <td className="py-3.5 px-3 font-mono font-semibold text-emerald-800">
                        {formatArea(claim.affectedAreaAcre)}
                      </td>
                      <td className="py-3.5 px-3">{formatDate(claim.submissionDate)}</td>
                      <td className="py-3.5 px-3">
                        <Badge claimStatus={claim.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedClaim(claim)}
                          className="text-xs py-1 px-3"
                        >
                          {t('common.details', 'Details')}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
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
