import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { EnumPath } from '@/common/enum/Enums';
import Notfound from '@/components/notfound';
import FeatureComponent from '@/pages';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
// eslint-disable-next-line @typescript-eslint/naming-convention
const HomePage = React.lazy(async () => import('@/pages/home'));
// eslint-disable-next-line @typescript-eslint/naming-convention
const LoginPage = React.lazy(async () => import('@/pages/login'));
// eslint-disable-next-line @typescript-eslint/naming-convention
const DepartmentPage = React.lazy(async () => import('@/pages/department'));
// eslint-disable-next-line @typescript-eslint/naming-convention
const ShiftPage = React.lazy(async () => import('@/pages/shift'));
// eslint-disable-next-line @typescript-eslint/naming-convention
const StaffPage = React.lazy(async () => import('@/pages/staff'));
// eslint-disable-next-line @typescript-eslint/naming-convention
const HomePage1 = React.lazy(async () => import('@/pages/home1'));

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
    element: <FeatureComponent />,
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
      {
        path: EnumPath.login,
        element: (
          <PublicRoute
            role={[]}
            children={<LoginPage />}
          />
        ),
      },
      {
        path: EnumPath.department,
        element: (
          <PrivateRoute
            role={[]}
            children={<DepartmentPage />}
          />
        ),
      },
      {
        path: EnumPath.staff,
        element: (
          <PrivateRoute
            role={[]}
            children={<StaffPage />}
          />
        ),
      },
      {
        path: EnumPath.shift,
        element: (
          <PrivateRoute
            role={[]}
            children={<ShiftPage />}
          />
        ),
      },
      {
        path: EnumPath.home1,
        element: (
          <PrivateRoute
            role={[]}
            children={<HomePage1 />}
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
