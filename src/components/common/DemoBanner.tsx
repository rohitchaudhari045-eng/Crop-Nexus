import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, ArrowRightLeft, Database } from 'lucide-react';
import { UserRole } from '@/types';

export const DemoBanner: React.FC = () => {
  const { role, switchRole, isDemoMode } = useAuth();

  if (!isDemoMode) return null;

  const roles: { id: UserRole; label: string }[] = [
    { id: 'farmer', label: 'Farmer View' },
    { id: 'officer', label: 'Officer View' },
    { id: 'admin', label: 'Admin View' },
  ];

  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800 no-print">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-900/80 text-emerald-200 font-bold border border-emerald-700">
            <Sparkles className="w-3.5 h-3.5" /> Demo Mode Active
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Frontend standalone ready. Switch perspective to inspect role workflows:
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <span className="text-xs text-slate-300 px-2 flex items-center gap-1 font-medium">
              <ArrowRightLeft className="w-3.5 h-3.5" /> Switch:
            </span>
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => switchRole(r.id)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  role === r.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-200 hover:text-white hover:bg-slate-700'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-300 pl-2 border-l border-slate-800">
            <Database className="w-3.5 h-3.5 text-slate-400" />
            <span>Flask API:</span>
            <code className="text-emerald-300 bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">
              {import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoBanner;
