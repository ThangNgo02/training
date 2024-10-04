import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { EnumPath } from '@/common/enum/Enums';
import Notfound from '@/components/notfound';
import FeatureComponent from '@/pages';
import Authen from '@/pages/authen/view';
import PrivateIndex from '@/pages/private';
import EmployeePage from '@/pages/private/employee';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
// eslint-disable-next-line @typescript-eslint/naming-convention
const HomePage = React.lazy(async () => import('@/pages/home'));

const rootRoutes: Array<{
  element: JSX.Element;
  path?: string;
  children?: Array<{
    path: string;
    breadcrumbText?: JSX.Element | string;
    title?: JSX.Element;
    element: JSX.Element;
    name?: string;
    children?: Array<{
      path: string;
      breadcrumbText?: JSX.Element | string;
      title?: JSX.Element;
      element: JSX.Element;
    }>;
  }>;
}> = [
  {
    element: <FeatureComponent />,
    children: [
      {
        path: EnumPath.login,
        element: (
          <PublicRoute
            role={[]}
            children={<Authen />}
          />
        ),
      },
      {
        path: EnumPath.register,
        element: (
          <PublicRoute
            role={[]}
            children={<Authen />}
          />
        ),
      },
      {
        path: EnumPath.forgotPassword,
        element: (
          <PublicRoute
            role={[]}
            children={<Authen />}
          />
        ),
      },
      {
        path: EnumPath.resetPassword,
        element: (
          <PublicRoute
            role={[]}
            children={<Authen />}
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
        name: 'Homepage',
      },
      {
        path: EnumPath.employee,
        element: (
          <PrivateRoute
            role={[]}
            children={<EmployeePage />}
          />
        ),
        name: 'EmployeePage',
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
