import './style.scss';

import React from 'react';

interface IButtonProps {
  /** Content inside the button */
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline';
  color?: string;
  backgroundColor?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  border?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Button: React.FC<IButtonProps> = ({
  children,
  size = 'medium',
  variant = 'primary',
  color,
  backgroundColor,
  align = 'center',
  className = '',
  style = {},
  border,
}) => {
  return (
    <button
      className={`button button--${size} button--${variant} ${className}`}
      style={{ color, backgroundColor, textAlign: align, border, ...style }}>
      {children}
    </button>
  );
};

export default Button;
