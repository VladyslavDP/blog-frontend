import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthorized } = useAuth();
  const router = useRouter();

  if (typeof window !== 'undefined' && !isAuthorized) {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
};
