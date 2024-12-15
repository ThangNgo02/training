import React from 'react';

interface IInputProps {
  /** Placeholder text for the input */
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline';
  color?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  /** Dynamic border styling */
  border?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

const Input: React.FC<IInputProps> = ({
    placeholder = 'Enter text...',
    size = 'medium',
    variant = 'primary',
    color,
    align = 'left',
    className = '',
    border,
    style = {},
  }) => {
    return (
      <input
        type="text"
        className={`input input--${size} input--${variant} ${className}`}
        placeholder={placeholder}
        style={{
          color,
          textAlign: align,
          border,
          ...style,
        }}
      />
    );
  };
  
  export default Input;
  