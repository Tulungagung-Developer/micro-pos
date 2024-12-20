import React from 'react';
import LoginPage from '@pages/login';
import { RouteObject } from 'react-router';

export default [
  {
    path: '/',
    element: <LoginPage />,
  },
] as RouteObject[];
