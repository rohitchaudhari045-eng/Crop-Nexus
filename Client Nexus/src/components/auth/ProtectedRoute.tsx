import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/i18n/LanguageContext';
import { UserRole } from '@/types';
import { ShieldAlert, ArrowLeft, Loader2 } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/common/Button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles
}) => {
  const { isAuthenticated, role, isLoading } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="flex flex-col items-center space-y-4">
          <Logo size="lg" />
          <div className="flex items-center gap-2 text-emerald-800 text-sm font-semibold">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{t('common.loading', 'Loading verification workspace...')}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login preserving destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role authorization
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    const authorizedHome = role === 'officer' ? '/officer' : '/farmer';

    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Role Authorization Notice
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Your authenticated profile is registered as <strong className="text-slate-900 capitalize">{role}</strong>. You do not have permissions to access the requested workflow.
          </p>
          <div className="pt-2">
            <Link to={authorizedHome}>
              <Button variant="primary" size="md" className="w-full" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Return to My {role === 'officer' ? 'Officer Desk' : 'Farmer Portal'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
