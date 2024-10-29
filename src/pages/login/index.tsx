import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { EnumPath } from '@/common/enum/Enums';
import toastDefault, { EnumToast } from '@/components/toast';
import AuthService from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

import LoginView from './view';

if (AuthService.getPackageAuth()) {
  AuthService.removeAll();
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const LoginPage: React.FC = () => {
  const [error, setError] = useState('No error');
  const loginApi: IApiRequest = {
    url: 'https://api.tsp.com.vn/account/auth/login',
    method: 'post',
  };
  const navigate = useNavigate();

  // Handles successful login response
  const handleResponse = {
    handleRequestSuccess: (response: any) => {
      console.log(response);
      if (response.code === 2000) {
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
          LoggerService.error('Xử lí đăng nhập xảy ra lỗi:', error);
        }
      } else {
        setError(response.message);
      }
    },
    handleRequestFailed: (response: any) => {
      LoggerService.error('There is an error', response.message);
    },
  };

  // Custom hook to handle the login request name mutate as mutateLogin
  const { mutate: mutateLogin } = useRequest(loginApi, handleResponse);
  // Trigger login request
  const handleLogin = async (data: any) => {
    mutateLogin({ ...data, tenant: 'ebst' });
  };

  return (
    <div
      className='flex h-screen items-center justify-center bg-slate-300'
      style={{
        backgroundImage: 'url("/login-background.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <LoginView
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        handleSubmit={handleLogin}
        error={error}
      />
    </div>
  );
};

export default LoginPage;
