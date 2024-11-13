import { CaretDownOutlined, HistoryOutlined, KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { EnumPath } from '@/common/enum/Enums';
import AuthService from '@/utils/Auth';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface NavBarProps {
  title: string;
  styleClass?: string; // Optional class for custom styling
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const NavBar: React.FC<NavBarProps> = ({ title, styleClass }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.removeAll();
    navigate(EnumPath.login);
  };

  const items: MenuProps['items'] = [
    {
      key: 'user-info',
      label: (
        <div className='-mx-1 -mt-1 cursor-default transition-colors duration-200 hover:bg-gray-50'>
          <div className='flex items-center gap-3 p-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f4ff] text-[#4d7bc2]'>
              <UserOutlined className='text-lg' />
            </div>
            <div className='flex flex-col items-start'>
              <span className='text-base font-medium text-gray-800'>Dai Dang Orc EBST</span>
              <span className='text-sm font-normal text-gray-500'>Vận chuyển</span>
            </div>
          </div>
        </div>
      ),
      disabled: true,
      className: 'opacity-100 p-0 bg-white',
    },
    {
      type: 'divider',
    },
    {
      key: 'profile',
      label: 'Thông tin cá nhân',
      icon: <UserOutlined />,
    },
    {
      key: 'changePassword',
      label: 'Đổi mật khẩu',
      icon: <KeyOutlined />,
    },
    {
      key: 'history',
      label: 'Lịch sử hoạt động',
      icon: <HistoryOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: <span className='text-red-500'>Đăng xuất</span>,
      icon: <LogoutOutlined className='text-red-500' />,
      onClick: handleLogout,
    },
  ];

  return (
    <header className={`flex h-12 w-full items-center text-lg font-bold text-black ${styleClass ?? 'bg-white'}`}>
      <div className='flex w-full justify-between px-4'>
        <div>{title}</div>
        <div className='flex justify-end'>
          <Dropdown
            menu={{ items }}
            placement='bottomRight'>
            <Button className='flex h-8 items-center justify-center gap-1 rounded-full border-none bg-[#e8f4ff] px-2 text-[#4d7bc2] hover:bg-[#d3e8ff]'>
              <UserOutlined />
              <CaretDownOutlined className='text-xs' />
            </Button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
