import '../style/Header.scss';

import { HeartOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const Header = () => {
  return (
    <header className='header'>
      <div className='header__logo'>
        <IconRoot
          icon={IconVariable.companyIcon}
          className='header__logo-icon'
        />
        <h1 className='header__title'>Furniro</h1>
      </div>
      <nav className='header__nav'>
        <a
          href='/'
          className='header__nav-item'>
          Home
        </a>
        <a
          href='/shop'
          className='header__nav-item'>
          Shop
        </a>
        <a
          href='/about'
          className='header__nav-item'>
          About
        </a>
        <a
          href='/contact'
          className='header__nav-item'>
          Contact
        </a>
      </nav>
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
