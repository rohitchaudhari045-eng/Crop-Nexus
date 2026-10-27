import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { claimsApi } from '@/services/apiService';
import { CropDamageReportInput, DamageCause, PhotoAttachment } from '@/types';
import { Button } from '@/components/common/Button';
import { CROPS_LIST, CROP_TYPES, DISTRICTS_LIST, DAMAGE_CAUSES } from '@/utils/constants';
import {
  FilePlus2,
  Camera,
  Upload,
  X,
  AlertCircle,
  CheckCircle2,
  Calendar,
  MapPin,
  ShieldAlert,
  Info
} from 'lucide-react';

export const ReportDamagePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error } = useToast();

  const [farmerName, setFarmerName] = useState(user?.name || '');
  const [farmerPhone, setFarmerPhone] = useState(user?.phone || '');
  const [cropName, setCropName] = useState(CROPS_LIST[0]);
  const [cropType, setCropType] = useState(CROP_TYPES[0]);
  const [district, setDistrict] = useState(user?.district || DISTRICTS_LIST[0]);
  const [taluka, setTaluka] = useState('Shirol');
  const [village, setVillage] = useState(user?.village || 'Ganeshwadi');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [totalLandAreaAcre, setTotalLandAreaAcre] = useState<number>(3.0);
  const [affectedAreaAcre, setAffectedAreaAcre] = useState<number>(1.5);
  const [damageDate, setDamageDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [damageCause, setDamageCause] = useState<DamageCause>('heavy_rainfall');
  const [estimatedLossPercentage, setEstimatedLossPercentage] = useState<number>(50);
  const [damageDescription, setDamageDescription] = useState('');
  const [photos, setPhotos] = useState<PhotoAttachment[]>([
    {
      id: 'demo-img-01',
      url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
      name: 'field_submerged_photo.jpg',
      uploadedAt: new Date().toISOString(),
      caption: 'Inundation watermark along crop root zone'
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulated photo upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: PhotoAttachment[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Create local object URL for preview
      const previewUrl = URL.createObjectURL(file);
      newAttachments.push({
        id: `photo-${Date.now()}-${i}`,
        url: previewUrl,
        name: file.name,
        uploadedAt: new Date().toISOString(),
        sizeBytes: file.size,
        caption: `Uploaded: ${file.name}`
      });
    }

    setPhotos((prev) => [...prev, ...newAttachments]);
    success('Photos Added', `${files.length} photo(s) selected for report preview.`);
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!surveyNumber.trim()) {
      error('Survey Number Required', 'Please provide Gat or Survey Number.');
      return;
    }

    if (affectedAreaAcre > totalLandAreaAcre) {
      error('Invalid Area', 'Affected area cannot exceed total land area.');
      return;
    }

    if (!damageDescription.trim() || damageDescription.length < 15) {
      error('Description Too Short', 'Please provide at least 15 characters explaining the loss.');
      return;
    }

    try {
      setIsSubmitting(true);
      const reportData: CropDamageReportInput = {
        farmerName,
        farmerPhone,
        cropName,
        cropType,
        state: 'Maharashtra',
        district,
        taluka,
        village,
        surveyNumber,
        totalLandAreaAcre: Number(totalLandAreaAcre),
        affectedAreaAcre: Number(affectedAreaAcre),
        damageDate,
        damageCause,
        estimatedLossPercentage: Number(estimatedLossPercentage),
        damageDescription,
        photos
      };

      const fallbackUser = user || {
        id: 'usr-farmer-01',
        name: farmerName,
        email: 'farmer@cropnexus.demo',
        phone: farmerPhone,
        role: 'farmer' as const,
        createdAt: new Date().toISOString()
      };

      const created = await claimsApi.create(reportData, fallbackUser);

      success('Intimation Submitted Successfully', `Claim ${created.claimNumber} has been logged.`);
      navigate(`/claims`);
    } catch {
      error('Submission Failed', 'Could not save damage intimation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Form 1-A: Calamity Intimation
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Report Crop Damage
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
          Submit official intimation within 72 hours of natural calamity occurrence to enable agriculture officers to schedule field inspections.
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Farmer & Contact */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1. Farmer & Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Cultivator Full Name</label>
              <input
                type="text"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile Contact (Aadhaar / DBT Linked)</label>
              <input
                type="tel"
                value={farmerPhone}
                onChange={(e) => setFarmerPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Crop & Location */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-emerald-600" /> 2. Crop Details & Land Revenue Records
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Cultivated Crop</label>
              <select
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-white"
              >
                {CROPS_LIST.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Crop Classification</label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-white"
              >
                {CROP_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Revenue District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-white"
              >
                {DISTRICTS_LIST.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Taluka / Tahsil</label>
              <input
                type="text"
                value={taluka}
                onChange={(e) => setTaluka(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Village / Gram</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Survey / Gut Number (As per 7/12 extract)
              </label>
              <input
                type="text"
                value={surveyNumber}
                onChange={(e) => setSurveyNumber(e.target.value)}
                placeholder="e.g. 142/3-B or 88/1"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold placeholder:text-slate-500 text-slate-900"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Plot Holding (Acres)</label>
              <input
                type="number"
                step="0.01"
                min="0.1"
                value={totalLandAreaAcre}
                onChange={(e) => setTotalLandAreaAcre(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Approx. Affected Area (Acres)</label>
              <input
                type="number"
                step="0.01"
                min="0.05"
                max={totalLandAreaAcre}
                value={affectedAreaAcre}
                onChange={(e) => setAffectedAreaAcre(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3: Calamity and Damage Details */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <ShieldAlert className="w-4 h-4 text-emerald-600" /> 3. Calamity Cause & Loss Assessment
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Reason for Damage</label>
              <select
                value={damageCause}
                onChange={(e) => setDamageCause(e.target.value as DamageCause)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold bg-white"
              >
                {DAMAGE_CAUSES.map((cause) => (
                  <option key={cause.value} value={cause.value}>
                    {cause.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Date of Calamity Occurrence</label>
              <div className="relative">
                <input
                  type="date"
                  value={damageDate}
                  onChange={(e) => setDamageDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <label className="font-bold text-slate-700">Estimated Loss Percentage: {estimatedLossPercentage}%</label>
              <span className="text-xs text-slate-500">0% (Minor) to 100% (Complete)</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={estimatedLossPercentage}
              onChange={(e) => setEstimatedLossPercentage(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 text-xs">
              Damage Description & Field Narrative
            </label>
            <textarea
              rows={4}
              value={damageDescription}
              onChange={(e) => setDamageDescription(e.target.value)}
              placeholder="Describe symptoms, water stagnation depth, lodging, broken stalks, or siltation..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs placeholder:text-slate-500 text-slate-900"
              required
            />
          </div>
        </div>

        {/* Section 4: Photo Evidence Upload */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-800" /> 4. Supporting Photographs ({photos.length})
            </h2>
            <span className="text-xs text-slate-500">Clear geotagged or field pictures</span>
          </div>

          <div className="py-6 text-center space-y-2">
            <Upload className="w-8 h-8 text-emerald-800 mx-auto" />
            <p className="text-xs font-bold text-slate-800">
              Select or drop crop damage photos
            </p>
            <p className="text-xs text-slate-500 mt-0.5 mb-2">
              Supports JPG, PNG up to 10MB per photo
            </p>
            <label className="inline-block cursor-pointer">
              <span className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs hover:bg-emerald-100 transition-colors">
                Browse Files
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Photo Preview Grid */}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100"
                >
                  <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors cursor-pointer"
                    aria-label="Remove photo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 px-2 py-0.5 text-xs text-white truncate">
                    {photo.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Submission automatically dispatches notification to Taluka inspection desk.</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => navigate('/farmer')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              leftIcon={<FilePlus2 className="w-4 h-4" />}
            >
              Submit Intimation
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportDamagePage;
