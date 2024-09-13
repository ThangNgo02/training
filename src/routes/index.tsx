import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { EnumPath } from '@/common/enum/Enums';
import Notfound from '@/components/notfound';
import FeatureComponent from '@/pages';
import Login from '@/pages/authen/components/login';
import Register from '@/pages/authen/components/register';
import Authen from '@/pages/authen/view';

import PrivateRoute from './privateRoute';
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
        path: EnumPath.home,
        element: (
          <PrivateRoute
            role={[]}
            children={<HomePage />}
          />
        ),
      },
      {
        path: '',
        element: <Authen />,
        children: [
          {
            path: '/login', // default route for login
            element: (
              <PrivateRoute
                role={[]}
                children={<Login />}
              />
            ),
          },
          {
            path: '/register', // relative path to login
            element: (
              <PrivateRoute
                role={[]}
                children={<Register />}
              />
            ),
          },
        ],
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
