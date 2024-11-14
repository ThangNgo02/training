import './customCss.css';

import { CloseCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
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

import { type IStaffDataType } from '.';
import AddForm, { type AddFormValues } from './Form/addForm';
import FilterForm, { type FilterFormValues } from './Form/filterForm';

// Interfaces
interface IStaffViewProps {
  data: IStaffDataType[];
  totalData: IStaffDataType[];
  columns: TableColumnsType<IStaffDataType>;
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (currentPage: number) => void;
  onSearchValueChange: (searchValue: string) => void;
  onFilterStaff: () => void;
  onAddStaff: (payload: {
    code: string;
    fullName: string;
    position: string;
    departmentCode: string;
    birthDate: string;
    email: string;
    gender: string;
    hireDate: string;
    identityCard: string;
    isResigned: boolean;
    issueDateIdentityCard: string;
    issuePlaceIdentityCard: string;
    note: string;
    permanentAddress: string;
    phoneNumber: string;
    resignDate: string;
    socialInsuranceCode: string;
    staffMetaDataLevel: string;
    taxCode: string;
    temporaryAddress: string;
  }) => void;
  currentPage: number;
  pageSize: number;
  total: number;
  setPosition: (position: string) => void; // Added for setting position
  setSocialInsuranceCode: (code: string) => void; // Added for setting social insurance code
  setTaxCode: (code: string) => void; // Added for setting tax code
  setDepartmentCode: (code: string) => void; // Added for setting department code
  setStatus: (status: string) => void; // Added for setting status
}

// Main component
// eslint-disable-next-line @typescript-eslint/naming-convention
const StaffView: React.FC<IStaffViewProps> = ({
  data,
  totalData,
  columns,
  onPageSizeChange,
  onPageChange,
  onSearchValueChange,
  onFilterStaff,
  onAddStaff,
  currentPage,
  pageSize,
  total,
  setPosition,
  setSocialInsuranceCode,
  setTaxCode,
  setDepartmentCode,
  setStatus,
}) => {
  const maxPages = Math.max(1, Math.ceil(total / pageSize)); // Minimum of 1 page
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [showAddForm, setShowAddForm] = useState(false);
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

  // const defaultCheckedList = columns.map(item => item.key as string); //default all columns
  // Check list items - only include specific columns initially
  const defaultCheckedList = ['id', 'code', 'fullName', 'gender', 'position', 'departmentCode', 'status'];
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

  // handle filter submission
  const handleFilterSubmit = (data: FilterFormValues) => {
    setPosition(data.position || '');
    setSocialInsuranceCode(data.socialInsuranceCode || '');
    setTaxCode(data.taxCode || '');
    setDepartmentCode(data.departmentCode || '');
    setStatus(data.status || '');

    // Reset page to 1 when applying filters
    onPageChange(1);
    onFilterStaff();
    setShowFilterForm(false);
  };

  // Handle add submission
  const handleAddSubmit = (data: AddFormValues) => {
    console.log('Form values:', data);
    // Format date helper function for DD-MM-YYYY format to ISO 8601 (YYYY-MM-DDT00:00:00.000Z)
    const formatDate = (dateStr: string | undefined) => {
      if (!dateStr) return ''; // Return empty string if no date is provided

      try {
        // Split date into day, month, and year
        const [inputDay, inputMonth, inputYear] = dateStr.split('-');

        // Validate date components: Day (01-31), Month (01-12), Year (1900-2100)
        if (!inputDay || !inputMonth || !inputYear) return ''; // Return empty string if invalid

        const day = Number(inputDay);
        const month = Number(inputMonth);
        const year = Number(inputYear);

        // Check for valid day, month, and year ranges
        if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
          console.error('Invalid date:', dateStr);
          return ''; // Return empty string for invalid date
        }

        // Handle the case for invalid days for specific months
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) {
          console.error('Invalid day for month:', dateStr);
          return ''; // Return empty string if day exceeds days in month
        }

        // Pad the day, month, and year to ensure proper formatting
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        const formattedYear = String(year).padStart(4, '0');

        // Return in ISO 8601 format (YYYY-MM-DDT00:00:00.000Z)
        const date = new Date(`${formattedYear}-${formattedMonth}-${formattedDay}`);
        return date.toISOString(); // Convert to ISO string (UTC time)
      } catch (error) {
        console.error('Date parsing error:', error);
        return ''; // Return empty string if there's an error
      }
    };

    // Create request data with formatted dates
    const requestData: any = {
      staffMetaDataCreateRequest: {
        code: data.code?.trim() || '',
        fullName: data.fullName?.trim() || '',
        position: data.position?.trim() || '',
        departmentCode: data.departmentCode || '',
        email: data.email?.trim() || '',
        gender: data.gender || '',
        identityCard: data.identityCard?.trim() || '',
        isResigned: data.isResigned || false,
        issuePlaceIdentityCard: data.issuePlaceIdentityCard?.trim() || '',
        note: data.note?.trim() || '',
        permanentAddress: data.permanentAddress?.trim() || '',
        phoneNumber: data.phoneNumber?.trim() || '',
        socialInsuranceCode: data.socialInsuranceCode?.trim() || '',
        staffMetaDataLevel: data.staffMetaDataLevel || '',
        taxCode: data.taxCode?.trim() || '',
        temporaryAddress: data.temporaryAddress?.trim() || '',
      },
    };

    // Handle date fields (only add them if they are valid or empty)
    const birthDate = data.birthDate ? formatDate(data.birthDate) : '';
    const hireDate = data.hireDate ? formatDate(data.hireDate) : '';
    const issueDateIdentityCard = data.issueDateIdentityCard ? formatDate(data.issueDateIdentityCard) : '';
    const resignDate = data.resignDate ? formatDate(data.resignDate) : '';

    // Add dates to the requestData if they are not empty
    if (birthDate) requestData.staffMetaDataCreateRequest.birthDate = birthDate;
    if (hireDate) requestData.staffMetaDataCreateRequest.hireDate = hireDate;
    if (issueDateIdentityCard) requestData.staffMetaDataCreateRequest.issueDateIdentityCard = issueDateIdentityCard;
    if (resignDate) requestData.staffMetaDataCreateRequest.resignDate = resignDate;

    // Log the final payload to verify the data
    console.log('Final Payload:', requestData);

    // Send the formatted data to onAddStaff
    onAddStaff({
      ...requestData.staffMetaDataCreateRequest,
      gender: requestData.staffMetaDataCreateRequest.gender || '',
    });

    onPageChange(1);
    setShowAddForm(false);
  };

  // Prevent scrolling of background when add form is open
  useEffect(() => {
    document.body.style.overflow = showAddForm ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAddForm]);

  return (
    <div className='mx-6 flex flex-col items-center justify-center'>
      <div className='flex w-full items-center justify-between rounded-lg bg-white '>
        <div>
          <InputRoot
            type='text'
            className=' mt-10 w-[140%] rounded-md px-4 '
            placeholder='Mã / Tên nhân viên'
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

        <div className=' flex w-auto justify-end'>
          <Button // Reset button
            className='mr-4 mt-10 bg-[#4d7bc2]  px-1 py-2'
            onClick={handleRefresh}>
            <IconRoot
              icon={IconVariable.reload}
              className='fill-white hover:cursor-pointer hover:fill-black'
            />
          </Button>

          <div>
            <Dropdown // Filter form dropdown
              open={showFilterForm}
              onOpenChange={setShowFilterForm}
              dropdownRender={() => (
                <div
                  className='bg-white p-4 shadow-lg'
                  onClick={e => {
                    e.stopPropagation();
                  }}>
                  <div
                    onClick={e => {
                      e.stopPropagation();
                    }}>
                    <h1 className='font-bold'>Hồ sơ nhân viên </h1>
                  </div>

                  <hr className='mt-4' />
                  <h1 className='my-2 font-semibold'>Thông tin chi tiết </h1>

                  <FilterForm
                    onSubmit={handleFilterSubmit}
                    totalData={totalData}
                  />
                </div>
              )}
              trigger={['click']}>
              <Button className=' mr-4 mt-10 bg-[#4d7bc2] text-white'>Filter</Button>
            </Dropdown>
          </div>

          <Button // Download button
            className='mr-4 mt-10 bg-[#4d7bc2]  px-1 py-2'
            onClick={handleRefresh}>
            Xuat
          </Button>

          <Dropdown // Select columns dropdown
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
                        className='flex flex-col gap-1' // Changed from default to gap-1 for closer spacing
                        onChange={handleCheckboxChange}
                      />
                    </div>
                  ),
                },
              ],
            }}
            trigger={['click']}
            placement='bottomRight'>
            <Button className='mr-4 mt-10 bg-[#4d7bc2] text-white'>
              <IconRoot
                icon={IconVariable.plus}
                className='hover:cursor-pointer'
              />
              Cột
            </Button>
          </Dropdown>

          <div>
            <Dropdown // Add form dropdown
              open={showAddForm}
              onOpenChange={setShowAddForm}
              dropdownRender={() => (
                <AddForm
                  onSubmit={handleAddSubmit}
                  totalData={totalData}
                  onClose={() => {
                    setShowAddForm(false);
                  }}
                />
              )}
              trigger={['click']}>
              <Button className=' mt-10 bg-[#4d7bc2] text-white'>Thêm mới</Button>
            </Dropdown>
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
                  setInputPageNumber(value as any); // Allow empty string temporarily
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

      <Table<IStaffDataType>
        columns={newColumns.filter(col => !col.hidden)}
        dataSource={data}
        pagination={false} // Disable default pagination
        className='mb-10 mt-4 w-full overflow-auto '
        scroll={{ y: 500 }}
        bordered
      />
    </div>
  );
};

export default StaffView;
