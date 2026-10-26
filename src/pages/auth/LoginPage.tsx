import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/common/Button';
import { Logo } from '@/components/common/Logo';
import { UserRole } from '@/types';
import { Eye, EyeOff, Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { success, error } = useToast();

  const [role, setRole] = useState<UserRole>('farmer');
  const [identifier, setIdentifier] = useState('9823411223');
  const [password, setPassword] = useState('DemoPassword123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'farmer') {
      setIdentifier('9823411223');
    } else if (newRole === 'officer') {
      setIdentifier('suresh.deshmukh@agri.gov.demo');
    } else {
      setIdentifier('admin.anjali@cropnexus.demo');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      error('Validation Error', 'Please enter your registered mobile number or email.');
      return;
    }

    try {
      setLoading(true);
      const ok = await login(identifier, password, role);
      if (ok) {
        success('Welcome to Crop Nexus', `Signed in successfully as ${role}.`);
        if (role === 'admin') navigate('/admin');
        else if (role === 'officer') navigate('/officer');
        else navigate('/farmer');
      } else {
        error('Sign In Failed', 'Invalid credentials or connection issue.');
      }
    } catch {
      error('Sign In Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 pt-2">
            Sign In to Crop Nexus
          </h2>
          <p className="text-xs text-slate-500">
            Select your role to access your agricultural workspace
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          {(['farmer', 'officer', 'admin'] as UserRole[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRoleSelect(r)}
              className={`py-2 rounded-lg capitalize transition-all cursor-pointer ${
                role === r
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Fast Fill Demo Note */}
        <div className="text-xs text-slate-600 flex items-center justify-center gap-1.5 py-1 text-center">
          <Sparkles className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
          <span>Interactive mode pre-filled with demo <strong className="text-slate-900 capitalize">{role}</strong> credentials</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {role === 'farmer' ? 'Mobile Number or Aadhaar Linked Phone' : 'Official Email Address'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-900"
                placeholder={role === 'farmer' ? '98234XXXXX' : 'name@agri.gov'}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700">Password</label>
              <span className="text-xs text-emerald-800 font-semibold hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-900"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-2"
            size="md"
            isLoading={loading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In as {role.toUpperCase()}
          </Button>
        </form>

        {/* Footer links */}
        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100 space-y-2">
          <p>
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-emerald-800 hover:underline">
              Create an account
            </Link>
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Dedicated Agritech Security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
