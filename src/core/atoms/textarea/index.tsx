import './style.scss';

import React from 'react';

interface ITextAreaProps {
  /** Size variant: small, medium, or large */
  size?: 'small' | 'medium' | 'large';
  /** If true, the textarea will be disabled */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  /** TextArea content */
  children?: React.ReactNode;
  /** Border color */
  borderColor?: string;
  /** Text color */
  color?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const TextArea: React.FC<ITextAreaProps> = ({
  size = 'medium',
  disabled = false,
  className = '',
  style = {},
  placeholder = '',
  children,
  borderColor,
  color,
}) => {
  return (
    <textarea
      className={`textarea__field textarea--${size} ${disabled ? 'textarea__field--disabled' : ''} ${className}`}
      style={{
        ...style,
        borderColor,
        color,
      }}
      placeholder={placeholder}
      disabled={disabled}>
      {children}
    </textarea>
  );
};

export default TextArea;
