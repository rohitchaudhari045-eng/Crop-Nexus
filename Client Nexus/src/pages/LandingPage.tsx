import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { useTranslation } from '@/i18n/LanguageContext';
import {
  FilePlus2,
  FileSpreadsheet,
  Activity,
  CloudSun,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-16 pb-12 sm:pb-20 bg-gradient-to-b from-slate-100/70 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t('landing.hero.badge', 'Maharashtra Calamity Relief Workflow')}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
                {t('landing.hero.title', 'Transparent Crop Damage Reporting & Relief Verification')}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl leading-relaxed text-pretty mx-auto lg:mx-0">
                {t(
                  'landing.hero.subtitle',
                  'A mobile-first portal enabling Maharashtra farmers to report disaster crop losses within statutory windows, and assisting agriculture officers in conducting verifiable on-site spot inspections.'
                )}
              </p>

              {/* Primary Call to Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
                <Link to="/report-damage" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="primary"
                    className="w-full sm:w-auto min-h-[48px]"
                    leftIcon={<FilePlus2 className="w-5 h-5" />}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {t('landing.hero.ctaReport', 'Report Crop Damage')}
                  </Button>
                </Link>
                <Link to="/claims" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto min-h-[48px]"
                    leftIcon={<Clock className="w-5 h-5 text-slate-600" />}
                  >
                    {t('landing.hero.ctaTrack', 'Track Report Status')}
                  </Button>
                </Link>
              </div>

              {/* Verified Metrics Bar */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-3 sm:gap-6 text-center lg:text-left">
                <div>
                  <p className="text-xl sm:text-3xl font-extrabold text-slate-900">
                    {t('landing.metric.window', '72 Hours')}
                  </p>
                  <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    {t('landing.metric.windowLabel', 'Intimation Window')}
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-3xl font-extrabold text-emerald-800">
                    {t('landing.metric.verification', '100% On-Site')}
                  </p>
                  <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    {t('landing.metric.verificationLabel', 'Field Inspection')}
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-3xl font-extrabold text-slate-900">
                    {t('landing.metric.paperless', 'Digital')}
                  </p>
                  <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    {t('landing.metric.paperlessLabel', 'Draft e-Panchanama')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Live Sample Card Preview */}
            <div className="lg:col-span-5 relative w-full">
              <div className="mx-auto max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 animate-pulse" />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
                      Sample Verified Record
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                    CN-2026-MH-1042
                  </span>
                </div>

                <div className="space-y-2 text-xs divide-y divide-slate-100">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-500 font-medium">Crop Cultivated:</span>
                    <span className="font-bold text-slate-900">Sugarcane (Co-86032)</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-500 font-medium">Survey & Village:</span>
                    <span className="font-bold text-slate-900">Gut 142/3-B, Shirol</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-500 font-medium">Calamity Type:</span>
                    <span className="font-bold text-red-700">Excessive Rainfall (अतिवृष्टी)</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-500 font-medium">Assessed Loss:</span>
                    <span className="font-bold text-emerald-800">1.50 Acres (65%)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <Link to="/officer/panchanama" className="block">
                    <Button variant="outline" size="sm" className="w-full text-xs min-h-[40px]">
                      View Draft e-Panchanama Preview
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-900 text-white py-14 sm:py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t('landing.workflow.title', 'How the Compensation Workflow Works')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 text-pretty">
              {t(
                'landing.workflow.subtitle',
                'Clear, transparent process from calamity occurrence to government verification'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                1
              </div>
              <h3 className="text-base font-bold text-white">
                {t('landing.step1.title', '1. Report Damage')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed text-pretty">
                {t(
                  'landing.step1.desc',
                  'The farmer intimates disaster damage within 72 hours with plot details, crop variety, and field photos.'
                )}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                2
              </div>
              <h3 className="text-base font-bold text-white">
                {t('landing.step2.title', '2. Spot Field Inspection')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed text-pretty">
                {t(
                  'landing.step2.desc',
                  'Authorized agriculture officers visit the farm, capture GPS coordinates, and evaluate crop damage extent.'
                )}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                3
              </div>
              <h3 className="text-base font-bold text-white">
                {t('landing.step3.title', '3. Compile e-Panchanama')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed text-pretty">
                {t(
                  'landing.step3.desc',
                  'A standardized digital draft panchanama is compiled with local panchas witnesses and officer observations.'
                )}
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                4
              </div>
              <h3 className="text-base font-bold text-white">
                {t('landing.step4.title', '4. Track Compensation Status')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed text-pretty">
                {t(
                  'landing.step4.desc',
                  'Farmers track report verification, inspection findings, and official compensation sanction in real time.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Key Application Modules
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 text-pretty">
            Designed to support Maharashtra cultivators and revenue officers through each stage of disaster relief.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Damage Reporting */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-emerald-600 transition-colors space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <FilePlus2 className="w-5 h-5 text-emerald-800 shrink-0" />
                <h3 className="font-bold text-base text-slate-900">
                  {t('nav.reportDamage', 'Crop Damage Intimation')}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed text-pretty">
                Mobile-first reporting with geotagged photo capture, 7/12 survey numbers, calamity cause, and estimated acreage.
              </p>
            </div>
            <Link
              to="/report-damage"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 pt-2 min-h-[44px]"
            >
              Report Loss <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Digital e-Panchanama */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-indigo-600 transition-colors space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-indigo-800 shrink-0" />
                <h3 className="font-bold text-base text-slate-900">
                  {t('nav.panchanama', 'Draft e-Panchanama')}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed text-pretty">
                Standardized draft report compiled from spot survey observations, witness statements, and GPS bounds.
              </p>
            </div>
            <Link
              to="/officer/panchanama"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-800 hover:text-indigo-950 pt-2 min-h-[44px]"
            >
              Inspect Drafts <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Crop Recovery Guidance */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-amber-600 transition-colors space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <Activity className="w-5 h-5 text-amber-800 shrink-0" />
                <h3 className="font-bold text-base text-slate-900">
                  {t('nav.recovery', 'Recovery Guidance')}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed text-pretty">
                General agronomic advisories for draining waterlogged fields, nutrient spray replenishment, and disease mitigation.
              </p>
            </div>
            <Link
              to="/recovery"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 pt-2 min-h-[44px]"
            >
              View Guidance <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Weather Alerts */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-blue-600 transition-colors space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <CloudSun className="w-5 h-5 text-blue-800 shrink-0" />
                <h3 className="font-bold text-base text-slate-900">
                  {t('nav.weather', 'Agromet Weather Alerts')}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed text-pretty">
                Meteorological alerts for squalls, heavy rainfall, and hailstorms with preventive farming tips.
              </p>
            </div>
            <Link
              to="/weather"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-950 pt-2 min-h-[44px]"
            >
              Check Weather <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Farmer & Officer Fast Access Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {t('landing.benefits.title', 'Built for Maharashtra Cultivators')}
              </h2>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('landing.benefits.point1', 'Timely submission before statutory relief deadlines')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('landing.benefits.point2', 'Verifiable geotagged photos and 7/12 land record integration')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('landing.benefits.point3', 'Direct SMS and digital updates for every status milestone')}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
              <Link to="/farmer" className="w-full sm:w-auto">
                <Button size="md" className="w-full sm:w-auto min-h-[44px] bg-emerald-800 hover:bg-emerald-900 text-white">
                  {t('landing.cta.farmerBtn', 'Enter Farmer Portal')}
                </Button>
              </Link>
              <Link to="/officer" className="w-full sm:w-auto">
                <Button size="md" variant="outline" className="w-full sm:w-auto min-h-[44px] bg-white text-slate-900 hover:bg-slate-100 border-slate-300">
                  {t('landing.cta.officerBtn', 'Officer Inspection Desk')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
