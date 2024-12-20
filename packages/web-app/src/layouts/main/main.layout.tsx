import { PrivateRoute } from '@guards/auth.guard';
import React from 'react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <PrivateRoute>{children}</PrivateRoute>;
};

export default MainLayout;
