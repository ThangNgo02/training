import { useState } from 'react';

import Button from '../button';
import IconRoot from '../icon';
import { IconVariable } from '../icon/types';

export function Pagination() {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <div className='flex items-center gap-[14px] text-base leading-6 text-[#0F1E34]'>
      <Button
        className={`flex items-center justify-center rounded-lg bg-[#D0D5DD] px-3 py-2`}
        onClick={() => {
          console.log('Click...');
        }}
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
        value={1}
        className={`no-spin w-[68px] rounded-md border border-[#C7D2E3] px-3 py-1 text-center outline-none ${isActive && 'custom-shadow'}`}
      />{' '}
      / 4
      <Button
        className=' lex items-center justify-center rounded-lg border bg-[#2DB976] px-3 py-2 hover:opacity-85'
        onClick={() => {
          console.log('Click...');
        }}
        iconStart={<IconRoot icon={IconVariable.arrowEnd} />}
      />
    </div>
  );
}
