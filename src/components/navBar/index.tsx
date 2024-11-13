import React from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface NavBarProps {
  title: string;
  styleClass?: string; // Optional class for custom styling
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const NavBar: React.FC<NavBarProps> = ({ title, styleClass }) => {
  return (
    <header className={`flex h-12 w-full items-center px-4 text-lg font-bold text-black ${styleClass ?? 'bg-white'}`}>
      {title}
    </header>
  );
};

export default NavBar;
