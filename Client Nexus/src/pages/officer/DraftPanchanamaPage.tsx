import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { claimsApi, panchanamaApi } from '@/services/apiService';
import { ClaimRecord, EPanchanamaDocument } from '@/types';
import { PanchanamaDocument } from '@/components/panchanama/PanchanamaDocument';
import { PanchanamaEditorModal } from '@/components/panchanama/PanchanamaEditorModal';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { FileSpreadsheet, PlusCircle, ArrowLeft, ShieldCheck, Info } from 'lucide-react';

export const DraftPanchanamaPage: React.FC = () => {
  const [searchParams] = useSearchParams();
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
      const allClaims = await claimsApi.getAll();
      setClaims(allClaims);

      const queryClaimId = searchParams.get('claimId');
      const targetId = queryClaimId || allClaims[0]?.id;

      if (targetId) {
        setSelectedClaimId(targetId);
        await loadDocumentForClaim(targetId, allClaims);
      }
      setLoading(false);
    };
    loadData();
  }, [searchParams]);

  const loadDocumentForClaim = async (claimId: string, claimsList = claims) => {
    let doc = await panchanamaApi.getByClaimId(claimId);
    if (!doc) {
      // If not drafted yet, generate a draft for viewing
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

  const currentClaim = claims.find((c) => c.id === selectedClaimId);

  return (
    <div className="space-y-6">
      {/* Top Banner and Claim Selector Bar (Hidden in Print) */}
      <div className="no-print bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
              Provisional Record Viewer
            </span>
            <span className="text-xs text-slate-600 font-medium">• Form 3-A Compiler</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Draft e-Panchanama Document
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-prose leading-relaxed">
            Compiled digital spot records containing verified plot coordinates, damage percentages, witness statements, and inspecting officer signatures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-bold text-slate-700">Select Claim:</div>
          <select
            value={selectedClaimId}
            onChange={(e) => handleClaimSelect(e.target.value)}
            className="text-xs font-bold py-2 px-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white cursor-pointer"
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
          <Info className="w-4 h-4 text-cyan-700 shrink-0" />
          <p className="max-w-prose leading-relaxed">
            This digital record is labeled as a <strong>Provisional Draft</strong>. Authorized officers can edit observations or use the Print / PDF export tool.
          </p>
        </div>
        <Link to="/officer">
          <Button size="sm" variant="outline" className="text-xs py-1 px-3 bg-white">
            Back to Queue
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
