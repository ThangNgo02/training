import './customCss.css';

import { ProfileOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { EnumPath } from '@/common/enum/Enums';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface SideMenuProps {
  defaultSelectedKeys: string[];
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const SideMenu: React.FC<SideMenuProps> = ({ defaultSelectedKeys }) => {
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    switch (key) {
      case '1':
        navigate(EnumPath.staff);
        break;
      case '2':
        navigate(EnumPath.department);
        break;
      case '3':
        navigate('/help');
        break;
      default:
        break;
    }
  };

  return (
    <aside className=' w-52 border-r bg-[#289E65]'>
      <div className='mt-8 flex items-center justify-center bg-[#289E65]'>
        <img
          src='/logo1.png'
          alt='Hr Icon'
        />
        <h1 className=' pl-2 font-bold text-white'>
          HR <br />
          Management
        </h1>
      </div>
      <hr className='mx-2 my-2' />

      <Menu
        mode='inline'
        className='bg-[#289E65]'
        defaultSelectedKeys={defaultSelectedKeys}
        style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item
          key='1'
          className='text-white'
          onClick={() => {
            handleMenuClick('1');
          }}
          icon={<UserOutlined />}>
          Danh sách nhân viên
        </Menu.Item>
        <Menu.Item
          key='2'
          className='text-white'
          onClick={() => {
            handleMenuClick('2');
          }}
          icon={<ProfileOutlined />}>
          Phòng ban
        </Menu.Item>
        <hr className='mx-2' />

        <Menu.Item
          key='3'
          className='text-white'
          onClick={() => {
            handleMenuClick('3');
          }}
          icon={<QuestionCircleOutlined />}>
          Giúp đỡ
        </Menu.Item>
      </Menu>
    </aside>
  );
};

export default SideMenu;
