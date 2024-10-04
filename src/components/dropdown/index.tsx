import { useEffect, useState } from 'react';

import IconRoot from '../icon';
import { IconVariable } from '../icon/types';

interface IOption {
  value: string;
  label: string;
}

interface IDropdownRootProps {
  options?: IOption[];
  onSelect: (option: IOption) => void;
  placeholder?: string;
  defaultValue?: string;
  width?: string;
  height?: string;
}

const optionsDefault = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
];

function DropdownRoot({
  options = optionsDefault,
  onSelect,
  placeholder,
  defaultValue = '25',
  width = '100px',
  height = '32px',
}: IDropdownRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<IOption | null>(null);

  useEffect(() => {
    const defaultOption = options.find(option => option.value === defaultValue);
    if (defaultOption) setSelected(defaultOption);
  }, [defaultValue, options]);

  const handleSelect = (option: IOption) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left w-[${width}] h-[${height} rounded-md`}>
      <div>
        <button
          type='button'
          className={`inline-flex items-center justify-between gap-[10px] rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none w-[${width}] h-[${height}] ${selected ? 'border-[#289E65]' : 'border-[#C7D2E3]'}`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}>
          {selected ? selected.label : placeholder} Dòng
          <IconRoot icon={IconVariable.arrowDown} />
        </button>
      </div>

      {isOpen && (
        <div
          className={`absolute mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 w-[${width}]`}>
          <div className='p-2'>
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  handleSelect(option);
                }}
                className={`block w-full rounded-md px-4 py-2 text-left text-sm transition-all w-[${width}] h-[${height}] ${
                  selected && selected.value === option.value
                    ? 'bg-[#ccf7e2] font-medium text-[#0F1E34] hover:bg-[#ccf7e2]'
                    : 'text-[#0F1E34]'
                } hover:bg-gray-200`}>
                {`${option.label} Dòng`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownRoot;
