import { PublicRoute } from '@guards/auth.guard';
import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <PublicRoute>{children}</PublicRoute>;
};

export default AuthLayout;
