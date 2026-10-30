import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

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

      {/* Authenticated Workspace Pages with DashboardLayout */}
      <Route element={<DashboardLayout />}>
        {/* Farmer Protected Routes */}
        <Route
          path="/farmer"
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-damage"
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <ReportDamagePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/claims"
          element={
            <ProtectedRoute allowedRoles={['farmer', 'officer']}>
              <ClaimTrackingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/claims/:id"
          element={
            <ProtectedRoute allowedRoles={['farmer', 'officer']}>
              <ClaimTrackingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recovery"
          element={
            <ProtectedRoute allowedRoles={['farmer', 'officer']}>
              <RecoveryAdvisorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recovery/progress"
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <RecoveryProgressPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weather"
          element={
            <ProtectedRoute allowedRoles={['farmer', 'officer']}>
              <WeatherAlertsPage />
            </ProtectedRoute>
          }
        />

        {/* Officer Protected Routes */}
        <Route
          path="/officer"
          element={
            <ProtectedRoute allowedRoles={['officer']}>
              <OfficerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/officer/inspection"
          element={
            <ProtectedRoute allowedRoles={['officer']}>
              <OfficerInspectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/officer/panchanama"
          element={
            <ProtectedRoute allowedRoles={['officer']}>
              <DraftPanchanamaPage />
            </ProtectedRoute>
          }
        />

        {/* Shared Authenticated Pages */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['farmer', 'officer']}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={['farmer', 'officer']}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRoles={['farmer', 'officer']}>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/help"
          element={
            <ProtectedRoute allowedRoles={['farmer', 'officer']}>
              <HelpSupportPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 Fallback */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
