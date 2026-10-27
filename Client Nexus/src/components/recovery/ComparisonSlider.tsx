import React, { useState } from 'react';
import { Star, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { CropRecoveryProgressRecord } from '@/types';
import { formatDate } from '@/utils/formatters';

interface ComparisonSliderProps {
  records: CropRecoveryProgressRecord[];
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ records }) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string>(
    records[0]?.id || ''
  );
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const activeRecord = records.find((r) => r.id === selectedRecordId) || records[0];

  if (!activeRecord) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300">
        No recovery progression records available yet.
      </div>
    );
  }

  const beforeImg = activeRecord.beforePhotoUrl || 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80';
  const afterImg = activeRecord.afterPhotoUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="space-y-6">
      {/* Milestone Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {records.map((rec, idx) => (
          <button
            key={rec.id}
            onClick={() => setSelectedRecordId(rec.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              rec.id === activeRecord.id
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>Milestone {idx + 1}: {rec.stageName.split('—')[0]}</span>
            {rec.milestoneReached && <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
        ))}
      </div>

      {/* Main Comparison Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="font-bold text-base text-slate-900">{activeRecord.stageName}</h2>
            <p className="text-xs text-slate-500">
              Recorded on {formatDate(activeRecord.updateDate)} • Crop: <span className="font-semibold text-slate-800">{activeRecord.cropName}</span>
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-amber-800 font-bold mr-1">Vigor Score:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < activeRecord.healthRating
                    ? 'fill-amber-400 text-amber-700'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Interactive Split-view Before/After Slider */}
        <div className="relative aspect-video sm:aspect-21/9 rounded-xl overflow-hidden border border-slate-200 select-none bg-slate-900">
          {/* After image (Background full width) */}
          <img
            src={afterImg}
            alt="After treatment state"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-emerald-800/90 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
            AFTER RECOVERY
          </div>

          {/* Before image (Clipped with width from slider) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImg}
              alt="Before treatment state"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: '100%' }}
            />
            <div className="absolute top-3 left-3 bg-red-800/90 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
              INITIAL DAMAGE
            </div>
          </div>

          {/* Divider line and handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-lg border border-slate-200 text-xs font-bold">
              <ArrowLeft className="w-3 h-3 -mr-0.5" />
              <ArrowRight className="w-3 h-3 -ml-0.5" />
            </div>
          </div>

          {/* Range input overlay for smooth scrub */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
            aria-label="Drag before and after split slider"
          />
        </div>
        <p className="text-xs text-center text-slate-500">
          Slide left or right across the image to examine plant foliage revival and root canopy recovery.
        </p>

        {/* Notes */}
        <div className="pt-3 border-t border-slate-100 text-xs space-y-1">
          <span className="font-bold text-slate-800 uppercase tracking-wider text-xs block">
            Agronomist & Farmer Field Progress Notes:
          </span>
          <p className="text-slate-700 leading-relaxed italic max-w-prose">
            "{activeRecord.notes}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
