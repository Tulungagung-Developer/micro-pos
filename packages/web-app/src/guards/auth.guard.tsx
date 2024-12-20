import { useApp } from '@providers/app.providers';
import { Navigate } from 'react-router';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useApp();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};
