import { useState } from 'react';

import IconRoot from '../icon';
import { IconVariable } from '../icon/types';

export interface IOption {
  value: string;
  label: string;
}

export interface ISelectProps {
  options: IOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  classNameSelect?: string;
  classNameItemSelect?: string;
}

function SelectRoot({ options, value, onChange, ...props }: ISelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option: IOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${props.className ?? ''}`}>
      <div
        className={`flex h-10 cursor-pointer items-center justify-between px-2 text-sm text-black`}
        onClick={handleToggle}>
        {value ? (
          <span className='text-black'>{options.find(option => option.value === value)?.label}</span>
        ) : (
          <span className='text-black'>{props.placeholder}</span>
        )}
        {isOpen ? (
          <span className='ml-2 text-black'>
            <IconRoot icon={IconVariable.arrowUp} />
          </span>
        ) : (
          <span className='ml-2 text-black'>
            <IconRoot icon={IconVariable.arrowDown} />
          </span>
        )}
      </div>

      {isOpen && (
        <div className='absolute z-10 w-full rounded-md border border-gray-200 bg-white shadow-md'>
          <ul>
            {options.map(option => (
              <li
                key={option.value}
                className='cursor-pointer px-2 py-2 text-center text-sm text-gray-700 hover:bg-[#e1e1e1]'
                onClick={() => {
                  handleOptionClick(option);
                }}>
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectRoot;
