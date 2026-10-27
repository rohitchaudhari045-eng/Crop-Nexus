import React, { useState, useEffect } from 'react';
import { adminApi } from '@/services/apiService';
import { User, UserRole } from '@/types';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { useToast } from '@/context/ToastContext';
import { formatDate } from '@/utils/formatters';
import {
  Users,
  Search,
  Filter,
  Shield,
  UserCheck,
  UserX,
  Edit,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export const UserManagementPage: React.FC = () => {
  const { success } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingRole, setEditingRole] = useState<UserRole>('farmer');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const data = await adminApi.getUsers();
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.includes(q) ||
      (u.district && u.district.toLowerCase().includes(q));
    return matchesRole && matchesSearch;
  });

  const handleOpenEditRole = (u: User) => {
    setSelectedUser(u);
    setEditingRole(u.role);
    setIsRoleModalOpen(true);
  };

  const handleSaveRole = () => {
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...u, role: editingRole } : u))
    );
    success('User Role Updated', `${selectedUser.name}'s role is now ${editingRole}.`);
    setIsRoleModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
              Identity & Access Management
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            User Management & Jurisdiction
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Oversee registered farmers, assign field inspection officer credentials, and manage administrative privileges.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          Total Users: <strong className="text-slate-900">{users.length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, email, district..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {['all', 'farmer', 'officer', 'admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl font-semibold capitalize whitespace-nowrap cursor-pointer transition-colors ${
                roleFilter === r
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-xs border-y border-slate-200">
              <tr>
                <th className="py-3 px-3">Name & Contact</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Location / Jurisdiction</th>
                <th className="py-3 px-3">Onboarded</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" /> {u.phone}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" /> {u.email}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <Badge role={u.role} size="sm" />
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1 text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{u.district || 'Maharashtra'}</span>
                    </div>
                    {u.assignedJurisdiction && (
                      <div className="text-xs text-indigo-700 font-semibold mt-0.5">
                        {u.assignedJurisdiction}
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-3 text-slate-500 font-medium">
                    {formatDate(u.createdAt)}
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenEditRole(u)}
                      className="text-xs py-1 px-2.5"
                      leftIcon={<Edit className="w-3 h-3" />}
                    >
                      Change Role
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Edit Modal */}
      {selectedUser && (
        <Modal
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
          title={`Modify Privileges: ${selectedUser.name}`}
          description={`User ID: ${selectedUser.id} • Registered as ${selectedUser.role}`}
          maxWidth="md"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setIsRoleModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveRole}>
                Save Changes
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Select Assigned Role</label>
              <select
                value={editingRole}
                onChange={(e) => setEditingRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white"
              >
                <option value="farmer">Farmer (Cultivator intimation & recovery tracker)</option>
                <option value="officer">Officer (Field inspector & e-Panchanama draft compiler)</option>
                <option value="admin">Admin (System analytics & executive sanction authority)</option>
              </select>
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-950 text-xs">
              Note: Changing user role will alter navigation menus and action permissions across the platform.
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserManagementPage;
