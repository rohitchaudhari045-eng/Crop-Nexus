import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  FilePlus2,
  FileText,
  Activity,
  CloudSun,
  ShieldCheck,
  FileSpreadsheet,
  Users,
  Settings,
  HelpCircle,
  TrendingUp,
  X
} from 'lucide-react';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { role } = useAuth();

  const farmerNav = [
    { label: 'Farmer Dashboard', to: '/farmer', icon: LayoutDashboard },
    { label: 'Report Crop Damage', to: '/report-damage', icon: FilePlus2 },
    { label: 'Track Claims', to: '/claims', icon: FileText },
    { label: 'Recovery Advisor', to: '/recovery', icon: Activity },
    { label: 'Recovery Progress', to: '/recovery/progress', icon: TrendingUp },
    { label: 'Weather Alerts', to: '/weather', icon: CloudSun },
  ];

  const officerNav = [
    { label: 'Officer Dashboard', to: '/officer', icon: LayoutDashboard },
    { label: 'Field Inspections', to: '/officer/inspection', icon: ShieldCheck },
    { label: 'Draft e-Panchanama', to: '/officer/panchanama', icon: FileSpreadsheet },
    { label: 'All Damage Claims', to: '/claims', icon: FileText },
    { label: 'Weather Alerts', to: '/weather', icon: CloudSun },
  ];

  const adminNav = [
    { label: 'Analytics Dashboard', to: '/admin', icon: LayoutDashboard },
    { label: 'User Management', to: '/admin/users', icon: Users },
    { label: 'Claims Registry', to: '/claims', icon: FileText },
    { label: 'Officer Records', to: '/officer', icon: ShieldCheck },
    { label: 'System Settings', to: '/settings', icon: Settings },
  ];

  const navigation = role === 'admin' ? adminNav : role === 'officer' ? officerNav : farmerNav;

  const sharedNav = [
    { label: 'Settings', to: '/settings', icon: Settings },
    { label: 'Help & Support', to: '/help', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="h-16 sm:h-20 flex items-center justify-between px-6 border-b border-slate-800">
        <Logo size="md" className="text-white" to="/" />
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Role Pill Banner */}
      <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Workspace</span>
          <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {role}
          </span>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-300 px-3 pb-2">
          Main Navigation
        </div>
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-950/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <div className="text-xs font-bold uppercase tracking-wider text-slate-300 px-3 pt-6 pb-2">
          Preferences
        </div>
        {sharedNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Footer Info */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/30 text-xs text-slate-300 flex items-center justify-between">
        <div>
          <p className="font-semibold text-slate-200">Crop Nexus v1.0</p>
          <p className="text-xs text-slate-300">Frontend Ready</p>
        </div>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="System Operational" />
      </div>
    </aside>
  );
};

export default Sidebar;
