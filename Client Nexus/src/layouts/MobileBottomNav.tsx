import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/i18n/LanguageContext';
import {
  LayoutDashboard,
  FilePlus2,
  FileText,
  ShieldCheck,
  FileSpreadsheet,
  Settings
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { role } = useAuth();
  const { t } = useTranslation();

  if (role === 'officer') {
    return (
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-2 py-1 shadow-lg no-print"
        aria-label="Officer mobile navigation"
      >
        <div className="grid grid-cols-4 items-center">
          <NavLink
            to="/officer"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-bold transition-colors min-h-[48px] ${
                isActive ? 'text-indigo-800' : 'text-slate-500 hover:text-slate-900'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5 mb-0.5" />
            <span className="truncate max-w-[70px]">{t('nav.dashboard', 'Queue')}</span>
          </NavLink>

          <NavLink
            to="/officer/inspection"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-bold transition-colors min-h-[48px] ${
                isActive ? 'text-indigo-800' : 'text-slate-500 hover:text-slate-900'
              }`
            }
          >
            <ShieldCheck className="w-5 h-5 mb-0.5" />
            <span className="truncate max-w-[70px]">{t('nav.officerInspection', 'Inspect')}</span>
          </NavLink>

          <NavLink
            to="/officer/panchanama"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-bold transition-colors min-h-[48px] ${
                isActive ? 'text-indigo-800' : 'text-slate-500 hover:text-slate-900'
              }`
            }
          >
            <FileSpreadsheet className="w-5 h-5 mb-0.5" />
            <span className="truncate max-w-[70px]">{t('nav.panchanama', 'Panchanama')}</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-bold transition-colors min-h-[48px] ${
                isActive ? 'text-indigo-800' : 'text-slate-500 hover:text-slate-900'
              }`
            }
          >
            <Settings className="w-5 h-5 mb-0.5" />
            <span className="truncate max-w-[70px]">{t('nav.settings', 'Settings')}</span>
          </NavLink>
        </div>
      </nav>
    );
  }

  // Farmer Mobile Navigation
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-2 py-1 shadow-lg no-print"
      aria-label="Farmer mobile navigation"
    >
      <div className="grid grid-cols-4 items-center">
        <NavLink
          to="/farmer"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-bold transition-colors min-h-[48px] ${
              isActive ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-900'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span className="truncate max-w-[70px]">{t('nav.home', 'Home')}</span>
        </NavLink>

        <NavLink
          to="/report-damage"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-1 rounded-xl text-xs font-bold transition-all min-h-[48px] ${
              isActive
                ? 'text-emerald-900 font-extrabold'
                : 'text-emerald-800 hover:text-emerald-900'
            }`
          }
        >
          <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-md mb-0.5 -mt-3 ring-4 ring-white">
            <FilePlus2 className="w-4 h-4" />
          </div>
          <span className="truncate max-w-[75px]">{t('nav.reportDamage', 'Report')}</span>
        </NavLink>

        <NavLink
          to="/claims"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-bold transition-colors min-h-[48px] ${
              isActive ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-900'
            }`
          }
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span className="truncate max-w-[70px]">{t('nav.claims', 'Claims')}</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-xs font-bold transition-colors min-h-[48px] ${
              isActive ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-900'
            }`
          }
        >
          <Settings className="w-5 h-5 mb-0.5" />
          <span className="truncate max-w-[70px]">{t('nav.settings', 'Settings')}</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
