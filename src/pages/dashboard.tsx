import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

const DashboardPage = () => {
  const { isAuthorized } = useAuth();

  return <div>Welcome to the protected dashboard!:</div>;
};

export default function ProtectedDashboard() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}
