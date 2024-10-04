import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@/components/button';
import FormRoot from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';

interface ILogin {
  isLoading?: boolean;
  handleCallApi?: (data: any) => any;
}

function LoginView({ isLoading, handleCallApi }: ILogin) {
  const [isHidden, setHidden] = React.useState(true);

  const handleHiddenPassword = () => {
    setHidden(!isHidden);
  };

  const onSubmit = (data: any) => {
    handleCallApi && handleCallApi(data);
  };

  return (
    <FormRoot onSubmit={onSubmit}>
      <div className='flex flex-col gap-8 text-16x20'>
        <InputRoot
          readOnly={false}
          label='Tên đăng nhập'
          name='username'
          placeholder='Nhập tên đăng nhập'
        />
        <div className='flex flex-col gap-3'>
          <div className=''>
            <InputRoot
              readOnly={false}
              className='relative'
              type={isHidden ? 'password' : 'text'}
              label='Mật khẩu'
              name='password'
              placeholder='Nhập mật khẩu'
              iconEnd={
                isHidden ? (
                  <IconRoot
                    onClick={handleHiddenPassword}
                    icon={IconVariable.closeEyes}
                  />
                ) : (
                  <IconRoot
                    className='h-4 w-4'
                    onClick={handleHiddenPassword}
                    icon={IconVariable.openEyes}
                  />
                )
              }
            />
          </div>
          <div className='flex justify-end'>
            <Link
              to={'/forgot-password'}
              className='font-medium text-primary-pressed'>
              Quên mật khẩu?
            </Link>
          </div>
        </div>
        <Button
          name='Đăng nhập'
          customClassName='rounded-lg bg-primary-pressed px-6 py-4 text-white'
          type='submit'
        />
      </div>
    </FormRoot>
  );
}

export default LoginView;
