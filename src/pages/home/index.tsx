import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EnumPath } from '@/common/enum/Enums';
import AuthService from '@/utils/Auth';

import HomeView from './view';

function HomeIndex() {
  const auth = AuthService.getPackageAuth();
  const navigate = useNavigate();

  const handleCallApi = () => {
    AuthService.removeAll();
    navigate(EnumPath.login);
  };

  return (
    <HomeView
      handleCallApi={handleCallApi}
      isLoading={false}
      data={auth?.profileDetails}
    />
  );
}

export default HomeIndex;
