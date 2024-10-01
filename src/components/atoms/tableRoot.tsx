/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/naming-convention */
import { useMemo, useRef, useState } from 'react';

import { type ITableColumns } from '@/common/interfaces/tableColumn';
import { Localize } from '@/context/languages';

interface ITableRootProps {
  data: any[];
  columns: ITableColumns[];
  name: string;
}

export function TableRoot({ name, data, columns }: ITableRootProps) {
  const talbeRef = useRef<HTMLDivElement>(null);
  const isOverflowing = useMemo(() => {
    if (talbeRef.current) {
      const isOverflowing =
        talbeRef.current.scrollHeight > talbeRef.current.clientHeight ||
        talbeRef.current.scrollWidth > talbeRef.current.clientWidth;
      return isOverflowing;
    } else {
      return false;
    }
  }, [talbeRef.current]);
  const [activeColumnIndexes, setActiveColumnIndexes] = useState(columns.map(column => column.isHiddenColumn !== true));
  const [isOpenColumnSetting, setOpenColumnSetting] = useState(false);
  const activeColumns = useMemo(() => {
    return columns.filter((_, index) => activeColumnIndexes[index]);
  }, [columns, activeColumnIndexes]);

  function resetActiveColumns() {
    setActiveColumnIndexes(columns.map(column => column.isHiddenColumn !== true));
  }

  function setAllActive() {
    setActiveColumnIndexes(columns.map(_ => true));
  }

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex h-fit w-full flex-row'>
        <button
          onClick={() => {
            setOpenColumnSetting(true);
          }}
          className='mb-3 block rounded-lg border-[1px] border-slate-400 bg-white p-2 px-5 text-center text-sm font-medium text-slate-800 hover:bg-gray-200'>
          Cột
        </button>
      </div>
      <div className='max-w-full overflow-hidden rounded-xl border border-[#98A2B3]'>
        <div
          ref={talbeRef}
          className={`-ml-1 -mr-1 -mt-1 ${isOverflowing ? 'mb-[1px]' : '-mb-1'} h-fit overflow-x-auto`}>
          <table className='w-full table-fixed rounded-xl border-none'>
            <thead>
              <tr className='bg-primary text-12x18 font-medium text-white'>
                {activeColumns.map(column => (
                  <th
                    key={column.key}
                    className={`border border-[#98A2B3] px-5 py-2 ${column.fixed === undefined ? '' : 'sticky'} ${column.width ? `w-[${column.width}px]` : 'w-[200px]'}`}>
                    {column.isHiddenHeader
                      ? ''
                      : Localize({
                          tid: `${name}.${column.key}`,
                          fallbackText: column.name,
                        })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((row: any, index: number) => (
                  <tr key={index}>
                    {activeColumns.map(column => (
                      <td
                        onClick={column.onClick ? () => column.onClick!(row, index) : undefined}
                        key={`${column.key}-${index}`}
                        className={`border border-[#98A2B3] px-5 py-2 ${column.fixed === undefined ? '' : 'sticky'}`}>
                        {column.render
                          ? column.render(row, index)
                          : column.key === 'index'
                            ? index + 1
                            : column.isLocalized
                              ? Localize({ tid: row[column.key as keyof unknown] })
                              : row[column.key as keyof unknown]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        tabIndex={1000}
        onClick={() => {
          setOpenColumnSetting(false);
        }}
        className={`absolute left-0 right-0 top-0 z-50 flex self-center bg-opacity-70 ${!isOpenColumnSetting && 'hidden'} h-full max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black md:inset-0`}>
        <div
          onClick={event => {
            event.stopPropagation();
          }}
          className='relative flex w-[50%] flex-col rounded-lg bg-white text-white shadow dark:bg-white'>
          <ul className='p-4'>
            {columns.map((column, index) => (
              <li
                key={column.key}
                className='m-5 flex flex-row items-center gap-2'>
                <label className='inline-flex items-center'>
                  <input
                    checked={activeColumnIndexes[index]}
                    onChange={box => {
                      setActiveColumnIndexes(ac => {
                        ac[index] = box.target.checked;
                        return [...ac];
                      });
                    }}
                    type='checkbox'
                    className='peer hidden'
                  />
                  <div className='peer flex h-6 w-6 items-center justify-center rounded-lg border-2 border-slate-400 bg-slate-200'>
                    <svg
                      visibility={activeColumnIndexes[index] ? '' : 'hidden'}
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='green'
                      width='24px'
                      height='24px'>
                      <path
                        d='M0 0h24v24H0z'
                        fill='none'
                      />
                      <path d='M9 16.17L4.83 12l-1.41 1.41L9 19 21 7l-1.41-1.41z' />
                    </svg>
                  </div>
                  <span className='ml-2 text-gray-800'>{column.name ?? Localize({ tid: `staff.${column.key}` })}</span>
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setAllActive();
            }}
            className='block border-t-[1px] border-slate-400 bg-white p-2 px-5 text-center text-sm font-medium text-slate-800 hover:bg-gray-200'>
            {Localize({ tid: 'showAll' })}
          </button>
          <button
            onClick={() => {
              resetActiveColumns();
            }}
            className='block rounded-b-lg border-t-[1px] border-slate-400 bg-white p-2 px-5 text-center text-sm font-medium text-slate-800 hover:bg-gray-200'>
            {Localize({ tid: 'reset' })}
          </button>
        </div>
      </div>
    </div>
  );
}
