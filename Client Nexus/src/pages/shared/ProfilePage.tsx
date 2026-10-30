import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { authApi } from '@/api/authApi';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { User, ShieldCheck } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

export const ProfilePage: React.FC = () => {
  const { user, role } = useAuth();
  const { success, error } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [district, setDistrict] = useState(user?.district || 'Kolhapur');
  const [village, setVillage] = useState(user?.village || 'Shirol');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await authApi.updateProfile({
        name: name.trim(),
        phone: phone.trim(),
        district,
        village: village.trim()
      });
      if (updated) {
        localStorage.setItem('crop_nexus_active_user', JSON.stringify({ ...user, ...updated }));
      }
      success('Profile Updated', 'Your profile details have been saved.');
    } catch {
      error('Update Failed', 'Failed to save profile changes.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 font-extrabold text-2xl flex items-center justify-center uppercase">
            {name ? name.slice(0, 2) : 'CN'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{name}</h1>
              <Badge role={role} size="sm" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Member since {formatDate(user?.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <h2 className="font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600" /> Account & Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                required
                disabled
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Revenue District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Village / Jurisdiction</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Aadhaar Verification</label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>****-****-{user?.aadhaarLast4 || '8821'} (Linked)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" size="md" isLoading={isSaving}>
              Save Profile Updates
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
