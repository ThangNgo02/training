import './style.scss';

import React from 'react';

interface IHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Heading: React.FC<IHeadingProps> = ({ level, children, className }) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag className={`heading heading--h${level} ${className ?? ''}`}>{children}</Tag>;
};

export default Heading;
