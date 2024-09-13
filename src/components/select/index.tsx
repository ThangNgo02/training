import { useState } from 'react';

import IconRoot from '../icon';
import { IconVariable } from '../icon/types';

interface IOption {
  value: string;
  label: string;
}

interface ISelectProps {
  options: IOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  search?: boolean;
  placeholderSearch?: string;
}

function SelectRoot({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  className,
  search,
  placeholderSearch,
}: ISelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: IOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredOptions(filteredOptions);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const selectedOption = filteredOptions.find(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      if (selectedOption) {
        onChange(selectedOption.value);
        setIsOpen(false);
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`flex items-center justify-between text-sm ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        onClick={handleToggle}>
        {value ? (
          <span className='text-base'>{options.find(option => option.value === value)?.label}</span>
        ) : (
          <span className='text-gray-400'>{placeholder}</span>
        )}
        <span className='ml-2 text-gray-400'>
          <IconRoot icon={IconVariable.arrowDown} />
        </span>
      </div>
      {isOpen && (
        <div className='absolute top-6 z-10 w-full rounded-md border border-gray-200 bg-white shadow-md'>
          {search && (
            <input
              type='search'
              value={searchTerm}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
              placeholder={placeholderSearch}
              className='w-full px-2 py-2 text-sm outline-none'
            />
          )}
          <ul>
            {filteredOptions.map(option => (
              <li
                key={option.value}
                className='cursor-pointer px-2 py-2 text-sm text-gray-700 hover:bg-[#80cda8]'
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
