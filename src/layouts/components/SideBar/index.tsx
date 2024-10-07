import { useState } from 'react';

import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';

import { type IItemSideBar, ItemSideBar } from './ItemSideBar';

interface ISideBarProps {
  className?: string;
}
const itemSidebar: IItemSideBar[] = [
  {
    id: 0,
    to: '/',
    title: 'Trang chủ',
    iconStart: <IconRoot icon={IconVariable.home} />,
  },
  {
    id: 1,
    to: '/employees',
    title: 'Danh sách nhân viên',
    iconStart: <IconRoot icon={IconVariable.employee} />,
  },
  {
    id: 2,
    to: '/contracts',
    title: 'Hợp đồng',
    iconStart: <IconRoot icon={IconVariable.contract} />,
  },
  {
    id: 3,
    to: '/help',
    title: 'Trợ giúp',
    iconStart: <IconRoot icon={IconVariable.help} />,
  },
];
export function SideBarHR(props: ISideBarProps) {
  const [activeItem, setActiveItem] = useState<number>(0);
  return (
    <div className={`flex flex-col border bg-[#289E65] px-4 py-10 ${props.className}`}>
      <a
        href='/'
        className='outline-none hover:cursor-pointer'>
        <div className='flex items-center justify-center gap-2 '>
          <img
            src='./src/public/logo_cty.png'
            alt='logo cty'
            className='h-[60px] w-[87px] rounded-[8px] border-[2px] border-white'
          />
          <div className='text-[18px] font-bold leading-[22px] text-white'>
            <p>HR</p>
            <p>Management</p>
          </div>
        </div>
        <hr className='mt-4 border-[#c8c8c8]' />
      </a>

      <div className='mt-[20px] flex items-center justify-between rounded-[12px] bg-[#a9d8c1] p-2 hover:cursor-pointer'>
        <div className='flex items-center justify-center gap-2'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-white bg-[#289E65] font-medium text-white'>
            A
          </div>
          <div className='flex flex-col'>
            <span className='text-[14px] font-medium leading-[18px] text-[#1A1A1A]'>Nguyễn Văn A</span>
            <span className='text-[12px] font-normal leading-[16px] text-[#484848]'>Nhân viên</span>
          </div>
        </div>
        <IconRoot
          className='inline '
          icon={IconVariable.caret}
        />
      </div>

      <div className='my-[20px] flex flex-col'>
        {itemSidebar.map(item => (
          <ItemSideBar
            key={item.id}
            id={item.id}
            onClick={() => {
              setActiveItem(item.id);
            }}
            iconStart={item.iconStart}
            to={item.to}
            title={item.title}
            className={`mt-2 font-medium text-white hover:bg-[#1e724ada] ${item.id === 3 && 'mt-2 font-normal text-[#C8ECDA] '} ${activeItem === item.id && 'border border-white'}`}
          />
        ))}
      </div>
    </div>
  );
}
