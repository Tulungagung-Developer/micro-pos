import React from 'react';
import { DashboardLayout } from '@components/layout/dashboard';
import { Outlet } from 'react-router';
// import { PrivateRoute } from "@guards/auth.guard";

const MainLayout = () => {
  return (
    // <PrivateRoute>
    // </PrivateRoute>
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default MainLayout;
