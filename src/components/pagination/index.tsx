import { useState } from 'react';

import Button from '../button';
import IconRoot from '../icon';
import { IconVariable } from '../icon/types';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: IPaginationProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const page = Math.max(1, Math.min(Number(event.target.value), totalPages));
    onPageChange(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='flex items-center gap-[14px] text-base leading-6 text-[#0F1E34]'>
      <Button
        className={`flex items-center justify-center rounded-lg px-3 py-2 ${currentPage <= 1 ? 'bg-[#D0D5DD]' : 'bg-[#2DB976]'} hover:opacity-85`}
        onClick={goToPreviousPage}
        disabled={currentPage <= 1}
        iconStart={<IconRoot icon={IconVariable.arrowStart} />}
      />
      Trang
      <input
        type='number'
        onFocus={() => {
          setIsActive(true);
        }}
        onBlur={() => {
          setIsActive(false);
        }}
        value={currentPage}
        onChange={handleInputChange}
        className={`no-spin w-[68px] rounded-md border border-[#C7D2E3] px-3 py-1 text-center outline-none ${
          isActive && 'custom-shadow'
        }`}
      />{' '}
      / {totalPages}
      <Button
        className={`flex items-center justify-center rounded-lg border  px-3 py-2 hover:opacity-85 ${currentPage >= totalPages ? 'bg-[#D0D5DD]' : 'bg-[#2DB976]'}`}
        onClick={goToNextPage}
        disabled={currentPage >= totalPages}
        iconStart={<IconRoot icon={IconVariable.arrowEnd} />}
      />
    </div>
  );
}
