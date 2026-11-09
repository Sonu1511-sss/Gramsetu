import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { MembersPage } from './pages/members/MembersPage';
import { NoticesPage } from './pages/notices/NoticesPage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { MeetingsPage } from './pages/meetings/MeetingsPage';
import { ComplaintsPage } from './pages/complaints/ComplaintsPage';
import { SchemesPage } from './pages/schemes/SchemesPage';
import { WorkersPage } from './pages/workers/WorkersPage';
import { VillagePage } from './pages/village/VillagePage';
import { DocumentsPage } from './pages/documents/DocumentsPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { AIIntelligencePage } from './pages/ai-intelligence/AIIntelligencePage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { ToastProvider } from './hooks/useToast';

export function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="notices" element={<NoticesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="meetings" element={<MeetingsPage />} />
          <Route path="complaints" element={<ComplaintsPage />} />
          <Route path="schemes" element={<SchemesPage />} />
          <Route path="workers" element={<WorkersPage />} />
          <Route path="village" element={<VillagePage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="ai-intelligence" element={<AIIntelligencePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;

