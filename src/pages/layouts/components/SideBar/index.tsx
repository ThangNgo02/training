import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';

import { ItemSideBar } from './ItemSideBar';

export function SideBarHR() {
  return (
    <div className='flex w-[18%] flex-col border bg-[#289E65] px-4 py-10'>
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
        <ItemSideBar
          iconStart={<IconRoot icon={IconVariable.employee} />}
          to='/'
          title='Danh sách nhân viên'
          className='font-medium text-white hover:bg-[#1e724ada]'
        />
        <ItemSideBar
          iconStart={<IconRoot icon={IconVariable.contract} />}
          to='/'
          title='Hợp đồng'
          className='font-medium text-white hover:bg-[#1e724ada]'
        />
      </div>
      <ItemSideBar
        iconStart={<IconRoot icon={IconVariable.help} />}
        to='/'
        title='Trợ giúp'
        className='mt-2 font-normal text-[#C8ECDA] hover:bg-[#1e724ada]'
      />
    </div>
  );
}
