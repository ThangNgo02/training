import './style.scss';

import React, { useState } from 'react';

interface ICheckboxProps {
  label: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  color?: string; // Dynamic color for the checkbox
  onChange?: (checked: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Checkbox: React.FC<ICheckboxProps> = ({
  label,
  size = 'medium',
  disabled = false,
  color = '#d4a056', // Default color
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <label
      className={`checkbox checkbox--${size} ${disabled ? 'checkbox--disabled' : ''}`}
      onClick={handleClick}
      style={
        {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '--checkbox-border': color,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '--checkbox-bg': isChecked ? color : 'transparent',
        } satisfies React.CSSProperties
      }>
      <span
        className='checkbox__box'
        data-checked={isChecked}
        aria-disabled={disabled}></span>
      <span className='checkbox__label'>{label}</span>
    </label>
  );
};

export default Checkbox;
