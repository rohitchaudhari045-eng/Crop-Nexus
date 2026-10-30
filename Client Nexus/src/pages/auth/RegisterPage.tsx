import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useTranslation } from '@/i18n/LanguageContext';
import { Button } from '@/components/common/Button';
import { Logo } from '@/components/common/Logo';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { DISTRICTS_LIST } from '@/utils/constants';
import { Eye, EyeOff, User, Phone, Mail, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { success, error } = useToast();
  const { t, language } = useTranslation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState(DISTRICTS_LIST[0]);
  const [taluka, setTaluka] = useState('Shirol');
  const [village, setVillage] = useState('');
  const [preferredLang, setPreferredLang] = useState<'en' | 'mr'>(language);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Field errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 3) {
      errs.name = 'Please enter your full legal name (minimum 3 characters).';
    }

    // Indian mobile number validation (10 digits, starting with 6, 7, 8, or 9)
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number (e.g. 9823411223).';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!village.trim()) {
      errs.village = 'Please specify your farm village or gram.';
    }

    if (!taluka.trim()) {
      errs.taluka = 'Please specify your taluka.';
    }

    if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters.';
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      error('Validation Error', 'Please correct the highlighted fields before submitting.');
      return;
    }

    try {
      setLoading(true);
      const res = await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        district,
        taluka: taluka.trim(),
        village: village.trim(),
        preferredLanguage: preferredLang,
        password
      });

      if (res.success) {
        success('Farmer Account Created', `Welcome to Crop Nexus, ${name}!`);
        navigate('/farmer');
      } else {
        error('Registration Failed', res.error || 'Could not register account. Please try again.');
      }
    } catch {
      error('Registration Error', 'An unexpected network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
        {/* Header with Language Selector */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <Logo size="md" />
          <LanguageSelector variant="pill" />
        </div>

        <div className="text-center space-y-1.5">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            {t('auth.register.title', 'Farmer Registration')}
          </h1>
          <p className="text-xs text-slate-500 text-pretty">
            {t('auth.register.subtitle', 'Create an account to report crop damage and track relief claims')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Full Name */}
          <div>
            <label className="block font-bold text-slate-700 mb-1" htmlFor="reg-name">
              {t('auth.register.fullName', 'Full Name (as per 7/12 land record)')} *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl border font-medium min-h-[44px] ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500'
                } focus:outline-none focus:ring-2`}
                placeholder={t('auth.register.fullNamePlaceholder', 'e.g. Ramesh Dnyaneshwar Jadhav')}
                required
              />
            </div>
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="reg-phone">
                {t('auth.register.phone', 'Mobile Number (10 digits)')} *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  id="reg-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border font-medium min-h-[44px] ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500'
                  } focus:outline-none focus:ring-2`}
                  placeholder="98XXXXXXXX"
                  maxLength={10}
                  required
                />
              </div>
              {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="reg-email">
                {t('auth.register.email', 'Email Address')} *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border font-medium min-h-[44px] ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500'
                  } focus:outline-none focus:ring-2`}
                  placeholder="name@example.com"
                  required
                />
              </div>
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Farm Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="reg-district">
                {t('auth.register.district', 'District')} *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <select
                  id="reg-district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-white min-h-[44px]"
                >
                  {DISTRICTS_LIST.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="reg-taluka">
                {t('auth.register.taluka', 'Taluka')} *
              </label>
              <input
                id="reg-taluka"
                type="text"
                value={taluka}
                onChange={(e) => {
                  setTaluka(e.target.value);
                  if (errors.taluka) setErrors((prev) => ({ ...prev, taluka: '' }));
                }}
                className={`w-full px-3 py-2.5 rounded-xl border font-medium min-h-[44px] ${
                  errors.taluka ? 'border-red-500' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder={t('auth.register.talukaPlaceholder', 'e.g. Shirol')}
                required
              />
              {errors.taluka && <p className="text-red-600 text-xs mt-1">{errors.taluka}</p>}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="reg-village">
                {t('auth.register.village', 'Village / Gram')} *
              </label>
              <input
                id="reg-village"
                type="text"
                value={village}
                onChange={(e) => {
                  setVillage(e.target.value);
                  if (errors.village) setErrors((prev) => ({ ...prev, village: '' }));
                }}
                className={`w-full px-3 py-2.5 rounded-xl border font-medium min-h-[44px] ${
                  errors.village ? 'border-red-500' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder={t('auth.register.villagePlaceholder', 'e.g. Shirol')}
                required
              />
              {errors.village && <p className="text-red-600 text-xs mt-1">{errors.village}</p>}
            </div>
          </div>

          {/* Preferred Language */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {t('auth.register.preferredLang', 'Preferred Language')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPreferredLang('en')}
                className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer min-h-[40px] ${
                  preferredLang === 'en'
                    ? 'bg-emerald-800 text-white border-emerald-800'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setPreferredLang('mr')}
                className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer min-h-[40px] ${
                  preferredLang === 'mr'
                    ? 'bg-emerald-800 text-white border-emerald-800'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                मराठी (Marathi)
              </button>
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="reg-pw">
                {t('auth.register.password', 'Create Password')} *
              </label>
              <div className="relative">
                <input
                  id="reg-pw"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  className={`w-full pl-3 pr-10 py-2.5 rounded-xl border font-medium min-h-[44px] ${
                    errors.password ? 'border-red-500' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  placeholder="Min 6 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2.5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1" htmlFor="reg-confirm-pw">
                {t('auth.register.confirmPassword', 'Confirm Password')} *
              </label>
              <input
                id="reg-confirm-pw"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                }}
                className={`w-full px-3 py-2.5 rounded-xl border font-medium min-h-[44px] ${
                  errors.confirmPassword ? 'border-red-500' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder="Repeat password"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-2 min-h-[44px]"
            size="md"
            isLoading={loading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {t('auth.register.submit', 'Register Farmer Account')}
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100 flex items-center justify-between">
          <span>
            {t('auth.register.hasAccount', 'Already registered?')}{' '}
            <Link to="/login" className="font-bold text-emerald-800 hover:underline">
              {t('auth.register.signInLink', 'Sign In here')}
            </Link>
          </span>
          <div className="hidden sm:flex items-center gap-1 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Secure Registration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
