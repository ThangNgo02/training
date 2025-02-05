import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { EnumPath, type EnumRole } from '@/common/enum/Enums';
import AuthService from '@/utils/Auth';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

export interface IPrivateRoute {
  children: React.ReactElement;
  role: EnumRole[] | [];
}

function PrivateRoute({ role, children }: IPrivateRoute) {
  const auth = AuthService.getPackageAuth();
  const profile = AuthService.getPackageProfile();
  const navigate = useNavigate();
  const roleProfile = profile?.role;
  if (Helper.isEmpty(auth)) {
    LoggerService.info('Navigate to LOGIN PAGE because user is not authenticated');
    navigate(EnumPath.home);
  }

  const isAllow = role?.length > 0 ? role?.some(r => roleProfile?.includes(r)) : true;
  if (!isAllow) {
    LoggerService.info('Navigate to NO PERMISSION PAGE because user is not allowed');
    // do navigate
  }

  return isAllow ? (
    children
  ) : (
    <Navigate
      to={'/no-permission'}
      replace
    />
  );
}

export default PrivateRoute;
