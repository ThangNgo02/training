import './style.scss';

import React from 'react';

interface ILinkProps {
  /** Destination URL */
  href: string;
  /** Content of the link */
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  weight?: 'light' | 'normal' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
  /** Custom class names */
  className?: string;
  /** Target behavior */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** Security and SEO (e.g., "noopener noreferrer") */
  rel?: string;
  /** HTML element type (default: 'a') */
  as?: 'a' | 'button' | 'div';
  /** Inline styles */
  style?: React.CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Link: React.FC<ILinkProps> = ({
  href,
  children,
  size = 'medium',
  weight = 'normal',
  color = '#007bff',
  align = 'left',
  className = '',
  target = '_self',
  rel,
  as: Component = 'a',
  style = {},
}) => {
  return (
    <Component
      href={Component === 'a' ? href : undefined} // Only add href if it's an 'a' tag
      target={target}
      rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
      className={`link link--${size} link--${weight} ${className}`}
      style={{ color, textAlign: align, ...style }}>
      {children}
    </Component>
  );
};

export default Link;
