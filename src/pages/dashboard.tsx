import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const DashboardPage = () => {
  return <div>Welcome to the protected dashboard!:</div>;
};

export default function ProtectedDashboard() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}
