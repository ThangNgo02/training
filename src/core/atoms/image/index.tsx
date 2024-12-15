import './style.scss';

import React from 'react';

interface IImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  /** Image fit styles (e.g., "cover", "contain") */
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  /** Optional click handler */
  onClick?: () => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Image: React.FC<IImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  style = {},
  objectFit = 'cover',
  // onClick,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`image ${className}`}
      style={{
        width,
        height,
        objectFit,
        ...style,
      }}
      // onClick={onClick}
    />
  );
};

export default Image;
