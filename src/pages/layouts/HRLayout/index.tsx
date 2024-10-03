import { Outlet } from 'react-router-dom';

import { SideBarHR } from '../components/SideBar';

function HRLayout() {
  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 flex'>
      <SideBarHR />
      <Outlet />
    </div>
  );
}

export default HRLayout;
