import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/Dashboard';
import { AttendancePage } from './pages/attendance/AttendancePage';
import { ClassesPage } from './pages/classes/ClassesPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { LeaderboardPage } from './pages/leaderboard/LeaderboardPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { LoginPage } from './pages/auth/LoginPage';
import { useAuth } from './hooks/useAuth';
import { ROUTES } from './constants';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Router>
      <Routes>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.ATTENDANCE} element={<AttendancePage />} />
        <Route path={ROUTES.CLASSES} element={<ClassesPage />} />
        <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
        <Route path={ROUTES.LEADERBOARD} element={<LeaderboardPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;