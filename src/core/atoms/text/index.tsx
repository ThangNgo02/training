import './style.scss';

import React from 'react';

interface ITextProps {
  /** Content of the text */
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  weight?: 'light' | 'normal' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  /** HTML element type (default: 'p') */
  as?: 'p' | 'span' | 'div' | 'strong' | 'em';
  /** Inline styles */
  style?: React.CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Text: React.FC<ITextProps> = ({
  children,
  size = 'medium',
  weight = 'normal',
  color = '#333',
  align = 'left',
  className = '',
  as: Component = 'p',
  style = {},
}) => {
  return (
    <Component
      className={`text text--${size} text--${weight} ${className}`}
      style={{ color, textAlign: align, ...style }}>
      {children}
    </Component>
  );
};

export default Text;
