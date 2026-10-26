import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { Shield, Phone, Mail, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 pt-16 pb-12 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" className="text-white" />
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed text-pretty">
              Crop Nexus is an agricultural technology platform designed to streamline crop damage reporting, empower officers with digital inspection records, draft e-Panchanamas, track relief claims, and deliver timely recovery advisories.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-300 font-medium">
              <Shield className="w-4 h-4 text-emerald-300" />
              <span>Independent Agritech Frontend Architecture</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/farmer" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  Farmer Portal
                </Link>
              </li>
              <li>
                <Link to="/report-damage" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  Report Damage
                </Link>
              </li>
              <li>
                <Link to="/claims" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  Track Claims
                </Link>
              </li>
              <li>
                <Link to="/weather" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  Weather Alerts
                </Link>
              </li>
              <li>
                <Link to="/recovery" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  Crop Recovery Advisor
                </Link>
              </li>
            </ul>
          </div>

          {/* Officer & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Administration</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/officer" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  Officer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/officer/inspection" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  Field Inspections
                </Link>
              </li>
              <li>
                <Link to="/officer/panchanama" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  Draft e-Panchanama
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  Analytics & Governance
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-slate-300 hover:text-emerald-300 transition-colors">
                  Help & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Kisan Support</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Kisan Call Centre: 1800-180-1551</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>support@cropnexus.agri</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>Agriculture Extension Desk, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p>© {new Date().getFullYear()} Crop Nexus. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-300">
            Built for resilient agriculture with <Heart className="w-3.5 h-3.5 text-red-400 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
