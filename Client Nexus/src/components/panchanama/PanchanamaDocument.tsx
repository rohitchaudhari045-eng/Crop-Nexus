import React, { useState } from 'react';
import { EPanchanamaDocument } from '@/types';
import { Button } from '@/components/common/Button';
import { Printer, Edit3, ShieldAlert, CheckCircle, FileText, Download } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

interface PanchanamaDocumentProps {
  document: EPanchanamaDocument;
  onEdit?: () => void;
  canEdit?: boolean;
}

export const PanchanamaDocument: React.FC<PanchanamaDocumentProps> = ({
  document,
  onEdit,
  canEdit = true
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const content = `
======================================================================
               CROP NEXUS — PROVISIONAL DRAFT e-PANCHANAMA
======================================================================
Draft Report Number : ${document.reportNumber}
Reference Claim No  : ${document.claimNumber}
Date of Generation  : ${formatDate(document.dateGenerated)}

LOCATION & LAND HOLDING:
----------------------------------------------------------------------
District            : ${document.district}
Taluka              : ${document.taluka}
Village / Gram      : ${document.village}
Survey / Gat Number : ${document.surveyNumber}
Total Land Holding  : ${document.totalAreaAcre} Acres
Assessed Loss Area  : ${document.affectedAreaAcre} Acres

FARMER INFORMATION:
----------------------------------------------------------------------
Full Name           : ${document.farmerName}
Phone Number        : ${document.farmerPhone}

CROP & CALAMITY DETAILS:
----------------------------------------------------------------------
Crop Cultivated     : ${document.cropName} (${document.cropVariety || 'Standard'})
Calamity Event      : ${document.calamityType}
Date of Occurrence  : ${formatDate(document.calamityDate)}
Assessed Damage Pct : ${document.damagePercentage}%

OFFICER SPOT OBSERVATIONS:
----------------------------------------------------------------------
${document.findingsSummary}

WITNESSES (PANCHAS):
----------------------------------------------------------------------
${document.witnesses.map((w, i) => `${i + 1}. ${w.name} (Village: ${w.village}, Aadhaar: ****-****-${w.aadhaarLast4 || 'XXXX'})`).join('\n')}

INSPECTING OFFICER:
----------------------------------------------------------------------
Officer Name        : ${document.officerName}
Designation         : ${document.officerDesignation}
Office              : ${document.officerOffice}
Date of Record      : ${document.officerSignatureDate || 'Pending Sign-off'}

======================================================================
LEGAL DISCLAIMER:
${document.officialDisclaimer}
======================================================================
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${document.reportNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Top Action Toolbar (Hidden in Print) */}
      <div className="no-print bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Document Status:
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
            {document.isDraft ? 'Provisional Draft' : 'Verified'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {canEdit && onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              leftIcon={<Edit3 className="w-4 h-4 text-emerald-700" />}
            >
              Edit Draft Report
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadText}
            leftIcon={<Download className="w-4 h-4 text-slate-600" />}
          >
            {downloadSuccess ? 'Downloaded!' : 'Export Text'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print / Save PDF
          </Button>
        </div>
      </div>

      {/* Printable Sheet View */}
      <div className="print-page bg-white rounded-2xl p-6 sm:p-10 border border-slate-300 shadow-md max-w-4xl mx-auto font-serif text-slate-900 leading-normal relative overflow-hidden">
        {/* Draft Watermark for Print & Screen */}
        {document.isDraft && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5 rotate-[-35deg] text-6xl sm:text-8xl font-black text-slate-900 uppercase">
            DRAFT ONLY
          </div>
        )}

        {/* Official Header */}
        <div className="text-center pb-6 border-b-2 border-slate-800 space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="px-3 py-1 rounded bg-slate-100 text-xs font-sans font-bold tracking-widest uppercase border border-slate-300 text-slate-800">
              Crop Nexus • Digital Agritech Verification System
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider font-sans text-slate-900">
            PROVISIONAL DRAFT e-PANCHANAMA RECORD
          </h1>
          <p className="text-xs font-sans text-slate-600 italic">
            Form 3-A: Spot Verification & Digital Damage Assessment Intimation
          </p>
          <div className="flex flex-wrap items-center justify-between text-xs font-sans text-slate-700 pt-2 font-mono">
            <span>Draft No: <strong>{document.reportNumber}</strong></span>
            <span>Date: <strong>{formatDate(document.dateGenerated)}</strong></span>
            <span>Claim Ref: <strong>{document.claimNumber}</strong></span>
          </div>
        </div>

        {/* Notice */}
        <div className="my-4 py-2 text-xs font-sans text-amber-950 border-y border-amber-200/80 flex items-start gap-2.5 max-w-prose">
          <ShieldAlert className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <p className="leading-relaxed max-w-prose">
            <strong>MANDATORY NOTICE:</strong> {document.officialDisclaimer}
          </p>
        </div>

        {/* Section 1: Land and Farmer Identifiers */}
        <div className="my-6 space-y-2">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider bg-slate-100 px-3 py-1.5 border border-slate-300 text-slate-800 rounded-sm">
            1. Farmer & Revenue Plot Particulars
          </h2>
          <table className="w-full text-xs font-sans border-collapse border border-slate-300">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="w-1/4 p-2 bg-slate-50 font-semibold border-r border-slate-300">Farmer Name:</td>
                <td className="w-1/4 p-2 font-bold border-r border-slate-300">{document.farmerName}</td>
                <td className="w-1/4 p-2 bg-slate-50 font-semibold border-r border-slate-300">Contact:</td>
                <td className="w-1/4 p-2">{document.farmerPhone}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Revenue District:</td>
                <td className="p-2 border-r border-slate-300">{document.district}</td>
                <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Taluka / Tahsil:</td>
                <td className="p-2">{document.taluka}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Village / Gram:</td>
                <td className="p-2 border-r border-slate-300">{document.village}</td>
                <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Gat / Survey No:</td>
                <td className="p-2 font-bold">{document.surveyNumber}</td>
              </tr>
              <tr>
                <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Total Land Holding:</td>
                <td className="p-2 border-r border-slate-300">{document.totalAreaAcre} Acres</td>
                <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Sowing Date:</td>
                <td className="p-2">{formatDate(document.sowingDate)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 2: Calamity and Crop Assessment */}
        <div className="my-6 space-y-2">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider bg-slate-100 px-3 py-1.5 border border-slate-300 text-slate-800 rounded-sm">
            2. Verified Damage & Crop Impact Assessment
          </h2>
          <table className="w-full text-xs font-sans border-collapse border border-slate-300">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="w-1/4 p-2 bg-slate-50 font-semibold border-r border-slate-300">Crop Cultivated:</td>
                <td className="w-1/4 p-2 font-bold border-r border-slate-300">{document.cropName}</td>
                <td className="w-1/4 p-2 bg-slate-50 font-semibold border-r border-slate-300">Variety / Hybrid:</td>
                <td className="w-1/4 p-2">{document.cropVariety || 'Certified Standard'}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Type of Calamity:</td>
                <td className="p-2 font-bold text-red-800 border-r border-slate-300">{document.calamityType}</td>
                <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Date of Incident:</td>
                <td className="p-2">{formatDate(document.calamityDate)}</td>
              </tr>
              <tr>
                <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Affected Area:</td>
                <td className="p-2 font-black text-emerald-900 border-r border-slate-300">
                  {document.affectedAreaAcre} Acres
                </td>
                <td className="p-2 bg-slate-50 font-semibold border-r border-slate-300">Damage Percentage:</td>
                <td className="p-2 font-black text-red-700">{document.damagePercentage}% Assessed Loss</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Field Inspection Notes */}
        <div className="my-6 space-y-2">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider bg-slate-100 px-3 py-1.5 border border-slate-300 text-slate-800 rounded-sm">
            3. Detailed On-Site Observations & Findings
          </h2>
          <p className="py-2 text-xs font-sans leading-relaxed text-slate-800 max-w-prose">
            {document.findingsSummary}
          </p>
        </div>

        {/* Section 4: Witnesses (Panchas) */}
        <div className="my-6 space-y-2">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider bg-slate-100 px-3 py-1.5 border border-slate-300 text-slate-800 rounded-sm">
            4. Local Witnesses Present at Spot Verification (Panchas)
          </h2>
          <table className="w-full text-xs font-sans border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-300 text-slate-700 font-semibold">
                <th className="p-2 text-left border-r border-slate-300">Witness Name</th>
                <th className="p-2 text-left border-r border-slate-300">Village</th>
                <th className="p-2 text-left border-r border-slate-300">Aadhaar (Masked)</th>
                <th className="p-2 text-left">Digital Consent / Attestation</th>
              </tr>
            </thead>
            <tbody>
              {document.witnesses.map((witness, i) => (
                <tr key={i} className="border-b border-slate-200 last:border-b-0">
                  <td className="p-2 font-bold text-slate-900 border-r border-slate-300">{witness.name}</td>
                  <td className="p-2 text-slate-700 border-r border-slate-300">{witness.village}</td>
                  <td className="p-2 font-mono text-slate-700 border-r border-slate-300">****-****-{witness.aadhaarLast4 || 'XXXX'}</td>
                  <td className="p-2 font-mono italic text-emerald-800">[Verified Digitally]</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 5: Officer Signature & Stamp Block */}
        <div className="mt-10 pt-6 border-t-2 border-slate-800 font-sans grid grid-cols-2 gap-8 text-xs">
          <div>
            <p className="text-slate-600 mb-6">Farmer Acknowledgement:</p>
            <div className="border-b border-slate-400 pb-1 mb-1 font-semibold text-slate-900">{document.farmerName}</div>
            <p className="text-xs text-slate-600">Signature / Consent recorded on portal</p>
          </div>

          <div className="text-right">
            <p className="text-slate-600 mb-6">Field Inspecting Officer:</p>
            <div className="border-b border-slate-400 pb-1 mb-1 font-bold text-slate-900">
              {document.officerName}
            </div>
            <p className="text-xs text-slate-700">{document.officerDesignation}</p>
            <p className="text-xs text-slate-600">{document.officerOffice}</p>
            <p className="text-xs font-mono text-emerald-800 mt-1">
              Signed electronically on: {document.officerSignatureDate || formatDate(document.dateGenerated)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanchanamaDocument;
