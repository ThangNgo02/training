import './customCss.css';

import { CloseCircleOutlined, FilterOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  type CheckboxOptionType,
  type CheckboxProps,
  Dropdown,
  Input,
  Select,
  Table,
  type TableColumnsType,
} from 'antd';
import React, { useEffect, useState } from 'react';

import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';

import { type IShiftDataType } from '.';
import AddForm, { type AddFormValues } from './Form/addForm';
import FilterForm from './Form/filterForm';

interface IShiftViewProps {
  data: IShiftDataType[];
  totalData: IShiftDataType[];
  columns: TableColumnsType<IShiftDataType>;
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (currentPage: number) => void;
  onSearchValueChange: (searchValue: string) => void;
  onFilterShift: () => void;
  setDepartmentCode: (code: string) => void;
  onAddShift: (payload: AddFormValues) => void;
  currentPage: number;
  pageSize: number;
  total: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShiftView: React.FC<IShiftViewProps> = ({
  data,
  totalData,
  columns,
  onPageSizeChange,
  onPageChange,
  onSearchValueChange,
  onFilterShift,
  onAddShift,
  setDepartmentCode,
  currentPage,
  pageSize,
  total,
}) => {
  const maxPages = Math.max(1, Math.ceil(total / pageSize)); // Minimum of 1 page
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [showFilterForm, setShowFilterForm] = useState(false);

  // Reset search field
  const handleResetSearch = () => {
    setSearchInputValue('');
    onSearchValueChange('');
  };

  const handlePageSizeChange = (value: number) => {
    onPageChange(1);
    onPageSizeChange(value);
  };

  const [inputPageNumber, setInputPageNumber] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    // Update input value whenever currentPage changes
    setInputPageNumber(currentPage);
  }, [currentPage]);

  const defaultCheckedList = columns.map(item => item.key as string);
  // Check list items - only include specific columns initially
  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);

  const columnOptions = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  // render column options after filtering
  const newColumns = columns
    .filter(item => !item.hidden)
    .map(item => ({
      ...item,
      hidden: !checkedList.includes(item.key as string),
    }));

  // "Check all" checkbox state
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const checkAll = newColumns.length === checkedList.length;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const indeterminate = checkedList.length > 0 && checkedList.length < newColumns.length;

  // Handle "Check all" toggle
  const onCheckAllChange: CheckboxProps['onChange'] = e => {
    e.stopPropagation();
    setCheckedList(e.target.checked ? newColumns.map(column => column.key as string) : []);
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (value: string[]) => {
    setCheckedList(value);
  };

  // Handle refresh table data
  const handleRefresh = () => {
    onSearchValueChange('');
    onPageChange(1);
    setCheckedList(defaultCheckedList); // reset check to default value
    setSearchInputValue(''); // Clear search input value
  };

  // Handle pagination changes
  const handlePaginationChange = (page: number) => {
    onPageChange(page);
    setInputPageNumber(page);
  };

  // Add debounce function to prevent too many API calls
  // eslint-disable-next-line @typescript-eslint/ban-types
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Handle search input change with debounce
  const handleSearchChange = debounce((value: string) => {
    onSearchValueChange(value);
    onPageChange(1); // Reset to first page when searching
  }, 200);

  // Handle form submission
  const handleFilterSubmit = (data: any) => {
    setDepartmentCode(data.departmentCode || '');

    // Reset page to 1 when applying filters
    onPageChange(1);
    onFilterShift();
    setShowFilterForm(false);
  };

  const handleAddSubmit = (data: AddFormValues) => {
    onAddShift(data);
    onPageChange(1);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='mx-6 flex flex-col items-center justify-center'>
      <div className='flex w-full items-center justify-between rounded-lg bg-white '>
        <div className='flexs'>
          <InputRoot
            type='text'
            className='  mt-10 w-[140%] items-center rounded-md px-4'
            placeholder='Mã / Tên ca làm việc'
            value={searchInputValue}
            onChange={e => {
              const value = e.target.value;
              setSearchInputValue(value);
              handleSearchChange(value);
            }}
            iconStart={
              <IconRoot
                icon={IconVariable.search}
                className='hover:cursor-pointer'
              />
            }
            iconEnd={
              searchInputValue ? (
                <CloseCircleOutlined
                  className='hover:cursor-pointer'
                  onClick={handleResetSearch}
                />
              ) : null
            }
            name={'search'}
          />
        </div>

        <div className=' mt-10  flex w-auto  justify-end'>
          <Button
            className='mr-4 bg-[#4d7bc2] px-1  py-2'
            onClick={handleRefresh}>
            <IconRoot
              icon={IconVariable.reload}
              className='fill-white hover:cursor-pointer hover:fill-black'
            />
          </Button>

          <div>
            <Dropdown
              open={showFilterForm}
              onOpenChange={setShowFilterForm}
              dropdownRender={() => (
                <div
                  className='bg-white p-4 shadow-lg'
                  onClick={e => {
                    e.stopPropagation();
                  }}>
                  <FilterForm
                    onSubmit={handleFilterSubmit}
                    totalData={totalData as any}
                    onClose={() => {
                      setShowFilterForm(false);
                    }}
                  />
                </div>
              )}
              trigger={['click']}>
              <Button className='mr-4  bg-[#4d7bc2] text-white'>
                <FilterOutlined />
              </Button>
            </Dropdown>
          </div>

          <Dropdown // Select collumns
            menu={{
              items: [
                {
                  key: 'checkAll',
                  label: (
                    <div
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}>
                        Tất cả
                      </Checkbox>
                    </div>
                  ),
                },
                {
                  // divide 2 items
                  key: 'divider',
                  type: 'divider',
                },
                {
                  key: 'columnOptions',
                  label: (
                    <div
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <Checkbox.Group
                        value={checkedList}
                        options={columnOptions as CheckboxOptionType[]}
                        className='flex flex-col'
                        onChange={handleCheckboxChange}
                      />
                    </div>
                  ),
                },
              ],
            }}
            trigger={['click']}
            placement='bottomRight'>
            <Button className='mr-4 bg-[#4d7bc2] text-white'>
              <IconRoot
                icon={IconVariable.plus}
                className='hover:cursor-pointer'
              />
              Cột
            </Button>
          </Dropdown>

          <div>
            <Button
              onClick={handleOpenModal}
              className=' bg-[#4d7bc2] text-white'>
              Thêm mới
            </Button>

            <AddForm
              isOpen={isModalOpen}
              onSubmit={handleAddSubmit}
              totalData={totalData as any}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      </div>

      <div className='mb-2 flex w-full justify-end '>
        <div className='flex items-center justify-center'>
          <Button
            className='mx-2 bg-[#4d7bc2] text-white hover:bg-[#3d69b0]'
            onClick={() => {
              handlePaginationChange(currentPage - 1);
            }}
            disabled={currentPage <= 1}>
            <LeftOutlined />
          </Button>
          <div className='flex items-center'>
            <Input
              type='number'
              min={1}
              max={maxPages}
              placeholder={String(currentPage)}
              value={inputPageNumber}
              onPressEnter={e => {
                const page = Number.parseInt((e.target as HTMLInputElement).value);
                if (page >= 1 && page <= maxPages) {
                  handlePaginationChange(page);
                }
              }}
              onChange={e => {
                const value = e.target.value;
                // Allow empty input or numbers within valid range
                if (value === '') {
                  setInputPageNumber(currentPage); // Allow empty string temporarily
                } else {
                  const pageNum = Number.parseInt(value);
                  if (!Number.isNaN(pageNum)) {
                    setInputPageNumber(pageNum);
                  }
                }
              }}
              onBlur={() => {
                // When input loses focus, validate and correct the value
                if (typeof inputPageNumber === 'string' && inputPageNumber === '') {
                  setInputPageNumber(currentPage);
                } else {
                  const pageNum = Number(inputPageNumber);
                  if (pageNum < 1) {
                    setInputPageNumber(1);
                  } else if (pageNum > maxPages) {
                    setInputPageNumber(maxPages);
                  }
                }
              }}
              className='mx-2 w-16 text-center'
            />

            <span>/ {maxPages}</span>
          </div>
          <Button
            className='mx-2 bg-[#4d7bc2] text-white hover:bg-[#3d69b0]'
            onClick={() => {
              handlePaginationChange(currentPage + 1);
            }}
            disabled={currentPage >= maxPages}>
            <RightOutlined />
          </Button>
        </div>

        <Select
          defaultValue={25}
          style={{ width: 120 }}
          onChange={handlePageSizeChange}
          className='pl-2'
          options={[
            { value: 5, label: '5 dòng' },
            { value: 10, label: '10 dòng' },
            { value: 25, label: '25 dòng' },
            { value: 50, label: '50 dòng' },
            { value: 100, label: '100 dòng' },
          ]}
        />
      </div>

      {/* Main Table */}
      <Table<IShiftDataType>
        columns={newColumns.filter(col => !col.hidden)}
        dataSource={data}
        pagination={false} // Disable default pagination
        className='mb-10 mt-4 w-full overflow-auto '
        scroll={{ y: 600 }}
        bordered
      />
    </div>
  );
};

export default ShiftView;
