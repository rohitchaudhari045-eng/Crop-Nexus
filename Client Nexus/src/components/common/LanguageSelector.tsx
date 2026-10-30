import React from 'react';
import { useTranslation } from '@/i18n/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'pill' | 'select' | 'buttons';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  variant = 'pill'
}) => {
  const { language, setLanguage } = useTranslation();

  if (variant === 'buttons') {
    return (
      <div className={`inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 ${className}`}>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
          aria-label="Switch to English"
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLanguage('mr')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            language === 'mr'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
          aria-label="Switch to Marathi"
        >
          मराठी
        </button>
      </div>
    );
  }

  if (variant === 'select') {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <Globe className="w-4 h-4 text-slate-500 absolute left-2.5 pointer-events-none" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'mr')}
          className="pl-8 pr-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          aria-label="Select Interface Language"
        >
          <option value="en">English (EN)</option>
          <option value="mr">मराठी (MR)</option>
        </select>
      </div>
    );
  }

  // Default pill toggle - super mobile friendly
  return (
    <div
      className={`inline-flex items-center gap-1 bg-slate-100/90 hover:bg-slate-200/70 p-1 rounded-xl border border-slate-200/80 transition-colors ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <Globe className="w-3.5 h-3.5 text-emerald-800 ml-1 mr-0.5 shrink-0" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center ${
          language === 'en'
            ? 'bg-emerald-800 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <span className="text-slate-300 text-xs select-none">|</span>
      <button
        type="button"
        onClick={() => setLanguage('mr')}
        className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center ${
          language === 'mr'
            ? 'bg-emerald-800 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-pressed={language === 'mr'}
      >
        मराठी
      </button>
    </div>
  );
};

export default LanguageSelector;
