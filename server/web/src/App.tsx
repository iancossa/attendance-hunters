import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/Dashboard';
import { AttendancePage } from './pages/attendance/AttendancePage';
import { ClassesPage } from './pages/classes/ClassesPage';
import { StudentsPage } from './pages/students/StudentsPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { LeaderboardPage } from './pages/leaderboard/LeaderboardPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { LoginPage } from './pages/auth/LoginPage';
import { useAuth } from './hooks/useAuth';
import { ROUTES } from './constants';
import { Loading } from './components/ui/loading';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background transition-all duration-300">
        <Loading size="lg" fullScreen />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="animate-in fade-in duration-300">
        <LoginPage />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <Router>
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.ATTENDANCE} element={<AttendancePage />} />
          <Route path={ROUTES.CLASSES} element={<ClassesPage />} />
          <Route path={ROUTES.STUDENTS} element={<StudentsPage />} />
          <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
          <Route path={ROUTES.LEADERBOARD} element={<LeaderboardPage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;