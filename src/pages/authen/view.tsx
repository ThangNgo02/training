import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Heading from '@/components/heading';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import SelectRoot from '@/components/select';

import ForgotPassword from './components/forgot-password';
import Login from './components/login';
import Register from './components/register';

function Authen() {
  const location = useLocation();
  const [selectedValue, setSelectedValue] = useState('vn');

  const handleChange = (value: string) => {
    setSelectedValue(value);
    console.log(`Selected value: ${value}`);
  };

  const languageOptions = [
    { value: 'vn', label: 'Tiếng Việt' },
    { value: 'en', label: 'Tiếng Anh' },
  ];

  return (
    <>
      <div className="bg-[url('public/theme-login.png')] bg-cover bg-center">
        <div className='flex h-screen items-center justify-center'>
          <div className='relative rounded-[20px] bg-white p-10'>
            {location?.pathname === '/forgot-password' ? (
              <ForgotPassword />
            ) : (
              <>
                <div className='flex items-center justify-center px-[13px] font-medium'>
                  <div className='px-6 py-[10px]'>
                    <SelectRoot
                      options={languageOptions}
                      onChange={handleChange}
                      value={selectedValue}
                    />
                  </div>
                  <div className='px-6 py-[10px]'>
                    <Link to='/contact'>Liên hệ</Link>
                  </div>
                  <div className='px-6 py-[10px]'>
                    <Link to={`${location?.pathname === '/register' ? '/login' : '/register'}`}>
                      {location?.pathname === '/login' ? 'Đăng ký' : 'Đăng nhập'}
                    </Link>
                  </div>
                </div>
                <div className='mt-[72px] flex items-center justify-center'>
                  <img
                    src='/public/logo.png'
                    alt='logo'
                  />
                </div>
                <Heading
                  children={`${location?.pathname === '/login' ? 'Đăng nhập TSP' : 'Đăng ký TSP'}`}
                  className='mb-10 mt-3 h-11 text-center text-[36px] font-bold'
                />
                <div className='text-16x20 flex flex-col gap-8'>
                  {location?.pathname === '/login' && <Login />}
                  {location?.pathname === '/register' && <Register />}
                </div>
                <div className='mt-10 flex items-center justify-center gap-[6px] text-14x18 text-[#616161]'>
                  <span>HRM</span>
                  <IconRoot icon={IconVariable.noCopyRight} />
                  <span>2024</span>
                  <IconRoot icon={IconVariable.dot} />
                  <span>Stg</span>
                  <IconRoot icon={IconVariable.dot} />
                  <span>Version 0.0.1</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Authen;
