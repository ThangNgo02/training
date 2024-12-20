import React from 'react';

interface ICheckboxProps {
  /** Label for the checkbox */
  label: string;
  /** Dynamic border styling */
  border?: string;
  /** Checkbox size */
  size?: 'small' | 'medium' | 'large';
  /** Background color when checked */
  color?: string;
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Checked state */
  checked?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Checkbox: React.FC<ICheckboxProps> = ({
  label,
  border = '2px solid #d4a056',
  size = 'medium',
  color = '#d4a056',
  className = '',
  style = {},
  checked = false,
  disabled = false,
}) => {
  return (
    <label
      className={`checkbox checkbox--${size} ${disabled ? 'checkbox--disabled' : ''} ${className}`}
      style={{
        ...style,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}>
      <span
        className='checkbox__box'
        style={{
          border,
          backgroundColor: checked ? color : 'transparent',
        }}
      />
      <span className='checkbox__label'>{label}</span>
    </label>
  );
};

export default Checkbox;
