import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { EnumPath } from '@/common/enum/Enums';
import Notfound from '@/components/notfound';
import FeatureComponent from '@/pages/layouts/GeneralLayout';
import HRLayout from '@/pages/layouts/HRLayout';
import { ListEmployeesPage } from '@/pages/listEmployees';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
// eslint-disable-next-line @typescript-eslint/naming-convention
const HomePage = React.lazy(async () => import('@/pages/home'));

// eslint-disable-next-line @typescript-eslint/naming-convention
const AuthPage = React.lazy(async () => import('@/pages/auth/view'));

const rootRoutes: Array<{
  element: JSX.Element;
  path?: string;
  children?: Array<{
    path: string;
    breadcrumbText?: JSX.Element | string;
    title?: JSX.Element;
    element: JSX.Element;
  }>;
}> = [
  {
    element: <HRLayout />,
    children: [
      {
        path: EnumPath.home,
        element: (
          <PrivateRoute
            role={[]}
            children={<HomePage />}
          />
        ),
      },
    ],
  },
  {
    element: <FeatureComponent />,
    children: [
      {
        path: EnumPath.login,
        element: (
          <PublicRoute
            role={[]}
            children={<AuthPage />}
          />
        ),
      },
    ],
  },
  {
    element: <FeatureComponent />,
    children: [
      {
        path: EnumPath.forgotPassword,
        element: (
          <PublicRoute
            role={[]}
            children={<AuthPage />}
          />
        ),
      },
    ],
  },
  {
    element: <FeatureComponent />,
    children: [
      {
        path: EnumPath.resetPassword,
        element: (
          <PublicRoute
            role={[]}
            children={<AuthPage />}
          />
        ),
      },
    ],
  },
  {
    element: <HRLayout />,
    children: [
      {
        path: EnumPath.listEmployees,
        element: (
          <PrivateRoute
            role={[]}
            children={<ListEmployeesPage />}
          />
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Notfound />,
  },
];
const browserRouter = createBrowserRouter(rootRoutes);

export { browserRouter, rootRoutes };
