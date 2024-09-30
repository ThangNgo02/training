import React from 'react';

interface IFlexRoot {
  children: React.ReactNode;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string | number;
  className?: string;
}

function FlexRoot(props: IFlexRoot) {
  return (
    <div
      {...props}
      className={props.className}
      style={{
        display: 'flex',
        flexDirection: props.direction,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
        flexWrap: props.wrap,
        gap: props.gap,
      }}>
      {props.children}
    </div>
  );
}

export default FlexRoot;
