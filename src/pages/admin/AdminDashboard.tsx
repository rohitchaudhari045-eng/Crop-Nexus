import React, { useState, useEffect } from 'react';
import { adminApi, claimsApi } from '@/services/apiService';
import { AdminAnalyticsSummary } from '@/types';
import { StatCard } from '@/components/common/StatCard';
import { Button } from '@/components/common/Button';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { useToast } from '@/context/ToastContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet,
  AlertCircle,
  Download,
  Filter,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

const COLORS = ['#15803D', '#22C55E', '#D97706', '#3B82F6', '#8B5CF6', '#EF4444'];

export const AdminDashboard: React.FC = () => {
  const { success } = useToast();
  const [analytics, setAnalytics] = useState<AdminAnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSanctionModal, setShowSanctionModal] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      const data = await adminApi.getAnalytics();
      setAnalytics(data);
      setLoading(false);
    };
    fetchAnalytics();
  }, []);

  const handleConfirmBatchSanction = () => {
    setShowSanctionModal(false);
    success('Batch SDRF Sanctions Dispatched', '31 verified panchanama records queued for treasury disbursement.');
  };

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              State Agricultural Administration
            </span>
            <span className="text-xs text-slate-600 font-medium">• Executive Oversight</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Agricultural Disaster Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            State-wide loss distribution, crop damage trends, inspecting officer workload balancing, and treasury sanction workflows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => success('Export Ready', 'Analytics data exported to CSV.')}
            leftIcon={<Download className="w-4 h-4 text-slate-600" />}
          >
            Export CSV
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setShowSanctionModal(true)}
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
          >
            Batch Sanction Approval
          </Button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Claims Logged"
          value={analytics.totalClaims}
          subtitle="Cumulative district intimations"
          icon={<FileSpreadsheet className="w-6 h-6" />}
          iconBg="bg-blue-50 text-blue-700"
          trend={{ value: '+14% ', isPositive: true, label: 'this week' }}
        />
        <StatCard
          title="Total Impacted Area"
          value={`${analytics.estimatedTotalLossAcre.toFixed(1)} Ac.`}
          subtitle="Acreage under assessment"
          icon={<AlertCircle className="w-6 h-6" />}
          iconBg="bg-amber-50 text-amber-700"
        />
        <StatCard
          title="Inspected & Drafted"
          value={analytics.inspectedClaims}
          subtitle="Field verified records"
          icon={<ShieldCheck className="w-6 h-6" />}
          iconBg="bg-emerald-50 text-emerald-700"
        />
        <StatCard
          title="Registered Cultivators"
          value={analytics.totalFarmers}
          subtitle="Active farmers onboarded"
          icon={<Users className="w-6 h-6" />}
          iconBg="bg-purple-50 text-purple-700"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Claims by Crop (Bar Chart) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-bold text-base text-slate-900">Crop Loss Distribution (Acreage)</h2>
              <p className="text-xs text-slate-600">Total verified affected acres by major crop</p>
            </div>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.claimsByCrop}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="crop" stroke="#475569" fontSize={12} />
                <YAxis stroke="#475569" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="lossAcre" name="Affected Acres" fill="#166534" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Calamity Causes (Donut Chart) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-bold text-base text-slate-900">Damage Intimations by Calamity</h2>
              <p className="text-xs text-slate-600">Breakdown of reported natural causes</p>
            </div>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.claimsByCause}
                  dataKey="count"
                  nameKey="cause"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={50}
                  paddingAngle={4}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {analytics.claimsByCause.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Trend Area Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="font-bold text-base text-slate-900">Monthly Claims & SDRF Relief Trend</h2>
            <p className="text-xs text-slate-600">Number of damage claims and sanctioned compensation in Lakhs (₹)</p>
          </div>
        </div>
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#475569" fontSize={12} />
              <YAxis yAxisId="left" stroke="#166534" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#92400e" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="claims"
                name="Total Claims Logged"
                stroke="#166534"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="compensationLaksh"
                name="Relief Disbursed (₹ Lakhs)"
                stroke="#92400e"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Confirmation Dialog for Batch Actions */}
      <ConfirmDialog
        isOpen={showSanctionModal}
        onClose={() => setShowSanctionModal(false)}
        onConfirm={handleConfirmBatchSanction}
        title="Sanction Verified e-Panchanamas"
        message="Are you sure you want to approve batch treasury disbursement for all 31 verified crop loss records? This will notify the beneficiary farmers."
        confirmText="Approve Batch SDRF Sanctions"
        type="warning"
      />
    </div>
  );
};

export default AdminDashboard;
