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
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const TextArea: React.FC<ITextAreaProps> = ({
  size = 'medium',
  disabled = false,
  className = '',
  style = {},
  placeholder = '',
  children,
}) => {
  return (
    <textarea
      className={`textarea__field textarea--${size} ${disabled ? 'textarea__field--disabled' : ''} ${className}`}
      style={style}
      placeholder={placeholder}
      disabled={disabled}>
      {children}
    </textarea>
  );
};

export default TextArea;
