import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import {
  FilePlus2,
  FileSpreadsheet,
  Activity,
  CloudSun,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-slate-100/70 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Digital Transparency in{' '}
                <span className="text-emerald-800 font-black">Crop Damage</span>{' '}
                & Relief Assistance
              </h1>

              <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed text-pretty">
                Empowering farmers to report weather calamities within statutory deadlines, enabling field officers to record GPS spot inspections, compile draft e-Panchanamas, and deliver timely recovery advisories.
              </p>

              {/* Primary Call to Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link to="/report-damage">
                  <Button
                    size="lg"
                    variant="primary"
                    leftIcon={<FilePlus2 className="w-5 h-5" />}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Report Crop Damage
                  </Button>
                </Link>
                <Link to="/claims">
                  <Button size="lg" variant="outline" leftIcon={<Clock className="w-5 h-5 text-slate-600" />}>
                    Track Claim Status
                  </Button>
                </Link>
              </div>

              {/* Verified Metrics */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-6 text-center lg:text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">72 Hrs</p>
                  <p className="text-xs text-slate-600 font-medium">Spot Intimation Window</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-800">100%</p>
                  <p className="text-xs text-slate-600 font-medium">Digital Verification</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">0 Pager</p>
                  <p className="text-xs text-slate-600 font-medium">Draft e-Panchanama</p>
                </div>
              </div>
            </div>

            {/* Right Live Card Preview (Flat, un-nested layout) */}
            <div className="lg:col-span-5 relative">
              <div className="mx-auto max-w-md bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
                      Sample Verified Record
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
                    CN-2026-MH-1042
                  </span>
                </div>

                {/* Plot & Crop preview rows without nested card boxes */}
                <div className="space-y-2 text-xs divide-y divide-slate-100">
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-600 font-medium">Crop Cultivated:</span>
                    <span className="font-bold text-slate-900">Sugarcane (Co-86032)</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-600 font-medium">Survey & Village:</span>
                    <span className="font-bold text-slate-900">Gut 142/3-B, Shirol</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-600 font-medium">Calamity Type:</span>
                    <span className="font-bold text-red-800">River Backwater Inundation</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-600 font-medium">Field Verification:</span>
                    <span className="font-bold text-emerald-800">Assessed: 3.10 Acres</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <Link to="/officer/panchanama" className="block">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Inspect Draft Report Format
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Digital Agricultural Governance
          </h2>
          <p className="text-sm sm:text-base text-slate-600 text-pretty">
            Designed to bridge the gap between affected cultivators, inspecting agriculture officers, and administrative authorities with verifiable records.
          </p>
        </div>

        {/* Feature Cards with inline icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Damage Reporting */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-700 transition-colors space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <FilePlus2 className="w-5 h-5 text-emerald-800 shrink-0" />
                <h3 className="font-bold text-base text-slate-900">Crop Damage Intimation</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed text-pretty">
                Mobile-first reporting for farmers with geotagged photo uploads, 7/12 survey plot numbers, damage cause, and loss estimations.
              </p>
            </div>
            <Link
              to="/report-damage"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 pt-2"
            >
              Submit Intimation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Digital e-Panchanama */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-indigo-700 transition-colors space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-indigo-800 shrink-0" />
                <h3 className="font-bold text-base text-slate-900">Draft e-Panchanama</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed text-pretty">
                Automated compilation of spot inspection observations, panchas witness details, and printable draft records for official verification.
              </p>
            </div>
            <Link
              to="/officer/panchanama"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-800 hover:text-indigo-950 pt-2"
            >
              Explore Drafts <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Crop Recovery Advisor */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-amber-700 transition-colors space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Activity className="w-5 h-5 text-amber-800 shrink-0" />
                <h3 className="font-bold text-base text-slate-900">Crop Recovery Advisor</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed text-pretty">
                Actionable agronomic guidance for surviving crops, fertilizer replenishment, water drainage, and pest mitigation.
              </p>
            </div>
            <Link
              to="/recovery"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 pt-2"
            >
              Get Guidance <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Weather Alerts */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-blue-700 transition-colors space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <CloudSun className="w-5 h-5 text-blue-800 shrink-0" />
                <h3 className="font-bold text-base text-slate-900">Agromet Weather Alerts</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed text-pretty">
                Timely meteorological alerts for torrential rainfall, squalls, and hailstorms with practical preventive farming tips.
              </p>
            </div>
            <Link
              to="/weather"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-950 pt-2"
            >
              Check Weather <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section (Strict Heading Hierarchy h2 -> h3) */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">How Crop Nexus Works</h2>
            <p className="text-sm text-slate-300 text-pretty">
              A structured lifecycle from the moment a natural calamity strikes to digital compensation assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h3 className="text-base font-bold text-white">Intimate Calamity</h3>
              <p className="text-xs text-slate-300 leading-relaxed text-pretty">
                Farmer submits plot details, crop variety, damage photographs, and approximate acreage affected within 72 hours.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="text-base font-bold text-white">Spot Field Survey</h3>
              <p className="text-xs text-slate-300 leading-relaxed text-pretty">
                Agriculture officer visits the plot, records GPS coordinates, interviews local panchas, and verifies crop loss.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="text-base font-bold text-white">Draft e-Panchanama</h3>
              <p className="text-xs text-slate-300 leading-relaxed text-pretty">
                A standardized digital draft report is compiled with plot boundaries, witness signatures, and loss percentages.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center">
                4
              </div>
              <h3 className="text-base font-bold text-white">Transparent Tracking</h3>
              <p className="text-xs text-slate-300 leading-relaxed text-pretty">
                Both farmer and administrators monitor stage progression from review to relief recommendation in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Farmer Benefits Section (Accessible Contrast) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white">
                Designed for Reliability in the Field
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed text-pretty">
                Crop Nexus provides clear status accountability so cultivators know exactly when inspections are scheduled, who is visiting their land, and what recovery actions to take to save their harvest.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Permanent audit trail for every submitted intimation</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Downloadable e-Panchanama drafts for documentation</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Agronomic guidelines tailored to crop damage stage</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <Link to="/farmer">
                <Button size="lg" className="w-full sm:w-auto bg-emerald-800 text-white hover:bg-emerald-900">
                  Open Farmer Workspace
                </Button>
              </Link>
              <Link to="/officer">
                <Button size="lg" variant="dark-outline" className="w-full sm:w-auto">
                  Officer Inspection Desk
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
