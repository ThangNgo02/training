import './style.scss';

import { HeartOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

import NavBar from '../../molecules/navigationBar'; // Adjust the path if necessary

interface IHeaderProps {
  navLinks: Array<{ href: string; label: string }>;
  title: string;
  logoIcon?: React.ReactNode | string; // Accept either a React node or a string (URL)
  linkColor?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Header: React.FC<IHeaderProps> = ({ navLinks, title, logoIcon, linkColor = '#d4a056' }) => {
  return (
    <header className='header'>
      <div className='header__logo'>
        {/* Render Ant Design icon if logoIcon is a React node, otherwise render an image */}
        {typeof logoIcon === 'string' ? (
          <img
            src={logoIcon}
            alt='Logo'
            className='header__logo-img'
          />
        ) : (
          logoIcon
        )}
        <h1 className='header__title'>{title}</h1>
      </div>
      <NavBar
        links={navLinks}
        linkColor={linkColor}
      />
      <div className='header__icons'>
        <UserOutlined className='header__icon' />
        <SearchOutlined className='header__icon' />
        <HeartOutlined className='header__icon' />
        <ShoppingCartOutlined className='header__icon' />
      </div>
    </header>
  );
};

export default Header;
