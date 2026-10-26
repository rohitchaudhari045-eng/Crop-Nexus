import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { claimsApi } from '@/services/apiService';
import { ClaimRecord, ClaimStatus } from '@/types';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { Pagination } from '@/components/common/Pagination';
import { ClaimDetailsModal } from '@/components/claims/ClaimDetailsModal';
import { formatDate, formatCurrencyINR, formatArea, getDamageCauseLabel } from '@/utils/formatters';
import {
  Search,
  Filter,
  FileText,
  MapPin,
  Calendar,
  ExternalLink,
  Clock,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';

export const ClaimTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [claims, setClaims] = useState<ClaimRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClaim, setSelectedClaim] = useState<ClaimRecord | null>(null);

  const pageSize = 6;

  const fetchClaims = async () => {
    setLoading(true);
    const data = await claimsApi.getAll({
      status: statusFilter,
      search: searchQuery
    });
    setClaims(data);
    setLoading(false);

    // If claimId is in query param, auto-open details
    const paramClaimId = searchParams.get('claimId');
    if (paramClaimId) {
      const match = data.find((c) => c.id === paramClaimId || c.claimNumber === paramClaimId);
      if (match) setSelectedClaim(match);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchClaims();
  };

  // Pagination calculation
  const totalPages = Math.ceil(claims.length / pageSize) || 1;
  const paginatedClaims = claims.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Claim Tracking & Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitor verification lifecycle, officer inspection schedules, and draft e-Panchanama progress.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            Total Records: <strong className="text-slate-900">{claims.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by claim no, crop, village, survey..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-500 text-slate-900"
          />
        </form>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          {[
            { id: 'all', label: 'All Claims' },
            { id: 'submitted', label: 'Submitted' },
            { id: 'inspection_scheduled', label: 'Scheduled' },
            { id: 'inspected', label: 'Inspected' },
            { id: 'panchanama_drafted', label: 'Draft Panchanama' },
            { id: 'approved', label: 'Approved' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setStatusFilter(tab.id);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                statusFilter === tab.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Claims List or Empty State */}
      {paginatedClaims.length === 0 ? (
        <EmptyState
          title="No Claims Found"
          description={
            searchQuery || statusFilter !== 'all'
              ? 'No damage reports match the selected filters. Try clearing your search.'
              : 'You have not submitted any crop damage intimations yet.'
          }
          actionText="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setStatusFilter('all');
          }}
        />
      ) : (
        <div className="space-y-4">
          <h2 className="sr-only">Registered Claims Grid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedClaims.map((claim) => (
              <div
                key={claim.id}
                onClick={() => setSelectedClaim(claim)}
                className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4"
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {claim.claimNumber}
                    </span>
                    <Badge claimStatus={claim.status} size="sm" />
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900">{claim.cropName}</h3>
                    <p className="text-xs text-slate-600">
                      Gat {claim.surveyNumber} • {claim.village}, {claim.taluka}
                    </p>
                  </div>
                </div>

                {/* Calamity Details - Flattened without nested card box */}
                <div className="border-y border-slate-100 py-2.5 text-xs space-y-1.5">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Reason:</span>
                    <span className="font-semibold text-slate-900">
                      {getDamageCauseLabel(claim.damageCause)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Affected Area:</span>
                    <span className="font-semibold text-emerald-800">
                      {formatArea(claim.affectedAreaAcre)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Reported Date:</span>
                    <span className="font-medium text-slate-700">
                      {formatDate(claim.submissionDate)}
                    </span>
                  </div>
                </div>

                {/* Footer Status and Action */}
                <div className="pt-1 flex items-center justify-between text-xs">
                  <Badge compensationStatus={claim.compensationStatus} size="sm" />
                  <span className="text-emerald-800 font-bold flex items-center gap-1 group-hover:underline">
                    View Details <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={claims.length}
            pageSize={pageSize}
          />
        </div>
      )}

      {/* Claim Details Modal */}
      <ClaimDetailsModal
        claim={selectedClaim}
        isOpen={!!selectedClaim}
        onClose={() => setSelectedClaim(null)}
      />
    </div>
  );
};

export default ClaimTrackingPage;
