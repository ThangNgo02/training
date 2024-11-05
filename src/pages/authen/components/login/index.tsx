import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { EnumPath } from '@/common/enum/Enums';
import toastDefault, { EnumToast } from '@/components/toast';
import Config from '@/env';
import AuthService from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

import { type IRootObject } from './type';
import LoginView from './view';

function Login() {
  const navigate = useNavigate();
  const config = new Config().getState();
  const loginApi: IApiRequest = {
    url: config.api.apiPath.login,
    method: 'post',
  };

  const handleLogin = async (data: any) => {
    mutate({ ...data, tenant: 'ebst' });
  };

  const handleResponse = {
    handleRequestSuccess: (response: IRootObject) => {
      try {
        const auth = {
          token: `${response.accessToken}`,
          expireAt: Date.now() + 86_400_000,
          refreshAt: 60_000,
          profileDetails: response?.user,
        };

        const profile = {
          fullName: response.user.fullName,
          username: response.user.username,
          email: response.user.email,
          phoneNumber: response.user.phoneNumber,
          staffId: response.user.staffId,
          department: response.user.department,
          accountEnabled: response.user.accountEnabled,
          accountExpired: response.user.accountExpired,
          accountLocked: response.user.accountLocked,
          isCustomer: response.user.isCustomer,
          customerId: response.user.customerId,
          staffMetaDataId: response.user.staffMetaDataId,
        };

        AuthService.setAllPackage(auth, profile);
        navigate(EnumPath.home);
        toastDefault(EnumToast.SUCCESS, 'Đăng nhập thành công');
      } catch (error: any) {
        LoggerService.error('HandleLogin execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestFailed: (response: any) => {
      LoggerService.error('Error', response.message);
    },
  };

  const { mutate } = useRequest(loginApi, handleResponse);

  return <LoginView handleCallApi={handleLogin} />;
}

export default Login;
