import React from 'react';

export interface IButtonRootProps extends React.ButtonHTMLAttributes<HTMLInputElement> {
  label?: string;
  formID?: string;
  onClick?: () => any;
}

function ButtonRoot({
  type = 'submit',
  label = 'Button',
  formID,
  className = '',
  onClick = () => {},
}: IButtonRootProps) {
  return (
    <button
      className={`h-fit w-fit rounded-lg bg-green-500 p-3 text-white ${className}`}
      type={type}
      onClick={onClick}
      form={formID}>
      {label}
    </button>
  );
}

export default ButtonRoot;
