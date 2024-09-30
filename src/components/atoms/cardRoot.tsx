import React from 'react';

export interface ICardRootProps extends React.CanvasHTMLAttributes<HTMLInputElement> {}

function CardRoot({ children, className, ...props }: ICardRootProps) {
  return (
    <div
      {...props}
      className={`m-5 max-w-[100vw] rounded-xl bg-white p-6 ${className}`}>
      {children}
    </div>
  );
}

export default CardRoot;
