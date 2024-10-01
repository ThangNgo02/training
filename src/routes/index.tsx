import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { EnumPath } from '@/common/enum/Enums';
import Notfound from '@/components/notfound';
import PrivateIndex from '@/pages/private';
import PublicIndex from '@/pages/public';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
// eslint-disable-next-line @typescript-eslint/naming-convention
const HomePage = React.lazy(async () => import('@/pages/home'));
// eslint-disable-next-line @typescript-eslint/naming-convention
const ProfilePage = React.lazy(async () => import('@/pages/register'));
// eslint-disable-next-line @typescript-eslint/naming-convention
const RegisterPage = React.lazy(async () => import('@/pages/register'));
// eslint-disable-next-line @typescript-eslint/naming-convention
const LoginPage = React.lazy(async () => import('@/pages/login'));
// eslint-disable-next-line @typescript-eslint/naming-convention
const EmployeeListPage = React.lazy(async () => import('@/pages/list'));

const rootRoutes: Array<{
  element: JSX.Element;
  path?: string;
  children?: Array<{
    path: string;
    breadcrumbText?: JSX.Element | string;
    title?: JSX.Element;
    name?: string;
    element: JSX.Element;
  }>;
}> = [
  {
    element: <PublicIndex />,
    children: [
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
        path: EnumPath.signup,
        element: (
          <PublicRoute
            role={[]}
            children={<RegisterPage />}
          />
        ),
      },
    ],
  },
  {
    path: '/',
    element: <PrivateIndex />,
    children: [
      {
        path: EnumPath.home,
        element: (
          <PrivateRoute
            role={[]}
            children={<HomePage />}
          />
        ),
        name: 'homepage',
      },
      {
        path: EnumPath.list,
        element: (
          <PrivateRoute
            role={[]}
            children={<EmployeeListPage />}
          />
        ),
        name: 'list',
      },
      {
        path: EnumPath.profile,
        element: (
          <PrivateRoute
            role={[]}
            children={<ProfilePage />}
          />
        ),
        name: 'profile',
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
