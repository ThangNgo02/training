import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { EnumApiPath, EnumPath } from '@/common/enum/Enums';
import Config from '@/env';
import AuthService from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

import LoginView from './view';

function LoginIndex() {
  const navigate = useNavigate();
  const loginApi: IApiRequest = {
    url: `${Config.getInstance().getState().api.host}${EnumApiPath.login}`,
    method: 'post',
  };
  const handleLogin = async (data: any) => {
    mutate({ tenant: 'ebst', ...data });
  };
  const funcRequest = {
    handleResponse: (response: any) => {
      try {
        AuthService.setPackageAuth(
          {
            token: `${response.accessToken}`,
            expireAt: Date.now() + 86_400_000,
            refreshAt: 60_000,
            profileDetails: {
              fullName: response.user.fullName,
              username: response.user.username,
              email: response.user.email,
              phoneNumber: response.user.phoneNumber,
              position: response.user.position,
              staffId: response.user.staffId,
              avatar: response.user.avatar,
              department: response.user.department,
              accountEnabled: response.user.accountEnabled,
              accountExpired: response.user.accountExpired,
              accountLocked: response.user.accountLocked,
              isCustomer: response.user.isCustomer,
              customerId: response.user.customerId,
              staffMetaDataId: response.user.staffMetaDataId,
            },
          },
          Date.now() + 86_400_000,
        );
        if (AuthService.getPackageAuth()) {
          navigate(EnumPath.home);
        }
        LoggerService.debug('EditBankComponent execute handleRequestSuccess receive data', response);
      } catch (error: any) {
        LoggerService.error('CalendarYearDetailComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestFailed: (response: any) => {
      LoggerService.error('Error', response.message);
    },
  };
  const { isError, mutate } = useRequest(loginApi, funcRequest);
  return (
    <LoginView
      isError={isError}
      handleLogin={handleLogin}
    />
  );
}

export default LoginIndex;
