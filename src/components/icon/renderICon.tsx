import React from 'react';

import { IconVariable } from './types';

export const renderICon: Record<IconVariable, React.ReactNode> = {
  [IconVariable.arrowDown]: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='7'
      viewBox='0 0 12 7'
      fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L6 5.29289L10.6464 0.646447C10.8417 0.451184 11.1583 0.451184 11.3536 0.646447C11.5488 0.841709 11.5488 1.15829 11.3536 1.35355L6.35355 6.35355C6.15829 6.54882 5.84171 6.54882 5.64645 6.35355L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z'
        fill='#1A1A1A'
      />
    </svg>
  ),
  [IconVariable.error]: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='7'
      viewBox='0 0 12 7'
      fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L6 5.29289L10.6464 0.646447C10.8417 0.451184 11.1583 0.451184 11.3536 0.646447C11.5488 0.841709 11.5488 1.15829 11.3536 1.35355L6.35355 6.35355C6.15829 6.54882 5.84171 6.54882 5.64645 6.35355L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z'
        fill='#1A1A1A'
      />
    </svg>
  ),
};
