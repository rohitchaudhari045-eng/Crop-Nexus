import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { claimsApi, panchanamaApi } from '@/api';
import { ClaimRecord, EPanchanamaDocument } from '@/types';
import { PanchanamaDocument } from '@/components/panchanama/PanchanamaDocument';
import { PanchanamaEditorModal } from '@/components/panchanama/PanchanamaEditorModal';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { useTranslation } from '@/i18n/LanguageContext';
import { Info, ArrowLeft, ShieldCheck } from 'lucide-react';

export const DraftPanchanamaPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const [claims, setClaims] = useState<ClaimRecord[]>([]);
  const [selectedClaimId, setSelectedClaimId] = useState<string>(
    searchParams.get('claimId') || ''
  );
  const [panchanamaDoc, setPanchanamaDoc] = useState<EPanchanamaDocument | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const allClaims = await claimsApi.getAll();
        setClaims(allClaims);

        const queryClaimId = searchParams.get('claimId');
        const targetId = queryClaimId || allClaims[0]?.id;

        if (targetId) {
          setSelectedClaimId(targetId);
          await loadDocumentForClaim(targetId, allClaims);
        }
      } catch (err) {
        console.warn('Failed to load panchanama claims:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [searchParams]);

  const loadDocumentForClaim = async (claimId: string, claimsList = claims) => {
    let doc = await panchanamaApi.getByClaimId(claimId);
    if (!doc) {
      const claim = claimsList.find((c) => c.id === claimId);
      if (claim) {
        doc = await panchanamaApi.generateDraft(claim);
      }
    }
    setPanchanamaDoc(doc);
  };

  const handleClaimSelect = async (claimId: string) => {
    setSelectedClaimId(claimId);
    await loadDocumentForClaim(claimId);
  };

  const handleSaveDraftUpdates = async (updates: Partial<EPanchanamaDocument>) => {
    if (!panchanamaDoc) return;
    const updated = await panchanamaApi.updateDraft(panchanamaDoc.id, updates);
    if (updated) {
      setPanchanamaDoc(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Claim Selector Bar (Hidden in Print) */}
      <div className="no-print bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-900 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
              Provisional Record Viewer
            </span>
            <span className="text-xs text-slate-500 font-medium">• Form 3-A Compiler</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('panchanama.page.title', 'Draft e-Panchanama Document')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-prose leading-relaxed text-pretty">
            {t(
              'panchanama.page.subtitle',
              'Standardized provisional digital record compiled for revenue review and relief processing.'
            )}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <label className="text-xs font-bold text-slate-700" htmlFor="pan-select">
            {t('panchanama.selectClaim', 'Select Damage Report:')}
          </label>
          <select
            id="pan-select"
            value={selectedClaimId}
            onChange={(e) => handleClaimSelect(e.target.value)}
            className="text-xs font-bold py-2.5 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white cursor-pointer min-h-[44px]"
          >
            {claims.map((c) => (
              <option key={c.id} value={c.id}>
                {c.claimNumber} • {c.farmerName} ({c.cropName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notice about draft status */}
      <div className="no-print bg-cyan-50/70 border border-cyan-200 rounded-2xl p-4 text-xs text-cyan-950 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 max-w-prose">
          <Info className="w-4 h-4 text-cyan-800 shrink-0" />
          <p className="max-w-prose leading-relaxed">
            {t(
              'panchanama.provisionalNotice',
              'PROVISIONAL DRAFT: This digital record is compiled from spot inspection data for administrative verification. Final sanction requires competent authority approval.'
            )}
          </p>
        </div>
        <Link to="/officer">
          <Button size="sm" variant="outline" className="text-xs py-1 px-3 bg-white min-h-[38px]">
            {t('panchanama.backQueue', 'Back to Officer Desk')}
          </Button>
        </Link>
      </div>

      {/* Render Document */}
      {panchanamaDoc ? (
        <PanchanamaDocument
          document={panchanamaDoc}
          onEdit={() => setIsEditorOpen(true)}
          canEdit={true}
        />
      ) : (
        <EmptyState
          title="No Draft Record Available"
          description="A draft e-Panchanama has not been compiled for this claim yet."
          actionText="Perform Spot Inspection First"
          onAction={() => {}}
        />
      )}

      {/* Editor Modal */}
      {panchanamaDoc && (
        <PanchanamaEditorModal
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          document={panchanamaDoc}
          onSave={handleSaveDraftUpdates}
        />
      )}
    </div>
  );
};

export default DraftPanchanamaPage;
