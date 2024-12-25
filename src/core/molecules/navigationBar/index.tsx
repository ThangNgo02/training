import './style.scss';

import React from 'react';

import Link from '../../atoms/link'; // Adjust the path if necessary

interface INavBarProps {
  /** Array of links for the navigation bar */
  links: Array<{ href: string; label: string }>;
  size?: 'small' | 'medium' | 'large';
  weight?: 'light' | 'normal' | 'bold';
  className?: string;
  /** Color of the link text */
  linkColor?: string; // New prop to control link color
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const NavBar: React.FC<INavBarProps> = ({
  links,
  size = 'medium',
  weight = 'normal',
  className = '',
  linkColor = '#d4a056', // Default color set to #d4a056
}) => {
  return (
    <nav className={`nav-bar ${className}`}>
      <ul className='nav-bar__list'>
        {links.map((link, index) => (
          <li
            key={index}
            className='nav-bar__item'>
            <Link
              href={link.href}
              size={size}
              weight={weight}
              className='nav-bar__link'
              style={{ color: linkColor }} // Apply the dynamic color here
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
