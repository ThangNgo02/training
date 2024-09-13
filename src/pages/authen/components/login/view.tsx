import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@/components/button';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';

interface ILogin {
  isLoading?: boolean;
  handleCallApi?: () => void;
  setData: (data: any) => void;
  data: any;
}

function LoginView({ isLoading, handleCallApi, setData, data }: ILogin) {
  const [isHidden, setHidden] = useState(false);

  const handleHiddenPassword = () => {
    setHidden(!isHidden);
  };
  return (
    <div className='text-16x20 flex flex-col gap-8'>
      <InputRoot
        label='Tên đăng nhập'
        name='username'
        readOnly={false}
        placeholder='Nhập tên đăng nhập'
        onChange={e => {
          setData({ ...data, username: e.target.value });
        }}
      />
      <div className='flex flex-col gap-3'>
        <div className=''>
          <InputRoot
            className='relative'
            type={isHidden ? 'password' : 'text'}
            label='Mật khẩu'
            name='password'
            readOnly={false}
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
            onChange={e => {
              setData({ ...data, password: e.target.value });
            }}
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
        className='rounded-lg bg-primary-pressed px-6 py-4 text-white'
        onClick={handleCallApi}
      />
    </div>
  );
}

export default LoginView;
