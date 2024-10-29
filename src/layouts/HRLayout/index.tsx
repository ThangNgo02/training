import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/header';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';

import { SideBarHR } from '../components/SideBar';

interface IHeaderProps {
  title: string;
}

function HRLayout({ title }: IHeaderProps) {
  const [isToggle, setToggle] = useState<boolean>(false);

  return (
    <div className='relative flex h-screen'>
      <SideBarHR
        className={`h-full w-[320px] transition-transform duration-300 lg:translate-x-0 ${
          isToggle ? 'translate-x-0' : '-translate-x-full'
        } lg:block ${isToggle ? 'lg:hidden' : 'hidden'}`}
      />

      <div className={`duration-800 flex-1 overflow-hidden bg-[#f5f5f5] transition-all`}>
        <Header
          iconStart={
            <IconRoot
              icon={IconVariable.toggle}
              className='rounded-md p-1 hover:cursor-pointer hover:bg-gray-200'
              onClick={() => {
                setToggle(!isToggle);
              }}
            />
          }
          title={title}
          className='text-2xl font-bold text-[#1A1A1A]'
        />
        <Outlet />
      </div>
    </div>
  );
}

export default HRLayout;
