import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { useTranslation } from '@/i18n/LanguageContext';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-200 pt-12 pb-12 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand info */}
          <div className="space-y-3">
            <Logo size="md" className="text-white" />
            <p className="text-xs text-slate-300 leading-relaxed text-pretty">
              {t(
                'landing.hero.subtitle',
                'A mobile-first portal enabling Maharashtra farmers to report disaster crop losses within statutory windows, and assisting agriculture officers in conducting verifiable on-site spot inspections.'
              )}
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400 font-medium">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('app.state', 'Government of Maharashtra Workflow')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('role.farmer', 'Farmer Portal')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/farmer" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  {t('nav.farmerPortal', 'Farmer Dashboard')}
                </Link>
              </li>
              <li>
                <Link to="/report-damage" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  {t('nav.reportDamage', 'Report Crop Damage')}
                </Link>
              </li>
              <li>
                <Link to="/claims" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  {t('nav.claims', 'My Damage Reports')}
                </Link>
              </li>
              <li>
                <Link to="/recovery" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  {t('nav.recovery', 'Recovery Guidance')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Officer Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('role.officer', 'Officer Desk')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/officer" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  {t('nav.officerDesk', 'Officer Dashboard')}
                </Link>
              </li>
              <li>
                <Link to="/officer/inspection" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  {t('nav.officerInspection', 'Field Inspections')}
                </Link>
              </li>
              <li>
                <Link to="/officer/panchanama" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  {t('nav.panchanama', 'Draft e-Panchanama')}
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  {t('nav.help', 'Help & FAQs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('help.title', 'Kisan Support')}
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1800-180-1551 (Kisan Call Centre)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@cropnexus.agri</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Agriculture Extension Wing, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Crop Nexus. All rights reserved.</p>
          <p className="text-xs text-slate-400">
            Intended for Maharashtra Disaster Crop Relief Intimation & Verification Workflow
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
