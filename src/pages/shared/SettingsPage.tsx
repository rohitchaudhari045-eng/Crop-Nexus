import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/common/Button';
import { Settings, Bell, Globe, Database, Shield, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { isDemoMode, toggleDemoMode } = useAuth();
  const { success } = useToast();

  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weatherNotifs, setWeatherNotifs] = useState(true);
  const [language, setLanguage] = useState('English');
  const [apiBaseUrl, setApiBaseUrl] = useState(
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Settings Saved', 'Your system preferences have been saved locally.');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-700" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Platform Configuration
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          System Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Customize notifications, alert channels, language, and backend API integration endpoints.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Notification Preferences */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Bell className="w-4 h-4 text-emerald-600" /> Notification Channels
          </h2>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
              <div>
                <p className="font-bold text-slate-900">SMS & WhatsApp Intimations</p>
                <p className="text-xs text-slate-600">Receive inspection date alerts directly on mobile</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
              <div>
                <p className="font-bold text-slate-900">Email Status Summaries</p>
                <p className="text-xs text-slate-600">Weekly digest of claim updates and e-Panchanama drafts</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
              <div>
                <p className="font-bold text-slate-900">Severe Weather Advisories</p>
                <p className="text-xs text-slate-600">Priority Agromet alert popups when heavy rainfall is forecasted</p>
              </div>
              <input
                type="checkbox"
                checked={weatherNotifs}
                onChange={(e) => setWeatherNotifs(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Language Preference */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Globe className="w-4 h-4 text-emerald-600" /> Language & Regionalization
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {['English', 'मराठी (Marathi)', 'हिन्दी (Hindi)'].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`py-3 px-3 rounded-xl font-bold border text-center transition-all cursor-pointer ${
                  language === lang
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Backend API Integration Configuration */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <Database className="w-4 h-4 text-emerald-600" /> Flask Backend API Integration
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Backend API Base URL (Read from VITE_API_BASE_URL)
              </label>
              <input
                type="text"
                value={apiBaseUrl}
                onChange={(e) => setApiBaseUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-slate-900"
              />
              <span className="text-xs text-slate-500 mt-1 block">
                Default: http://localhost:5000/api. Configured in .env file.
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-900">Standalone Demo Mode Simulation</p>
                <p className="text-xs text-slate-600">
                  Operates using realistic local mock state when the Flask backend is not yet started.
                </p>
              </div>
              <Button
                type="button"
                variant={isDemoMode ? 'primary' : 'outline'}
                size="sm"
                onClick={toggleDemoMode}
              >
                {isDemoMode ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
