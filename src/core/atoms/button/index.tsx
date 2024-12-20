import './style.scss';

import React from 'react';

export interface IButtonProps {
  /** Content inside the button */
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
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
  border = '1px solid transparent',
}) => {
  // Align dynamically using inline style
  const alignmentStyle: React.CSSProperties =
    align === 'center'
      ? { margin: '0 auto', display: 'block' } // Center
      : align === 'right'
        ? { marginLeft: 'auto', display: 'block' } // Right
        : {}; // Default (left alignment, no changes)

  return (
    <div style={{ textAlign: align }}>
      <button
        className={`button button--${size} button--${variant} ${className}`}
        style={{
          color,
          backgroundColor,
          border,
          ...style,
          ...alignmentStyle,
        }}>
        {children}
      </button>
    </div>
  );
};

Button.defaultProps = {
  size: 'medium',
  variant: 'primary',
  align: 'center',
  border: '1px solid transparent',
};

export default Button;
