import React, { useState } from 'react';
import { EPanchanamaDocument } from '@/types';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { useToast } from '@/context/ToastContext';

interface PanchanamaEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: EPanchanamaDocument;
  onSave: (updated: Partial<EPanchanamaDocument>) => Promise<void>;
}

export const PanchanamaEditorModal: React.FC<PanchanamaEditorModalProps> = ({
  isOpen,
  onClose,
  document,
  onSave
}) => {
  const { success, error } = useToast();
  const [affectedAreaAcre, setAffectedAreaAcre] = useState(document.affectedAreaAcre);
  const [damagePercentage, setDamagePercentage] = useState(document.damagePercentage);
  const [cropVariety, setCropVariety] = useState(document.cropVariety || '');
  const [findingsSummary, setFindingsSummary] = useState(document.findingsSummary);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await onSave({
        affectedAreaAcre: Number(affectedAreaAcre),
        damagePercentage: Number(damagePercentage),
        cropVariety,
        findingsSummary
      });
      success('Draft e-Panchanama Updated', 'Your modifications have been recorded in the draft.');
      onClose();
    } catch {
      error('Update Failed', 'Could not save modifications to draft.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Draft e-Panchanama"
      description={`Editing provisional record ${document.reportNumber}`}
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Verified Affected Area (Acres)
            </label>
            <input
              type="number"
              step="0.01"
              value={affectedAreaAcre}
              onChange={(e) => setAffectedAreaAcre(Number(e.target.value))}
              max={document.totalAreaAcre}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              required
            />
            <span className="text-xs text-slate-500 mt-1 block">
              Total plot holding: {document.totalAreaAcre} Acres
            </span>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Assessed Loss Percentage (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={damagePercentage}
              onChange={(e) => setDamagePercentage(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              required
            />
            <span className="text-xs text-slate-500 mt-1 block">
              Govt SDRF threshold is typically &ge; 33%
            </span>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Crop Cultivar / Variety</label>
          <input
            type="text"
            value={cropVariety}
            onChange={(e) => setCropVariety(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g. Co-86032, RCH-659 Bt, JS-335"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Officer Findings & Spot Observations
          </label>
          <textarea
            rows={5}
            value={findingsSummary}
            onChange={(e) => setFindingsSummary(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            placeholder="Record physical condition of crops, extent of water stagnation, root status, panchas statements..."
            required
          />
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSaving}>
            Save Changes to Draft
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PanchanamaEditorModal;
