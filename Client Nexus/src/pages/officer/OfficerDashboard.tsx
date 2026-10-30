import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { claimsApi } from '@/api/claimsApi';
import { ClaimRecord } from '@/types';
import { StatCard } from '@/components/common/StatCard';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { ClaimDetailsModal } from '@/components/claims/ClaimDetailsModal';
import { RecoveryProgressReviewModal } from '@/components/recovery/RecoveryProgressReviewModal';
import { useTranslation } from '@/i18n/LanguageContext';
import { formatDate, formatArea, getDamageCauseLabel } from '@/utils/formatters';
import {
  ShieldCheck,
  Clock,
  FileSpreadsheet,
  AlertCircle,
  Search,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const OfficerDashboard: React.FC = () => {
  const [claims, setClaims] = useState<ClaimRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClaim, setSelectedClaim] = useState<ClaimRecord | null>(null);
  const [recoveryReviewClaim, setRecoveryReviewClaim] = useState<ClaimRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { t } = useTranslation();

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const data = await claimsApi.getAll({
        status: statusFilter,
        search: searchQuery
      });
      setClaims(data);
    } catch (err) {
      console.warn('Failed to load officer queue:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [statusFilter]);

  // Aggregate metrics
  const newIntimations = claims.filter((c) => c.status === 'submitted').length;
  const pendingInspections = claims.filter(
    (c) => c.status === 'under_review' || c.status === 'inspection_scheduled'
  ).length;
  const inspectedClaims = claims.filter(
    (c) => c.status === 'inspected' || c.status === 'panchanama_drafted' || c.status === 'verified'
  ).length;
  const draftsCompiled = claims.filter((c) => c.status === 'panchanama_drafted').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              {t('officer.dash.title', 'Officer Field Inspection Desk')}
            </span>
            <span className="text-xs text-slate-500 font-medium">• Kolhapur Zone</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Spot Inspection & e-Panchanama Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl text-pretty">
            {t(
              'officer.dash.subtitle',
              'Review farmer intimations, conduct joint spot appraisals, and compile draft e-Panchanamas.'
            )}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <Link to="/officer/inspection" className="w-full sm:w-auto">
            <Button
              size="md"
              variant="primary"
              className="w-full sm:w-auto min-h-[44px] bg-indigo-800 hover:bg-indigo-900 text-white font-bold"
              leftIcon={<ShieldCheck className="w-4 h-4" />}
            >
              {t('officer.dash.recordInspectionBtn', 'Record Spot Inspection')}
            </Button>
          </Link>
          <Link to="/officer/panchanama" className="w-full sm:w-auto">
            <Button
              size="md"
              variant="outline"
              className="w-full sm:w-auto min-h-[44px]"
              leftIcon={<FileSpreadsheet className="w-4 h-4" />}
            >
              {t('officer.dash.viewDraftsBtn', 'View Draft e-Panchanamas')}
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Operational Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <StatCard
          title={t('officer.dash.statNew', 'New Reports')}
          value={newIntimations}
          subtitle={t('officer.dash.statNewSub', 'Awaiting preliminary review')}
          icon={<AlertCircle className="w-5 h-5" />}
          iconBg="bg-blue-50 text-blue-800"
        />
        <StatCard
          title={t('officer.dash.statScheduled', 'Pending Inspections')}
          value={pendingInspections}
          subtitle={t('officer.dash.statScheduledSub', 'Scheduled for spot survey')}
          icon={<Clock className="w-5 h-5" />}
          iconBg="bg-amber-50 text-amber-800"
        />
        <StatCard
          title={t('officer.dash.statInspected', 'Inspections Completed')}
          value={inspectedClaims}
          subtitle={t('officer.dash.statInspectedSub', 'Plots verified on-site')}
          icon={<CheckCircle2 className="w-5 h-5" />}
          iconBg="bg-emerald-50 text-emerald-800"
        />
        <StatCard
          title={t('officer.dash.statDrafts', 'Draft Panchanamas')}
          value={draftsCompiled}
          subtitle={t('officer.dash.statDraftsSub', 'Compiled for review')}
          icon={<FileSpreadsheet className="w-5 h-5" />}
          iconBg="bg-cyan-50 text-cyan-800"
        />
      </div>

      {/* Claims Management Queue */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-base text-slate-900">
              {t('officer.dash.queueTitle', 'Inspection & Verification Queue')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('officer.dash.queueSubtitle', 'Select a damage report to conduct spot survey or draft panchanama')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchClaims()}
                placeholder="Search by ref, farmer, gut..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 min-h-[40px]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-bold py-2 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-800 cursor-pointer min-h-[40px]"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">New / Submitted</option>
              <option value="inspection_scheduled">Inspection Scheduled</option>
              <option value="inspected">Inspected</option>
              <option value="panchanama_drafted">Draft Panchanama Ready</option>
            </select>
          </div>
        </div>

        {/* Mobile View: Cards */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                  {claim.claimNumber}
                </span>
                <Badge claimStatus={claim.status} size="sm" />
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900">{claim.farmerName}</h3>
                <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  Gut {claim.surveyNumber}, {claim.village}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>{claim.cropName}</strong> • {getDamageCauseLabel(claim.damageCause)}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRecoveryReviewClaim(claim)}
                  className="text-xs min-h-[38px] flex-1 text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                >
                  Recovery
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedClaim(claim)}
                  className="text-xs min-h-[38px] flex-1"
                >
                  Review
                </Button>
                {claim.status === 'submitted' || claim.status === 'inspection_scheduled' ? (
                  <Link to={`/officer/inspection?claimId=${claim.id}`} className="flex-1">
                    <Button size="sm" variant="primary" className="text-xs min-h-[38px] w-full bg-indigo-800 hover:bg-indigo-900">
                      {t('officer.dash.inspectAction', 'Inspect')}
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/officer/panchanama?claimId=${claim.id}`} className="flex-1">
                    <Button size="sm" variant="secondary" className="text-xs min-h-[38px] w-full">
                      {t('officer.dash.viewPanchanama', 'Panchanama')}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-xs border-y border-slate-200">
              <tr>
                <th className="py-3 px-3">Claim Ref & Date</th>
                <th className="py-3 px-3">Farmer & Location</th>
                <th className="py-3 px-3">Crop & Calamity</th>
                <th className="py-3 px-3">Reported Loss</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Evidence Check</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {claims.map((claim) => {
                const hasPhotos = claim.photos && claim.photos.length > 0;
                return (
                  <tr key={claim.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="font-bold font-mono text-slate-900">{claim.claimNumber}</div>
                      <div className="text-xs text-slate-500">{formatDate(claim.submissionDate)}</div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900">{claim.farmerName}</div>
                      <div className="text-xs text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                        Gat {claim.surveyNumber}, {claim.village}
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900">{claim.cropName}</div>
                      <div className="text-xs text-slate-600">{getDamageCauseLabel(claim.damageCause)}</div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-mono font-bold text-emerald-800">
                        {formatArea(claim.affectedAreaAcre)}
                      </div>
                      <div className="text-xs text-slate-500">{claim.estimatedLossPercentage}% Loss</div>
                    </td>

                    <td className="py-3.5 px-3">
                      <Badge claimStatus={claim.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-3">
                      {hasPhotos ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold text-emerald-800 bg-emerald-50">
                          <CheckCircle2 className="w-3 h-3" /> {claim.photos.length} Photos
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <AlertCircle className="w-3 h-3 text-amber-600" /> No Photos
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setRecoveryReviewClaim(claim)}
                          className="text-xs py-1 px-2 text-emerald-800 border-emerald-200 hover:bg-emerald-50"
                          title="Review Farmer's Crop Recovery Progress"
                        >
                          Recovery
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedClaim(claim)}
                          className="text-xs py-1 px-2.5"
                        >
                          Review
                        </Button>

                        {claim.status === 'submitted' || claim.status === 'inspection_scheduled' ? (
                          <Link to={`/officer/inspection?claimId=${claim.id}`}>
                            <Button size="sm" variant="primary" className="text-xs py-1 px-2.5 bg-indigo-800 hover:bg-indigo-900">
                              {t('officer.dash.inspectAction', 'Inspect')}
                            </Button>
                          </Link>
                        ) : (
                          <Link to={`/officer/panchanama?claimId=${claim.id}`}>
                            <Button size="sm" variant="secondary" className="text-xs py-1 px-2.5">
                              {t('officer.dash.viewPanchanama', 'Panchanama')}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Claim Detail Modal */}
      <ClaimDetailsModal
        claim={selectedClaim}
        isOpen={!!selectedClaim}
        onClose={() => setSelectedClaim(null)}
      />

      {/* Recovery Progress Review Modal for Officers */}
      <RecoveryProgressReviewModal
        claim={recoveryReviewClaim}
        isOpen={!!recoveryReviewClaim}
        onClose={() => setRecoveryReviewClaim(null)}
      />
    </div>
  );
};

export default OfficerDashboard;
