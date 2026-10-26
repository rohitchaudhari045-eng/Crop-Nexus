import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';

// Public pages
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';

// Farmer pages
import { FarmerDashboard } from '@/pages/farmer/FarmerDashboard';
import { ReportDamagePage } from '@/pages/farmer/ReportDamagePage';
import { ClaimTrackingPage } from '@/pages/farmer/ClaimTrackingPage';
import { RecoveryAdvisorPage } from '@/pages/farmer/RecoveryAdvisorPage';
import { RecoveryProgressPage } from '@/pages/farmer/RecoveryProgressPage';
import { WeatherAlertsPage } from '@/pages/farmer/WeatherAlertsPage';

// Officer pages
import { OfficerDashboard } from '@/pages/officer/OfficerDashboard';
import { OfficerInspectionPage } from '@/pages/officer/OfficerInspectionPage';
import { DraftPanchanamaPage } from '@/pages/officer/DraftPanchanamaPage';

// Admin pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { UserManagementPage } from '@/pages/admin/UserManagementPage';

// Shared pages
import { ProfilePage } from '@/pages/shared/ProfilePage';
import { SettingsPage } from '@/pages/shared/SettingsPage';
import { NotificationsPage } from '@/pages/shared/NotificationsPage';
import { HelpSupportPage } from '@/pages/shared/HelpSupportPage';
import { NotFoundPage } from '@/pages/shared/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages with PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Authenticated / Dashboard Workspace Pages with DashboardLayout */}
      <Route element={<DashboardLayout />}>
        {/* Farmer Features */}
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/report-damage" element={<ReportDamagePage />} />
        <Route path="/claims" element={<ClaimTrackingPage />} />
        <Route path="/claims/:id" element={<ClaimTrackingPage />} />
        <Route path="/recovery" element={<RecoveryAdvisorPage />} />
        <Route path="/recovery/progress" element={<RecoveryProgressPage />} />
        <Route path="/weather" element={<WeatherAlertsPage />} />

        {/* Officer Features */}
        <Route path="/officer" element={<OfficerDashboard />} />
        <Route path="/officer/inspection" element={<OfficerInspectionPage />} />
        <Route path="/officer/panchanama" element={<DraftPanchanamaPage />} />

        {/* Admin Features */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagementPage />} />

        {/* Shared User & Settings Pages */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/help" element={<HelpSupportPage />} />
      </Route>

      {/* 404 Fallback */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
