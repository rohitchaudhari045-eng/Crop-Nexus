import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { claimsApi } from '@/services/apiService';
import { ClaimRecord } from '@/types';
import { StatCard } from '@/components/common/StatCard';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { ClaimDetailsModal } from '@/components/claims/ClaimDetailsModal';
import { formatDate, formatArea, getDamageCauseLabel } from '@/utils/formatters';
import {
  ShieldCheck,
  Clock,
  FileSpreadsheet,
  AlertCircle,
  Search,
  ExternalLink,
  MapPin,
  Calendar,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const OfficerDashboard: React.FC = () => {
  const [claims, setClaims] = useState<ClaimRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClaim, setSelectedClaim] = useState<ClaimRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchClaims = async () => {
    setLoading(true);
    const data = await claimsApi.getAll({
      status: statusFilter,
      search: searchQuery
    });
    setClaims(data);
    setLoading(false);
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
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              Field Officer Desk
            </span>
            <span className="text-xs text-slate-600 font-medium">• Circle Inspector Zone</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Spot Inspection & e-Panchanama Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Verify farmer damage claims, conduct joint spot surveys with local panchas, and compile draft e-Panchanama records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link to="/officer/inspection">
            <Button size="md" variant="primary" leftIcon={<ShieldCheck className="w-4 h-4" />}>
              Record Spot Inspection
            </Button>
          </Link>
          <Link to="/officer/panchanama">
            <Button size="md" variant="secondary" leftIcon={<FileSpreadsheet className="w-4 h-4" />}>
              View Draft Reports
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="New Intimations"
          value={newIntimations}
          subtitle="Awaiting preliminary review"
          icon={<AlertCircle className="w-6 h-6" />}
          iconBg="bg-blue-50 text-blue-700"
        />
        <StatCard
          title="Pending Inspections"
          value={pendingInspections}
          subtitle="Scheduled for spot survey"
          icon={<Clock className="w-6 h-6" />}
          iconBg="bg-amber-50 text-amber-700"
        />
        <StatCard
          title="Inspected Plots"
          value={inspectedClaims}
          subtitle="Field verification done"
          icon={<CheckCircle2 className="w-6 h-6" />}
          iconBg="bg-emerald-50 text-emerald-700"
        />
        <StatCard
          title="Draft e-Panchanamas"
          value={draftsCompiled}
          subtitle="Compiled for revenue review"
          icon={<FileSpreadsheet className="w-6 h-6" />}
          iconBg="bg-cyan-50 text-cyan-700"
        />
      </div>

      {/* Claims Management Table Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-base text-slate-900">Officer Claims Queue</h2>
            <p className="text-xs text-slate-600">Filter claims requiring spot survey or draft compilation</p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchClaims()}
                placeholder="Search claims..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500 text-slate-900"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-semibold py-1.5 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-800 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">New / Submitted</option>
              <option value="inspection_scheduled">Inspection Scheduled</option>
              <option value="inspected">Inspected</option>
              <option value="panchanama_drafted">Draft Panchanama Ready</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-xs border-y border-slate-200">
              <tr>
                <th className="py-3 px-3">Claim Ref & Date</th>
                <th className="py-3 px-3">Farmer & Location</th>
                <th className="py-3 px-3">Crop & Calamity</th>
                <th className="py-3 px-3">Reported Loss</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Missing Info Check</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {claims.map((claim) => {
                const hasPhotos = claim.photos && claim.photos.length > 0;
                const hasSurvey = !!claim.surveyNumber;
                const missingInfo = !hasPhotos || !hasSurvey;

                return (
                  <tr key={claim.id} className="hover:bg-slate-50/70 transition-colors">
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
                      <div className="text-xs text-slate-500">{claim.estimatedLossPercentage}% Est. Loss</div>
                    </td>

                    <td className="py-3.5 px-3">
                      <Badge claimStatus={claim.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-3">
                      {missingInfo ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          {!hasPhotos ? 'Missing Photos' : 'Missing Gut No'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold text-emerald-800 bg-emerald-50">
                          <CheckCircle2 className="w-3 h-3" /> Complete
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
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
                            <Button size="sm" variant="primary" className="text-xs py-1 px-2.5">
                              Inspect
                            </Button>
                          </Link>
                        ) : claim.status === 'inspected' ? (
                          <Link to={`/officer/panchanama?claimId=${claim.id}`}>
                            <Button size="sm" variant="secondary" className="text-xs py-1 px-2.5">
                              Compile Draft
                            </Button>
                          </Link>
                        ) : (
                          <Link to={`/officer/panchanama?claimId=${claim.id}`}>
                            <Button size="sm" variant="outline" className="text-xs py-1 px-2.5">
                              View Draft
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
    </div>
  );
};

export default OfficerDashboard;
