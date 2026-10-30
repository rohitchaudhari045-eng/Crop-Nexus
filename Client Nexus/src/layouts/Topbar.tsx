import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/i18n/LanguageContext';
import { notificationsApi } from '@/api/recoveryApi';
import { NotificationItem } from '@/types';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import {
  Menu,
  Bell,
  User,
  LogOut,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  Shield
} from 'lucide-react';
import { formatDateTime } from '@/utils/formatters';

interface TopbarProps {
  onOpenMobileSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileSidebar }) => {
  const { user, role, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const fetchNotifs = async () => {
      const data = await notificationsApi.getAll();
      setNotifications(data);
    };
    fetchNotifs();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = async () => {
    await notificationsApi.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 sm:h-20 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 no-print">
      {/* Left mobile menu and breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-emerald-700 transition-colors">
            {t('app.name', 'Crop Nexus')}
          </Link>
          <span>/</span>
          <span className="capitalize text-slate-900 font-bold">
            {role === 'officer' ? t('role.officer', 'Officer Desk') : t('role.farmer', 'Farmer Portal')}
          </span>
        </div>
      </div>

      {/* Right actions: Language Selector, Notifications, Profile Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Selector */}
        <LanguageSelector variant="pill" />

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={t('nav.notifications', 'Notifications')}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute 1 sm:top-1.5 right-1 sm:right-1.5 min-w-[18px] h-[18px] px-1 bg-emerald-800 text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  {t('nav.notifications', 'Notifications')} ({unreadCount})
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs text-emerald-800 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3.5 transition-colors ${n.read ? 'bg-white' : 'bg-emerald-50/40'}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-xs font-bold text-slate-900 leading-snug">{n.title}</h5>
                        <span className="text-xs text-slate-400 shrink-0">
                          {formatDateTime(n.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                      {n.actionUrl && (
                        <Link
                          to={n.actionUrl}
                          onClick={() => setNotifOpen(false)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 mt-1.5 hover:underline"
                        >
                          {t('common.details', 'View Details')} <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
                <Link
                  to="/notifications"
                  onClick={() => setNotifOpen(false)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-900"
                >
                  View All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer min-h-[44px]"
            aria-label="User Account Menu"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs uppercase">
              {user?.name ? user.name.slice(0, 2) : 'CN'}
            </div>
            <div className="hidden sm:block text-left pr-1">
              <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[120px]">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-slate-500 capitalize">
                {role === 'officer' ? t('role.officer', 'Officer') : t('role.farmer', 'Farmer')}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email || user?.phone}</p>
              </div>

              <Link
                to="/profile"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>{t('nav.profile', 'My Profile')}</span>
              </Link>

              <Link
                to="/settings"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <Shield className="w-4 h-4 text-slate-400" />
                <span>{t('nav.settings', 'Settings & Language')}</span>
              </Link>

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>{t('nav.signOut', 'Sign Out')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
