import './style.scss';

import React from 'react';

interface ILinkProps {
  /** Destination URL */
  href: string;
  /** Content of the link */
  children: React.ReactNode;
  /** Size of the link: small, medium, or large */
  size?: 'small' | 'medium' | 'large';
  /** Weight of the font: light, normal, or bold */
  weight?: 'light' | 'normal' | 'bold';
  /** Text color */
  color?: string;
  /** Inline styles for custom styling */
  style?: React.CSSProperties;
  /** Target behavior */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** Security and SEO attributes (e.g., "noopener noreferrer") */
  rel?: string;
  /** Custom class names */
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Link: React.FC<ILinkProps> = ({
  href,
  children,
  size = 'medium',
  weight = 'normal',
  color,
  style = {},
  target = '_self',
  rel,
  className = '',
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
      className={`link link--${size} link--${weight} ${className}`}
      style={{ color, ...style }}>
      {children}
    </a>
  );
};

export default Link;
