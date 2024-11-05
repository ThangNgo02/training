import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { EnumPath } from '@/common/enum/Enums';
import Heading from '@/components/heading';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import SelectRoot from '@/components/select';
import { LanguageContext, LocalizeTypeFunc } from '@/context/languages';

import ForgotPassword from './components/forgot-password';
import Login from './components/login';
import Register from './components/register';
import ResetPassword from './components/reset-password';

function Authentication() {
  const location = useLocation();
  const [selectedValue, setSelectedValue] = useState('vn');
  const { userLanguageChange } = useContext(LanguageContext);

  const handleChange = (value: string) => {
    if (value) {
      userLanguageChange(value);
      setSelectedValue(value);
    }
  };

  const languageOptions = [
    { value: 'vn', label: 'Tiếng Việt' },
    { value: 'en', label: 'Tiếng Anh' },
  ];

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-[url('public/theme-login.png')] bg-cover bg-center">
        <div className='relative rounded-[20px] bg-white p-10'>
          {location?.pathname === EnumPath.resetPassword && <ResetPassword />}
          {location?.pathname === EnumPath.forgotPassword ? (
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
                  <Link to={EnumPath.contact}>{LocalizeTypeFunc('contact')}</Link>
                </div>
                <div className='px-6 py-[10px]'>
                  <Link to={`${location?.pathname === EnumPath.register ? EnumPath.login : EnumPath.register}`}>
                    {location?.pathname === EnumPath.login
                      ? `${LocalizeTypeFunc('register')}`
                      : `${LocalizeTypeFunc('login')}`}
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
                children={`${location?.pathname === EnumPath.login ? `${LocalizeTypeFunc('login')} TSP` : `${LocalizeTypeFunc('register')} TSP`}`}
                className='mb-10 mt-3 h-11 text-center text-[36px] font-bold'
              />
              <div className='flex flex-col gap-8 text-16x20'>
                {location?.pathname === EnumPath.login && <Login />}
                {location?.pathname === EnumPath.register && <Register />}
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
    </>
  );
}

export default Authentication;
