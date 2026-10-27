import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, ArrowRight, UserCircle2, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, role } = useAuth();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Farmer Portal', href: '/farmer' },
    { label: 'Claim Tracking', href: '/claims' },
    { label: 'Recovery Advisor', href: '/recovery' },
    { label: 'Weather Alerts', href: '/weather' },
    { label: 'Officer Desk', href: '/officer' },
  ];

  const getDashboardLink = () => {
    if (role === 'admin') return '/admin';
    if (role === 'officer') return '/officer';
    return '/farmer';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 no-print transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to={getDashboardLink()}>
                  <Button
                    size="sm"
                    variant="primary"
                    leftIcon={<LayoutDashboard className="w-4 h-4" />}
                  >
                    Open Dashboard
                  </Button>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <UserCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{user?.name.split(' ')[0]}</span>
                </Link>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="primary"
                    size="sm"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${
                  location.pathname === link.href
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <Link to={getDashboardLink()} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full" size="md" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full" size="md">
                    Log In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full" size="md">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
