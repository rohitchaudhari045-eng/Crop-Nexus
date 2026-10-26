import React from 'react';
import { WeatherWidget } from '@/components/weather/WeatherWidget';
import { CloudSun, Info, ShieldCheck, Phone } from 'lucide-react';

export const WeatherAlertsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <CloudSun className="w-5 h-5 text-emerald-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Agromet Advisory Services
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Weather Alerts & Preventive Farming
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
          Real-time meteorological warnings for heavy rainfall, squalls, and hailstorms with practical farm protection measures.
        </p>
      </div>

      {/* Main Weather Widget */}
      <WeatherWidget />

      {/* Preventive Guidelines Reference Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 text-xs">
        <h2 className="font-bold text-base text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-800" /> Agricultural Preparedness Protocols
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
          <div className="space-y-1.5 md:border-r border-slate-100 md:pr-4">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 text-blue-800">
              Torrential Downpour / Flood Risk
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs">
              Open drainage furrows at every 10 rows. Disconnect power to submergible motor starters. Withhold all planned nitrogenous top dressing.
            </p>
          </div>

          <div className="space-y-1.5 md:border-r border-slate-100 md:pr-4">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 text-amber-800">
              High Velocity Storm Winds
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs">
              Erect bamboo or wire propping for banana stools and tall sugarcane. Clear dead tree branches along field border power lines.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 text-red-800">
              Hailstorm Post-Care
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs">
              Foliar spray Carbendazim + Mancozeb within 24-36 hours of physical wounding to prevent systemic bacterial/fungal pathogen infection.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-slate-500 text-xs">
          <span className="flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            Configurable weather integration via <code className="text-emerald-700 font-mono">VITE_WEATHER_API_KEY</code>
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            State Agromet Helpline: 1800-233-4000
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherAlertsPage;
