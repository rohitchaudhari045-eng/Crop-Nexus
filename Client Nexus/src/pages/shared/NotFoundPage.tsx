import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/common/Button';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-center bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl space-y-6">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>

        <div className="space-y-2">
          <span className="text-6xl font-black text-emerald-700 tracking-tight block">404</span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            The agricultural record or page you requested could not be located on Crop Nexus. It may have been moved or the URL might be mistyped.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full" leftIcon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
          <Link to="/claims" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full" leftIcon={<Search className="w-4 h-4 text-slate-500" />}>
              Search Claims
            </Button>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          Need help? Visit our{' '}
          <Link to="/help" className="text-emerald-800 font-bold hover:underline">
            Help & Support Desk
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
