import './customCss.css';

import {
  Button,
  Checkbox,
  type CheckboxOptionType,
  type CheckboxProps,
  Dropdown,
  Pagination,
  Select,
  Table,
  type TableColumnsType,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form'; // +
import * as yup from 'yup';

import Form from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';

import { type IDepartmentDataType } from '.';

enum BlockForTimesheet {
  DRIVER = 'DRIVER',
  FACTORY = 'FACTORY',
  OFFICE = 'OFFICE',
  DELIVERY = 'DELIVERY',
}

interface IDepartmentViewProps {
  data: IDepartmentDataType[];
  columns: TableColumnsType<IDepartmentDataType>;
  onAddDepartment: (payload: {
    code: string;
    name: string;
    note: string;
    phoneNumber: string;
    blockForTimesheet: BlockForTimesheet;
  }) => void;
  onReset: () => void;
}

interface IAddData {
  code: string;
  name: string;
  note: string;
  phonenumber: string;
  blockForTimesheet: BlockForTimesheet;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const DepartmentView: React.FC<IDepartmentViewProps> = ({ data, columns, onAddDepartment, onReset }) => {
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const [pageSize, setPageSize] = useState(10); // Number of items per page
  const [tableData, setTableData] = useState<IDepartmentDataType[]>(data); // Hold table data
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [showForm, setShowForm] = useState(false);

  // Handles pagination change
  const handlePaginationChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
  };

  // Handles page size change from dropdown
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  // Slice data before use for the current page
  const paginatedData = tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Data update after filter
  useEffect(() => {
    setCurrentPage(1);
    setTableData(data);
  }, [data]);

  // Check list items
  const defaultCheckedList = columns.map(item => item.key as string);
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
    setTableData(data);
    setCurrentPage(1);
    setCheckedList(newColumns.map(column => column.key as string));
    onReset();
  };

  // Handle form submission
  const handleSubmit = (data: IAddData) => {
    onAddDepartment({
      code: data.code,
      name: data.name,
      note: data.note,
      phoneNumber: data.phonenumber,
      blockForTimesheet: BlockForTimesheet.OFFICE, // Default value
    });
    setShowForm(false);
  };

  // Using form
  const methods = useFormContext();

  return (
    <div className='mx-6 flex flex-col items-center justify-center'>
      <div className='mb-2 flex w-full justify-end pr-10'>
        <Button
          className='mr-4 bg-[#4d7bc2] px-1  py-2'
          onClick={handleRefresh}>
          <IconRoot
            icon={IconVariable.reload}
            className='fill-white hover:cursor-pointer hover:fill-black'
          />
        </Button>

        <Dropdown
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
                      Check all
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

        <Dropdown
          open={showForm}
          onOpenChange={setShowForm}
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
                <h1 className='font-semibold'>Thêm phòng ban </h1>
              </div>

              <hr className='mt-4' />

              <Form
                onSubmit={handleSubmit}
                validator={{
                  code: yup.string().required('Mã phòng ban không được để trống'),
                  name: yup.string().required('Tên phòng ban không được để trống'),
                }}>
                <div
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  className=''>
                  <div className='grid grid-cols-2 space-x-3'>
                    <div>
                      <div
                        className='mb-4 w-full'
                        onClick={e => {
                          e.stopPropagation();
                        }}>
                        <label
                          htmlFor='code'
                          className='mb-2 block text-sm font-bold text-gray-700'>
                          Mã phòng ban
                        </label>
                        <InputRoot
                          type='text'
                          id='code'
                          name='code'
                          placeholder='Điền mã phòng ban'
                          errorString={
                            // eslint-disable-next-line @typescript-eslint/no-base-to-string
                            methods?.formState?.errors?.code ? methods?.formState?.errors?.code?.toString() : ''
                          }
                          className={`w-full rounded-md border px-3 py-2 focus:outline-none`}
                        />
                      </div>
                      <div
                        className='mb-6'
                        onClick={e => {
                          e.stopPropagation();
                        }}>
                        <label
                          htmlFor='phonenumber'
                          className='mb-2 block text-sm font-bold text-gray-700'>
                          Số điện thoại
                        </label>

                        <div className='relative'>
                          <InputRoot
                            type='text'
                            id='phonenumber'
                            name='phonenumber'
                            placeholder='Điền số điện thoại'
                            className={`w-full rounded-md border px-3 py-2 focus:outline-none`}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className=' w-full'>
                        <label
                          htmlFor='name'
                          className='mb-2 block text-sm font-bold text-gray-700'>
                          Tên phòng ban
                        </label>
                        <InputRoot
                          type='text'
                          id='name'
                          name='name'
                          placeholder='Điền tên phòng ban'
                          errorString={
                            // eslint-disable-next-line @typescript-eslint/no-base-to-string
                            methods?.formState?.errors?.name ? methods?.formState?.errors?.name?.toString() : ''
                          }
                          className={`w-full rounded-md border px-3 py-2 focus:outline-none`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className='flex items-center justify-end gap-4'
                  onClick={e => {
                    e.stopPropagation();
                  }}>
                  <div className='mb-4 w-full'>
                    <label
                      htmlFor='note'
                      className='  text-sm font-bold text-gray-700'>
                      Ghi chú
                    </label>
                    <InputRoot
                      type='text'
                      id='note'
                      name='note'
                      placeholder='Ghi chú'
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none`}
                    />
                  </div>
                </div>

                <div
                  className='flex items-center justify-end gap-4'
                  onClick={e => {
                    e.stopPropagation();
                  }}>
                  <Button
                    className='bg-gray-400 text-white hover:bg-gray-500'
                    onClick={e => {
                      e.stopPropagation();
                      setShowForm(false);
                    }}>
                    Đóng
                  </Button>
                  <Button
                    htmlType='submit'
                    className='bg-[#4d7bc2] text-white hover:bg-[#3d69b0]'>
                    Thêm
                  </Button>
                </div>
              </Form>
            </div>
          )}
          trigger={['click']}>
          <Button className='mr-4 bg-[#4d7bc2] text-white'>Thêm mới</Button>
        </Dropdown>
      </div>

      <div className='mb-2 flex w-full justify-end pr-10'>
        <Pagination
          total={tableData.length} // Total data count
          current={currentPage} // Bind to current page
          pageSize={pageSize} // Bind to selected page size
          showSizeChanger={false} // Hide the built-in page size changer
          showQuickJumper // Allow jumping to a specific page
          onChange={handlePaginationChange} // Handle page or size change
        />

        <Select
          defaultValue={5}
          style={{ width: 120 }}
          onChange={handlePageSizeChange}
          className='px-2'
          options={[
            { value: 5, label: '5 / page' },
            { value: 10, label: '10 / page' },
            { value: 20, label: '20 / page' },
            { value: 50, label: '50 / page' },
            { value: 100, label: '100 / page' },
          ]}
        />
      </div>

      {/* Main Table */}
      <Table<IDepartmentDataType>
        columns={newColumns.filter(col => !col.hidden)}
        dataSource={paginatedData} // Only pass paginated data to the table
        pagination={false} // Disable default pagination
        className='mb-10 mt-4 w-full overflow-auto px-10'
        bordered
      />
    </div>
  );
};

export default DepartmentView;
