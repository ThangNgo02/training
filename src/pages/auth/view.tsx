import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import SelectRoot, { type IOption } from '@/components/select';
import TextLink from '@/components/textlink';

import ForgotPassword from './forgotpassword';
import Login from './login';
import ResetPassword from './resetpassword';

function AuthView() {
  const location = useLocation();

  const options: IOption[] = [
    { value: 'vn', label: 'Tiếng Việt' },
    { value: 'en', label: 'Tiếng Anh' },
  ];
  const [selectedValue, setSelectedValue] = useState<IOption>({
    label: 'Tiếng Việt',
    value: 'vn',
  });

  const handleOnChangeSelect = (value: IOption) => {
    setSelectedValue(value);
    console.log(value);
  };

  return (
    <div className="fixed flex h-full w-full items-center justify-center bg-[url('@/public/background_theme_auth.png')] bg-cover bg-center">
      <div className='relative flex h-[86%] w-[40%] items-center justify-center rounded-[20px] bg-white'>
        {location.pathname === '/forgot-password' ? (
          <ForgotPassword />
        ) : (
          <div className='flex h-full w-full flex-col px-32 py-6'>
            <div className='flex h-10 justify-around'>
              <SelectRoot
                className='rounded-md hover:bg-gray-100'
                options={options}
                firstValue={selectedValue}
                onChange={handleOnChangeSelect}
              />

              <TextLink
                to='/contact'
                text='Liên hệ'
                className='rounded-md bg-transparent px-2 text-sm text-black hover:cursor-pointer hover:bg-gray-100'
              />
              {location.pathname === '/login' ? (
                <TextLink
                  to='/forgot-password'
                  text='Quên mật khẩu'
                  className='rounded-md bg-transparent px-2 text-sm text-black hover:cursor-pointer hover:bg-gray-100'
                />
              ) : (
                <TextLink
                  to='/login'
                  text='Đăng nhập'
                  className='rounded-md bg-transparent px-2 text-sm text-black hover:cursor-pointer hover:bg-gray-100'
                />
              )}
            </div>

            <div className='mt-4 flex flex-col items-center'>
              <Link to='/'>
                <img
                  src={`src/public/logo_web_page.png`}
                  alt='hr management'
                  className='h-10 w-20'
                />
              </Link>
              <span className='mt-2 text-3xl font-bold'>
                {location.pathname === '/login' ? 'Đăng nhập TSP' : 'Cập nhật mật khẩu mới'}
              </span>
            </div>

            {location.pathname === '/login' ? <Login /> : <ResetPassword />}

            <div className='mt-auto flex items-center justify-center gap-[6px] text-sm text-[#616161]'>
              <span>HRM</span>
              <IconRoot icon={IconVariable.copyRight} />
              <span>2024</span>
              <IconRoot icon={IconVariable.dot} />
              <span>Stg</span>
              <IconRoot icon={IconVariable.dot} />
              <span>Version 0.0.1</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthView;
