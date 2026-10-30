import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useTranslation } from '@/i18n/LanguageContext';
import { Button } from '@/components/common/Button';
import { Logo } from '@/components/common/Logo';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { Eye, EyeOff, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { success, error } = useToast();
  const { t } = useTranslation();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if redirected from a protected route
  const fromLocation = (location.state as any)?.from?.pathname;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = identifier.trim();
    const cleanPw = password.trim();

    if (!cleanId || !cleanPw) {
      error('Validation Error', 'Please enter your registered mobile number or email and password.');
      return;
    }

    try {
      setLoading(true);
      // Backend authenticates credentials and determines the authorized role
      const result = await login({ emailOrPhone: cleanId, password: cleanPw });

      if (result.success && result.role) {
        success('Welcome to Crop Nexus', `Signed in successfully.`);
        // Open the appropriate role dashboard or redirected destination
        if (fromLocation) {
          navigate(fromLocation, { replace: true });
        } else if (result.role === 'officer') {
          navigate('/officer', { replace: true });
        } else {
          navigate('/farmer', { replace: true });
        }
      } else {
        error('Sign In Failed', result.error || 'Invalid credentials. Please verify your mobile number/email.');
      }
    } catch {
      error('Sign In Error', 'An unexpected error occurred while resolving authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
        {/* Top Header with Language Selector */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <Logo size="md" />
          <LanguageSelector variant="pill" />
        </div>

        {/* Brand Heading */}
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            {t('auth.login.title', 'Sign In to Crop Nexus')}
          </h1>
          <p className="text-xs text-slate-500 text-pretty">
            {t('auth.login.subtitle', 'Enter your registered credentials to access your portal')}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1" htmlFor="login-identifier">
              {t('auth.login.identifier', 'Mobile Number or Registered Email')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="login-identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-900 min-h-[44px]"
                placeholder={t('auth.login.identifierPlaceholder', 'e.g. 9823411223 or name@example.com')}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700" htmlFor="login-password">
                {t('auth.login.password', 'Password')}
              </label>
              <span className="text-xs text-emerald-800 font-semibold hover:underline cursor-pointer">
                {t('auth.login.forgotPassword', 'Forgot password?')}
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-900 min-h-[44px]"
                placeholder={t('auth.login.passwordPlaceholder', 'Enter password')}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer min-h-[44px] min-w-[44px] justify-center"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-2 min-h-[44px]"
            size="md"
            isLoading={loading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {t('auth.login.submit', 'Sign In')}
          </Button>
        </form>

        {/* Footer links */}
        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100 space-y-2">
          <p>
            {t('auth.login.noAccount', "Don't have an account?")}{' '}
            <Link to="/register" className="font-bold text-emerald-800 hover:underline">
              {t('auth.login.registerNow', 'Register as a Farmer')}
            </Link>
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t('app.state', 'Maharashtra Agricultural Calamity Relief Portal')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
