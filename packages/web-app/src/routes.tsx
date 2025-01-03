import MainLayout from '@layouts/main/main.layout';
import { DashboardPage } from '@pages/dashboard';
import LoginPage from '@pages/login';
import { RouteObject } from 'react-router';

export default [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
    ],
  },
] as RouteObject[];
