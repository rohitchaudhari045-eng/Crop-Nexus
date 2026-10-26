import React, { useState } from 'react';
import { ClaimRecord } from '@/types';
import { Modal } from '@/components/common/Modal';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { ClaimStatusTimeline } from './ClaimStatusTimeline';
import { formatDate, formatCurrencyINR, formatArea, getDamageCauseLabel } from '@/utils/formatters';
import {
  MapPin,
  Calendar,
  AlertTriangle,
  FileSpreadsheet,
  Image as ImageIcon,
  ExternalLink,
  ShieldCheck,
  User,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ClaimDetailsModalProps {
  claim: ClaimRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (status: any, remarks: string) => void;
}

export const ClaimDetailsModal: React.FC<ClaimDetailsModalProps> = ({
  claim,
  isOpen,
  onClose,
  onUpdateStatus
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!claim) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Claim ${claim.claimNumber}`}
      description={`Registered on ${formatDate(claim.submissionDate)}`}
      maxWidth="3xl"
      footer={
        <div className="flex flex-wrap items-center justify-between w-full gap-2">
          <div className="flex items-center gap-2">
            {claim.status === 'panchanama_drafted' || claim.status === 'verified' || claim.status === 'approved' ? (
              <Link to={`/officer/panchanama?claimId=${claim.id}`}>
                <Button size="sm" variant="secondary" leftIcon={<FileSpreadsheet className="w-4 h-4" />}>
                  View Draft e-Panchanama
                </Button>
              </Link>
            ) : null}
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header Summary Banner */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-emerald-950">{claim.cropName}</span>
              <Badge claimStatus={claim.status} />
              <Badge compensationStatus={claim.compensationStatus} />
            </div>
            <p className="text-xs text-emerald-800">
              Crop Type: <span className="font-semibold">{claim.cropType}</span> • Estimated Loss:{' '}
              <span className="font-semibold">{claim.estimatedLossPercentage}%</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase font-bold text-emerald-800">Relief Estimate</p>
            <p className="text-lg font-black text-emerald-900">
              {formatCurrencyINR(claim.sanctionedCompensationAmount || claim.estimatedCompensationAmount)}
            </p>
          </div>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Farmer & Location details */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-1.5 text-slate-700">
              <User className="w-3.5 h-3.5" /> Farmer & Land Specifics
            </h4>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-slate-500 block">Farmer Name</span>
                <span className="font-semibold text-slate-800">{claim.farmerName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Contact Phone</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-600" /> {claim.farmerPhone}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Survey / Gut No.</span>
                <span className="font-semibold text-slate-800">{claim.surveyNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Plot Area</span>
                <span className="font-semibold text-slate-800">{formatArea(claim.totalLandAreaAcre)}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block">Location</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" />
                  {claim.village}, Taluka {claim.taluka}, Dist. {claim.district}, {claim.state}
                </span>
              </div>
            </div>
          </div>

          {/* Calamity & Affected Info */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-1.5 text-slate-700">
              <AlertTriangle className="w-3.5 h-3.5" /> Calamity & Impact Details
            </h4>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-slate-500 block">Damage Cause</span>
                <span className="font-semibold text-slate-800">{getDamageCauseLabel(claim.damageCause)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Date of Calamity</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" /> {formatDate(claim.damageDate)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Reported Affected Area</span>
                <span className="font-semibold text-emerald-800 font-mono text-sm">
                  {formatArea(claim.affectedAreaAcre)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Assigned Officer</span>
                <span className="font-semibold text-slate-800">
                  {claim.officerAssignedName || 'Awaiting Assignment'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Damage Description */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs">
          <h4 className="font-bold text-slate-900 mb-1">Farmer's Damage Narrative</h4>
          <p className="text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100">
            "{claim.damageDescription}"
          </p>
        </div>

        {/* Uploaded Damage Photos */}
        {claim.photos && claim.photos.length > 0 && (
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" /> Supporting Field Photographs ({claim.photos.length})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {claim.photos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo.url)}
                  className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video cursor-pointer"
                >
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                    <ExternalLink className="w-3.5 h-3.5" /> Preview
                  </div>
                  {photo.caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-xs text-white px-2 py-1 truncate">
                      {photo.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Claim Status Progress Stepper & Audit Log */}
        <div className="pt-2 border-t border-slate-200">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verification & Approval Timeline
          </h4>
          <ClaimStatusTimeline currentStatus={claim.status} statusHistory={claim.statusHistory} />
        </div>
      </div>

      {/* Enlarged Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh]">
            <img
              src={selectedPhoto}
              alt="Enlarged field evidence"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
            <p className="text-white text-center text-xs mt-2">Click anywhere to close</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ClaimDetailsModal;
