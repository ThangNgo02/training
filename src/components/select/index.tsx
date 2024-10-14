import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import IconRoot from '../icon';
import { IconVariable } from '../icon/types';

export interface IOption {
  value: any;
  label: string;
}

export interface ISelectProps {
  options: IOption[];
  firstValue?: IOption;
  name: string;
  isReset?: boolean;
  className?: string;
  classNameSelected?: string;
  classNameItemSelect?: string;
  classNameOptionList?: string;
  onChange?: (value: any) => void;
}

function SelectRoot({ options, onChange, ...props }: ISelectProps) {
  const methods = useFormContext();

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<IOption>(
    props.firstValue ?? {
      value: options[0],
      label: options[0].label,
    },
  );
  const handleReset = () => {
    methods?.reset();
    setValue(
      props.firstValue ?? {
        value: options[0],
        label: options[0].label,
      },
    );
  };
  useEffect(() => {
    if (props.isReset) {
      handleReset();
    }
  }, [props.isReset]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsFocus(!isFocus);
  };

  const handleOptionClick = (optionValue: IOption) => {
    methods?.setValue(props.name, optionValue.value);
    if (onChange) {
      onChange(optionValue.value);
    }
    setValue(optionValue);
    setIsOpen(false);
    setIsFocus(false);
  };
  const selectRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setIsFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <div
      ref={selectRef}
      className={`relative select-none outline-none ${props.className ?? ''} ${isFocus ? 'custom-shadow border-[#2db976]' : 'border-[#98A2B3]'}`}>
      <div
        className={`flex w-full cursor-pointer items-center justify-between gap-2 px-2 text-sm text-black ${props.classNameSelected}`}
        onClick={handleToggle}>
        <span className='text-[#0F1E34]'>{value ? value.label : 'Lựa chọn'}</span>
        {isOpen ? (
          <span className='text-[#0F1E34]'>
            <IconRoot icon={IconVariable.arrowUp} />
          </span>
        ) : (
          <span className='text-[#0F1E34]'>
            <IconRoot icon={IconVariable.arrowDown} />
          </span>
        )}
      </div>

      {isOpen && (
        <div
          className={`absolute left-0 right-0 z-10 mt-[14px] w-full overflow-y-auto rounded-md border border-gray-200 bg-white p-1 text-start shadow-md ${props.classNameOptionList}`}>
          <ul>
            {options.map(option => (
              <li
                key={option.value}
                className={`cursor-pointer rounded px-2 py-2 text-sm text-gray-700 hover:bg-[#e1e1e1] ${props.classNameItemSelect}`}
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
