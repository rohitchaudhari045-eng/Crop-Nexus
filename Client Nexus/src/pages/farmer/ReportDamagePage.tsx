import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useTranslation } from '@/i18n/LanguageContext';
import { damageReportApi } from '@/api/claimsApi';
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
  ArrowRight,
  ArrowLeft,
  Check,
  ExternalLink
} from 'lucide-react';

export const ReportDamagePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { success, error } = useToast();
  const { t } = useTranslation();

  // Wizard Step: 1, 2, 3, 4
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Section 1: Incident details
  const [damageDate, setDamageDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [damageCause, setDamageCause] = useState<DamageCause>('heavy_rainfall');
  const [damageDescription, setDamageDescription] = useState('');
  const [state] = useState('Maharashtra');
  const [district, setDistrict] = useState(user?.district || DISTRICTS_LIST[0]);
  const [taluka, setTaluka] = useState(user?.taluka || 'Shirol');
  const [village, setVillage] = useState(user?.village || 'Ganeshwadi');
  const [surveyNumber, setSurveyNumber] = useState('');

  // Section 2: Crop details
  const [cropName, setCropName] = useState(CROPS_LIST[0]);
  const [cropType, setCropType] = useState(CROP_TYPES[0]);
  const [totalLandAreaAcre, setTotalLandAreaAcre] = useState<number>(3.0);
  const [affectedAreaAcre, setAffectedAreaAcre] = useState<number>(1.5);
  const [estimatedLossPercentage, setEstimatedLossPercentage] = useState<number>(50);

  // Section 3: Evidence photos
  const [photos, setPhotos] = useState<PhotoAttachment[]>([
    {
      id: 'demo-img-01',
      url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
      name: 'field_submerged_photo.jpg',
      uploadedAt: new Date().toISOString(),
      caption: 'Field inundation watermark along crop root zone'
    }
  ]);

  // Section 4: Declaration & Submission state
  const [isDeclared, setIsDeclared] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedClaimNumber, setSubmittedClaimNumber] = useState<string | null>(null);

  // Field validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validate Step 1
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!damageDate) errs.damageDate = 'Please select the date of occurrence.';
    if (!surveyNumber.trim()) errs.surveyNumber = 'Survey or Gut Number is required as per 7/12.';
    if (!taluka.trim()) errs.taluka = 'Taluka is required.';
    if (!village.trim()) errs.village = 'Village name is required.';
    if (!damageDescription.trim() || damageDescription.trim().length < 15) {
      errs.damageDescription = 'Please describe the calamity incident (at least 15 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Step 2
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (totalLandAreaAcre <= 0) errs.totalLandAreaAcre = 'Total area must be greater than zero.';
    if (affectedAreaAcre <= 0) errs.affectedAreaAcre = 'Affected area must be greater than zero.';
    if (affectedAreaAcre > totalLandAreaAcre) {
      errs.affectedAreaAcre = 'Affected area cannot exceed total land holding.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) {
        error('Validation Required', 'Please complete the highlighted incident fields.');
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (!validateStep2()) {
        error('Validation Required', 'Please correct the crop and area parameters.');
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 3) {
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Photo upload handling (supports camera and file browser)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: PhotoAttachment[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 10 * 1024 * 1024) {
        error('File Too Large', `${file.name} exceeds 10MB limit.`);
        continue;
      }
      newAttachments.push({
        id: `photo-${Date.now()}-${i}`,
        url: URL.createObjectURL(file),
        name: file.name,
        uploadedAt: new Date().toISOString(),
        sizeBytes: file.size,
        caption: file.name
      });
    }

    setPhotos((prev) => [...prev, ...newAttachments]);
    success('Photos Attached', `${newAttachments.length} photo(s) selected for report preview.`);
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  // Final Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isDeclared) {
      error('Declaration Required', t('report.review.declarationError', 'Please confirm the accuracy declaration.'));
      return;
    }

    try {
      setIsSubmitting(true);
      const reportData: CropDamageReportInput = {
        farmerName: user?.name || 'Rameshwar Patil',
        farmerPhone: user?.phone || '9823411223',
        cropName,
        cropType,
        state,
        district,
        taluka,
        village,
        surveyNumber: surveyNumber.trim(),
        totalLandAreaAcre: Number(totalLandAreaAcre),
        affectedAreaAcre: Number(affectedAreaAcre),
        damageDate,
        damageCause,
        estimatedLossPercentage: Number(estimatedLossPercentage),
        damageDescription: damageDescription.trim(),
        photos
      };

      const currentUser = user || {
        id: 'usr-farmer-01',
        name: 'Rameshwar Patil',
        email: 'rameshwar.patil@example.com',
        phone: '9823411223',
        role: 'farmer' as const,
        createdAt: new Date().toISOString()
      };

      const created = await damageReportApi.submitReport(reportData, currentUser);
      setSubmittedClaimNumber(created.claimNumber);
      success('Intimation Submitted', `Damage intimation ${created.claimNumber} logged successfully.`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      error('Submission Failed', 'Could not record damage intimation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (submittedClaimNumber) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('report.success.title', 'Damage Report Submitted Successfully!')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto text-pretty">
              {t(
                'report.success.message',
                'Your damage intimation has been registered. The local Taluka Agriculture Officer has been notified to schedule a spot field inspection.'
              )}
            </p>
          </div>

          {/* Reference Badge Card */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 max-w-md mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block mb-1">
              {t('report.success.claimNumber', 'Report Reference Number')}
            </span>
            <span className="text-2xl font-black font-mono text-emerald-950 tracking-wider">
              {submittedClaimNumber}
            </span>
          </div>

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 space-y-1">
            <p>
              <strong>Next Step:</strong> Field inspection by designated Circle Officer and Panchas.
            </p>
            <p>Status updates will be notified via SMS and visible in your portal.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link to="/claims" className="w-full sm:w-auto">
              <Button size="md" variant="primary" className="w-full sm:w-auto min-h-[44px]">
                {t('report.success.trackBtn', 'Track This Report')}
              </Button>
            </Link>
            <Link to="/farmer" className="w-full sm:w-auto">
              <Button size="md" variant="outline" className="w-full sm:w-auto min-h-[44px]">
                {t('report.success.dashboardBtn', 'Back to Dashboard')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Wizard Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Form 1-A: Calamity Intimation
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('report.form.title', 'Report Crop Damage')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 text-pretty">
          {t(
            'report.form.subtitle',
            'Submit official intimation within 72 hours of calamity occurrence for field inspection.'
          )}
        </p>

        {/* Multi-Step Wizard Progress Bar */}
        <div className="pt-3">
          <div className="grid grid-cols-4 gap-2 text-xs font-bold mb-2">
            {[
              { num: 1, label: t('report.form.step1', 'Incident') },
              { num: 2, label: t('report.form.step2', 'Crop & Land') },
              { num: 3, label: t('report.form.step3', 'Evidence') },
              { num: 4, label: t('report.form.step4', 'Review') }
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num < currentStep) setCurrentStep(s.num);
                }}
                className={`flex items-center gap-1.5 p-2 rounded-xl border text-left transition-colors cursor-pointer ${
                  currentStep === s.num
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20'
                    : s.num < currentStep
                    ? 'border-slate-200 bg-slate-50 text-slate-800'
                    : 'border-slate-100 text-slate-400 opacity-60'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-xs flex items-center justify-center shrink-0 ${
                    s.num < currentStep
                      ? 'bg-emerald-800 text-white'
                      : currentStep === s.num
                      ? 'bg-emerald-800 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {s.num < currentStep ? <Check className="w-3 h-3" /> : s.num}
                </span>
                <span className="truncate hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 1: Incident & Location Details */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <ShieldAlert className="w-4 h-4 text-emerald-800" />
            <h2 className="font-bold uppercase tracking-wider text-slate-900">
              {t('report.incident.title', 'Disaster & Location Information')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="inc-date">
                {t('report.incident.date', 'Date of Calamity Occurrence')} *
              </label>
              <input
                id="inc-date"
                type="date"
                value={damageDate}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDamageDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                required
              />
              {errors.damageDate && <p className="text-red-600 text-xs mt-1">{errors.damageDate}</p>}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="inc-cause">
                {t('report.incident.cause', 'Disaster / Calamity Type')} *
              </label>
              <select
                id="inc-cause"
                value={damageCause}
                onChange={(e) => setDamageCause(e.target.value as DamageCause)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
              >
                {DAMAGE_CAUSES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="inc-dist">
                {t('report.incident.district', 'District')} *
              </label>
              <select
                id="inc-dist"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
              >
                {DISTRICTS_LIST.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="inc-taluka">
                {t('report.incident.taluka', 'Taluka')} *
              </label>
              <input
                id="inc-taluka"
                type="text"
                value={taluka}
                onChange={(e) => setTaluka(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                required
              />
              {errors.taluka && <p className="text-red-600 text-xs mt-1">{errors.taluka}</p>}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="inc-village">
                {t('report.incident.village', 'Village / Gram')} *
              </label>
              <input
                id="inc-village"
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                required
              />
              {errors.village && <p className="text-red-600 text-xs mt-1">{errors.village}</p>}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="inc-survey">
                {t('report.incident.survey', 'Survey / Gat Number (7/12)')} *
              </label>
              <input
                id="inc-survey"
                type="text"
                value={surveyNumber}
                onChange={(e) => setSurveyNumber(e.target.value)}
                placeholder={t('report.incident.surveyPlaceholder', 'e.g. 142/3-B')}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                required
              />
              {errors.surveyNumber && <p className="text-red-600 text-xs mt-1">{errors.surveyNumber}</p>}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1" htmlFor="inc-desc">
              {t('report.incident.desc', 'Short Description of Calamity Incident')} *
            </label>
            <textarea
              id="inc-desc"
              rows={3}
              value={damageDescription}
              onChange={(e) => setDamageDescription(e.target.value)}
              placeholder={t(
                'report.incident.descPlaceholder',
                'Explain what happened (e.g. continuous heavy downpour for 48 hours led to severe waterlogging...)'
              )}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 leading-relaxed"
              required
            />
            {errors.damageDescription && (
              <p className="text-red-600 text-xs mt-1">{errors.damageDescription}</p>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleNext}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="min-h-[44px]"
            >
              {t('common.next', 'Next: Crop Details')}
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: Crop & Area Details */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-emerald-800" />
            <h2 className="font-bold uppercase tracking-wider text-slate-900">
              {t('report.crop.title', 'Crop & Area Details')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="crop-name">
                {t('report.crop.name', 'Crop Name')} *
              </label>
              <select
                id="crop-name"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
              >
                {CROPS_LIST.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="crop-type">
                {t('report.crop.type', 'Crop Classification')} *
              </label>
              <select
                id="crop-type"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
              >
                {CROP_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="tot-area">
                {t('report.crop.totalArea', 'Total Plot Holding Area (Acres)')} *
              </label>
              <input
                id="tot-area"
                type="number"
                step="0.01"
                min="0.05"
                value={totalLandAreaAcre}
                onChange={(e) => setTotalLandAreaAcre(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                required
              />
              {errors.totalLandAreaAcre && (
                <p className="text-red-600 text-xs mt-1">{errors.totalLandAreaAcre}</p>
              )}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="aff-area">
                {t('report.crop.affectedArea', 'Damaged / Affected Area (Acres)')} *
              </label>
              <input
                id="aff-area"
                type="number"
                step="0.01"
                min="0.01"
                max={totalLandAreaAcre}
                value={affectedAreaAcre}
                onChange={(e) => setAffectedAreaAcre(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                required
              />
              {errors.affectedAreaAcre && (
                <p className="text-red-600 text-xs mt-1">{errors.affectedAreaAcre}</p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-slate-700">
                {t('report.crop.lossPercentage', 'Estimated Loss Percentage')}:{' '}
                <span className="text-emerald-800 font-extrabold text-sm">{estimatedLossPercentage}%</span>
              </label>
              <span className="text-xs text-slate-500">
                {t('report.crop.lossPercentageHint', 'Estimate extent')}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={estimatedLossPercentage}
              onChange={(e) => setEstimatedLossPercentage(Number(e.target.value))}
              className="w-full accent-emerald-800 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleBack}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className="min-h-[44px]"
            >
              {t('common.back', 'Back')}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleNext}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="min-h-[44px]"
            >
              {t('common.next', 'Next: Evidence Photos')}
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Photographs & Evidence */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-800" />
              <h2 className="font-bold uppercase tracking-wider text-slate-900">
                {t('report.photos.title', 'Supporting Field Photographs')} ({photos.length})
              </h2>
            </div>
            <span className="text-xs text-slate-500">Max 10MB per photo</span>
          </div>

          <p className="text-slate-600 text-pretty">
            {t(
              'report.photos.subtitle',
              'Clear photographs of the damaged crop help officers plan the spot inspection.'
            )}
          </p>

          {/* Upload Drop/Click Box with Camera option */}
          <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-3 bg-slate-50/70">
            <Upload className="w-8 h-8 text-emerald-800 mx-auto" />
            <div>
              <p className="font-bold text-slate-800">
                {t('report.photos.uploadPrompt', 'Select or capture crop damage photographs')}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('report.photos.uploadHint', 'Supports JPG, PNG. Mobile camera capture supported.')}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {/* File input */}
              <label className="cursor-pointer">
                <span className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-800 text-white shadow-xs hover:bg-emerald-900 transition-colors inline-flex items-center gap-1.5 min-h-[44px]">
                  <Upload className="w-4 h-4" /> {t('report.photos.browse', 'Select Photos')}
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Direct Camera Trigger for mobile */}
              <label className="cursor-pointer">
                <span className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5 min-h-[44px]">
                  <Camera className="w-4 h-4 text-emerald-800" /> Camera Capture
                </span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Photo Previews */}
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-100"
                >
                  <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
                    aria-label="Remove photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 px-2 py-1 text-xs text-white truncate">
                    {photo.name}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic py-2 text-center">
              {t('report.photos.noPhotos', 'No photos added yet.')}
            </p>
          )}

          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleBack}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className="min-h-[44px]"
            >
              {t('common.back', 'Back')}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleNext}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="min-h-[44px]"
            >
              {t('common.next', 'Next: Review & Submit')}
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: Review & Final Submission */}
      {currentStep === 4 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs space-y-4 text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-800" />
              <h2 className="font-bold uppercase tracking-wider text-slate-900">
                {t('report.review.title', 'Review Damage Intimation Summary')}
              </h2>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {/* Incident Details Summary */}
              <div className="space-y-2 pr-0 sm:pr-4">
                <div className="flex items-center justify-between pb-1">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                    Incident & Land
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Date:</span>
                  <span className="font-bold text-slate-900">{damageDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Calamity Type:</span>
                  <span className="font-bold text-red-700 capitalize">
                    {damageCause.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Survey / Gat No:</span>
                  <span className="font-mono font-bold text-slate-900">{surveyNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-bold text-slate-900">
                    {village}, {taluka}, {district}
                  </span>
                </div>
              </div>

              {/* Crop Details Summary */}
              <div className="space-y-2 pt-3 sm:pt-0 pl-0 sm:pl-4">
                <div className="flex items-center justify-between pb-1">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                    Crop & Loss
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Crop:</span>
                  <span className="font-bold text-slate-900">{cropName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Classification:</span>
                  <span className="font-bold text-slate-900">{cropType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Damaged Area:</span>
                  <span className="font-bold text-emerald-800">
                    {affectedAreaAcre} of {totalLandAreaAcre} Acres
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Est. Loss %:</span>
                  <span className="font-bold text-red-700">{estimatedLossPercentage}%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Photos Attached:</span>
                  <span className="font-bold text-slate-900">{photos.length}</span>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-slate-500 font-bold block mb-1">Description:</span>
              <p className="p-3 rounded-xl bg-slate-50 text-slate-700 text-xs leading-relaxed italic">
                "{damageDescription}"
              </p>
            </div>

            {/* Mandatory Declaration Checkbox */}
            <div className="pt-3 border-t border-slate-100">
              <label className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 cursor-pointer hover:bg-emerald-50 transition-colors">
                <input
                  type="checkbox"
                  checked={isDeclared}
                  onChange={(e) => setIsDeclared(e.target.checked)}
                  className="w-4 h-4 accent-emerald-800 rounded mt-0.5 cursor-pointer shrink-0"
                  required
                />
                <span className="text-xs text-emerald-950 font-medium leading-relaxed">
                  {t(
                    'report.review.declaration',
                    'I hereby certify that the information entered above regarding the crop damage on my plot is true and accurate to the best of my knowledge.'
                  )}
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleBack}
                disabled={isSubmitting}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                className="min-h-[44px]"
              >
                {t('common.back', 'Back')}
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                leftIcon={<FilePlus2 className="w-4 h-4" />}
                className="min-h-[44px]"
              >
                {t('report.review.finalSubmit', 'Confirm & Submit Damage Report')}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReportDamagePage;
