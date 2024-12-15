import React from 'react';

interface ICheckboxProps {
  /** Label for the checkbox */
  label: string;
  /** Is the checkbox checked? */
  checked?: boolean;
  /** Handle the onChange event */
  onChange?: (checked: boolean) => void;
  /** Dynamic border styling */
  border?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

const Checkbox: React.FC<ICheckboxProps> = ({
    label,
    checked = false,
    onChange,
    border,
    size = 'medium',
    color,
    className = '',
    style = {},
  }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e.target.checked);
    };
  
    return (
      <label
        className={`checkbox checkbox--${size} ${className}`}
        style={{ ...style }}
      >
        <input
          type="checkbox"
          className="checkbox__input"
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="checkbox__box"
          style={{
            border,
            backgroundColor: checked ? color : 'transparent',
          }}
        ></span>
        <span className="checkbox__label">{label}</span>
      </label>
    );
  };
  
  export default Checkbox;
  