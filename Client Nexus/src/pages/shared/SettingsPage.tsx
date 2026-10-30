import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useTranslation } from '@/i18n/LanguageContext';
import { Button } from '@/components/common/Button';
import {
  Settings,
  Globe,
  User,
  Shield,
  LogOut,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, role, logout } = useAuth();
  const { success, error } = useToast();
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();

  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [district, setDistrict] = useState(user?.district || 'Kolhapur');
  const [village, setVillage] = useState(user?.village || 'Shirol');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    success(
      t('settings.save', 'Preferences Saved'),
      'Your profile details and preferred language have been updated.'
    );
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      error('Password Error', 'Please enter your current password.');
      return;
    }
    if (newPassword.length < 6) {
      error('Password Error', 'New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      error('Password Error', 'New password and confirm password do not match.');
      return;
    }

    setIsUpdatingPassword(true);
    // Prepared for future Spring Boot backend PATCH /auth/password
    setTimeout(() => {
      setIsUpdatingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      success('Password Updated', 'Your security password has been updated successfully.');
    }, 600);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-800" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            {t('nav.settings', 'Preferences')}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('settings.title', 'Platform Settings')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t('settings.subtitle', 'Manage your preferred language, profile details, and account preferences.')}
        </p>
      </div>

      {/* 1. Language & Regionalization */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Globe className="w-4 h-4 text-emerald-800" />
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {t('settings.languageTitle', 'Interface Language')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('settings.languageSubtitle', 'Choose between English and Marathi for the entire application interface.')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setLanguage('en');
              success('Language Updated', 'Interface switched to English.');
            }}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer min-h-[48px] ${
              language === 'en'
                ? 'border-emerald-700 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">English</span>
              {language === 'en' && <CheckCircle2 className="w-4 h-4 text-emerald-800" />}
            </div>
            <p className="text-xs text-slate-500 mt-1">Default administrative terminology</p>
          </button>

          <button
            type="button"
            onClick={() => {
              setLanguage('mr');
              success('भाषा बदलली', 'प्रणालीची भाषा मराठी करण्यात आली आहे.');
            }}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer min-h-[48px] ${
              language === 'mr'
                ? 'border-emerald-700 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">मराठी (Marathi)</span>
              {language === 'mr' && <CheckCircle2 className="w-4 h-4 text-emerald-800" />}
            </div>
            <p className="text-xs text-slate-500 mt-1">महाराष्ट्र कृषी व महसूल प्रमाणित परिभाषा</p>
          </button>
        </div>
      </div>

      {/* 2. Basic Profile Information */}
      <form onSubmit={handleProfileSave} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 text-xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <User className="w-4 h-4 text-emerald-800" />
          <h2 className="font-bold uppercase tracking-wider text-slate-900">
            {t('settings.profileTitle', 'Profile Information')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1" htmlFor="set-name">
              {t('settings.name', 'Name')}
            </label>
            <input
              id="set-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1" htmlFor="set-phone">
              {t('settings.phone', 'Phone')}
            </label>
            <input
              id="set-phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1" htmlFor="set-email">
              {t('settings.email', 'Email')}
            </label>
            <input
              id="set-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1" htmlFor="set-dist">
              {t('settings.district', 'District')}
            </label>
            <input
              id="set-dist"
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="md">
            {t('settings.save', 'Save Preferences')}
          </Button>
        </div>
      </form>

      {/* 3. Password Change Section */}
      <form onSubmit={handlePasswordChange} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 text-xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Lock className="w-4 h-4 text-emerald-800" />
          <h2 className="font-bold uppercase tracking-wider text-slate-900">
            Account Security & Password
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1" htmlFor="cur-pw">
              Current Password
            </label>
            <input
              id="cur-pw"
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current password"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1" htmlFor="new-pw">
              New Password
            </label>
            <input
              id="new-pw"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1" htmlFor="conf-pw">
              Confirm New Password
            </label>
            <input
              id="conf-pw"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer min-h-[40px]"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showPassword ? 'Hide Passwords' : 'Show Passwords'}</span>
          </button>

          <Button type="submit" variant="outline" size="sm" isLoading={isUpdatingPassword}>
            Update Password
          </Button>
        </div>
      </form>

      {/* 4. Logout Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Sign Out of Crop Nexus</h3>
          <p className="text-xs text-slate-500">
            End your current active session on this device.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={handleLogout}
          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          leftIcon={<LogOut className="w-4 h-4 text-red-500" />}
        >
          {t('nav.signOut', 'Sign Out')}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
