import './style.scss';

import React from 'react';

interface IIconProps {
  /** Icon name or SVG path */
  name: string;
  size?: string | number;
  color?: string;
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Icon: React.FC<IIconProps> = ({ name, size = '1rem', color = 'currentColor', className = '', style = {} }) => {
  return (
    <i
      className={`icon icon--${name} ${className}`}
      style={{
        fontSize: size,
        color,
        ...style,
      }}
    />
  );
};

export default Icon;
