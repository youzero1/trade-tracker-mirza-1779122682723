import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DashboardPage from '@/pages/DashboardPage';
import EmployeesPage from '@/pages/EmployeesPage';
import LeavePage from '@/pages/LeavePage';
import BookingsPage from '@/pages/BookingsPage';
import BenefitsPage from '@/pages/BenefitsPage';
import ReportsPage from '@/pages/ReportsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="leave" element={<LeavePage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="benefits" element={<BenefitsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
