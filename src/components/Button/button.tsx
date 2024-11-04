import React from 'react';

interface ILoginButtonProps {
  onClick?: () => void;
  label: string;
  type?: 'button' | 'submit';
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Button: React.FC<ILoginButtonProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className='w-full rounded bg-[#2DB976] px-4 py-2 font-semibold text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50'>
      {label}
    </button>
  );
};

export default Button;
