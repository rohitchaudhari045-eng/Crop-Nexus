import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/common/Button';
import { Logo } from '@/components/common/Logo';
import { DISTRICTS_LIST } from '@/utils/constants';
import { Eye, EyeOff, User, Phone, Mail, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { success, error } = useToast();

  const [role, setRole] = useState<'farmer' | 'officer'>('farmer');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState(DISTRICTS_LIST[0]);
  const [village, setVillage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      error('Missing Information', 'Please complete all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      error('Password Mismatch', 'The passwords entered do not match.');
      return;
    }
    if (password.length < 6) {
      error('Password Too Short', 'Password should be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      const ok = await register({
        name,
        email,
        phone,
        role,
        district,
        village: role === 'farmer' ? village : 'Headquarters Zone'
      });
      if (ok) {
        success('Registration Successful', `Welcome to Crop Nexus, ${name}!`);
        if (role === 'officer') navigate('/officer');
        else navigate('/farmer');
      } else {
        error('Registration Failed', 'Could not create account at this time.');
      }
    } catch {
      error('Registration Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 pt-2">
            Create a Crop Nexus Account
          </h2>
          <p className="text-xs text-slate-500">
            Join the digital agricultural network to intimate damage or conduct inspections
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('farmer')}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              role === 'farmer' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Farmer / Cultivator
          </button>
          <button
            type="button"
            onClick={() => setRole('officer')}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              role === 'officer' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Agriculture Field Officer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  placeholder="e.g. Dnyaneshwar Shinde"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile Contact</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  placeholder="+91 98XXX XXXXX"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">District</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium bg-white"
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
              <label className="block font-bold text-slate-700 mb-1">
                {role === 'farmer' ? 'Village / Gram' : 'Designated Office / Block'}
              </label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                placeholder={role === 'farmer' ? 'e.g. Shirol' : 'Taluka Krishi Adhikari Office'}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Create Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  placeholder="Min 6 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                placeholder="Repeat password"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-2"
            size="md"
            isLoading={loading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Register as {role.toUpperCase()}
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-emerald-700 hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
