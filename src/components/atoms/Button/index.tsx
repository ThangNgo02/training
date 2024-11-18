import React from 'react';

import mapModifiers from '@/utils/functions';

import loadingIcon from './loading.gif';

type Sizes = 'h60' | 'h60-pk3';
type Variant = 'primary' | 'secondary' | 'green' | 'iconButton';
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  modifiers?: Array<Variant | Sizes>;
  isLoading?: boolean;
}

function Button({ children, modifiers, isLoading, type = 'button', ...props }: IButtonProps) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={mapModifiers('a-button', modifiers, isLoading && 'loading')}
      {...props}>
      {isLoading ? (
        <img
          src={loadingIcon}
          alt='loading'
        />
      ) : (
        children
      )}
    </button>
  );
}

Button.defaultProps = {
  modifiers: ['primary', 'h60'],
  type: 'button',
};

export default Button;
