import { Outlet } from 'react-router-dom';

import { SideBarHR } from '../components/SideBar';
function HRLayout() {
  return (
    <div className='flex min-h-screen'>
      <SideBarHR className='box-border w-[18%]' />
      <div className='box-border w-[82%] overflow-auto bg-[#f5f5f5]'>
        <Outlet />
      </div>
    </div>
  );
}

export default HRLayout;
