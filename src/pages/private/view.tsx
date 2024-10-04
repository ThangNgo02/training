import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { sidebarItems } from '@/common/enum/SidebarItem';
import FlexRoot from '@/components/flex';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import ImageRoot from '@/components/image';
import AuthService from '@/utils/Auth';

import LogoTsp from '../../../public/logo-tsp.png';

function PrivateView() {
  const auth = AuthService.getPackageAuth();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<number>(sidebarItems[0].id);

  const handleItemClick = (itemId: number) => {
    setActiveItem(itemId);
    const item = sidebarItems.find(item => item.id === itemId);
    if (item) {
      navigate(item.route);
    }
  };

  return (
    <div className='flex min-h-screen w-full flex-row bg-gray-100'>
      <div className='bg-sidebar flex w-[245px] flex-col items-center bg-[#289E65] pl-4 pr-4 pt-6'>
        <ImageRoot
          src={LogoTsp}
          alt='logo-tsp'
        />
        <div className='mt-5 flex h-14 w-full flex-row justify-between rounded-xl bg-white bg-opacity-60 p-2'>
          <FlexRoot gap={8}>
            <IconRoot icon={IconVariable.avatar} />
            <FlexRoot
              justifyContent='space-between'
              direction='column'>
              <div className='text-14x18 font-medium text-[#1A1A1A]'>{auth?.fullName}</div>
              <div className='text-12x16 font-normal text-[#484848]'>{auth?.position || 'Đạo của lãng khách'}</div>
            </FlexRoot>
          </FlexRoot>
        </div>

        <ul className='mt-6 w-full space-y-2'>
          {sidebarItems.map(item => (
            <li
              key={item.id}
              onClick={() => {
                handleItemClick(item.id);
              }}
              className={`flex cursor-pointer items-center gap-[10px] rounded-md p-2 hover:bg-white hover:bg-opacity-20 ${
                activeItem === item.id ? 'bg-white bg-opacity-20' : ''
              }`}>
              {item.icon}
              <span className='text-16x24 font-medium text-white'>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex flex-1 flex-col overflow-hidden'>
        <header className='border-b border-gray-200 bg-white px-6 py-4'>
          <h2 className='text-xl font-semibold text-gray-800'>Trang chủ</h2>
        </header>
        <main className='flex-1 overflow-y-auto p-6'>
          <div className='rounded-lg bg-white p-6 shadow'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default PrivateView;
