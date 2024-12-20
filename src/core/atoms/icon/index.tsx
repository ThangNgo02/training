import './style.scss';

import React from 'react';

interface IIconProps {
  /** Icon name for classes or URL for custom icons */
  name?: string;
  url?: string;
  size?: string | number;
  color?: string;
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Icon: React.FC<IIconProps> = ({
  name,
  url,
  size = '1rem',
  color = 'currentColor',
  className = '',
  style = {},
}) => {
  if (url) {
    return (
      <img
        src={url}
        alt={name ?? 'icon'}
        className={`icon ${className}`}
        style={{
          width: size,
          height: size,
          ...style,
        }}
      />
    );
  }

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
