import { useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import Config from '@/env';
import AuthService from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

import HomeView from './view';

function HomeIndex() {
  const auth = AuthService.getPackageAuth();
  const exampleApi: IApiRequest = {
    headers: { token: auth?.token },
    // url: config.api.host,
    url: 'https://reqres.in/api/users',
    method: 'get',
  };

  const [data, setData] = useState<any>();
  const funcRequest = {
    handleRequestSuccess: (data: any) => {
      try {
        setData(data);
        LoggerService.debug('EditBankComponent execute handleRequestSuccess receive data', data);
      } catch (error: any) {
        LoggerService.error('CalendarYearDetailComponent execute handleRequestSuccess receive error', error);
      }
    },
  };

  const { isLoading, mutate } = useRequest(exampleApi, funcRequest);
  const handleCallApi = () => {
    mutate({});
  };
  return (
    <HomeView
      handleCallApi={handleCallApi}
      isLoading={isLoading}
      data={data}
    />
  );
}

export default HomeIndex;
