import { type TableColumnsType, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import Input from '@/components/input';
import toastDefault, { EnumToast } from '@/components/toast';
import AuthService from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

import DepartmentView from './view';

export interface IDataType {
  id: number;
  code: string;
  name: string;
  note: string;
  totalStaff: number;
  active: boolean;
}

// Define table columns
const columns: TableColumnsType<IDataType> = [
  {
    title: 'Stt',
    dataIndex: 'id',
    key: 'id',
    width: '5%',
    render: text => <div className=''>{text}</div>,
  },
  {
    title: 'Mã phòng ban',
    dataIndex: 'code',
    key: 'code',
    width: '20%',
    render: text => <div className=''>{text}</div>,
  },
  {
    title: 'Tên phòng ban',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
    render: text => <div className=''>{text}</div>,
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    key: 'note',
    width: '25%',
    render: text => <div className=''>{text}</div>,
  },
  {
    title: 'Số lượng nhân viên',
    dataIndex: 'totalStaff',
    key: 'totalStaff',
    width: '15%',
    render: text => <div className=''>{text}</div>,
  },
  {
    title: 'Trạng thái',
    key: 'active',
    dataIndex: 'active',
    width: '15%',
    render: (active: boolean) => (
      <div className=''>
        <Tag
          color={active ? 'green' : 'volcano'}
          className='flex items-center justify-center font-semibold'>
          {active ? (
            <IconRoot
              icon={IconVariable.tick}
              className='py-1 hover:cursor-pointer'
            />
          ) : (
            <IconRoot
              icon={IconVariable.lock}
              className='py-1 hover:cursor-pointer'
            />
          )}
          {active ? 'Hoạt động' : 'Đã khóa'}
        </Tag>
      </div>
    ),
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
const DepartmentPage: React.FC = () => {
  const [data, setData] = useState<IDataType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch token from cookies using AuthService
  const token = AuthService.getPackageAuth();

  // Api
  const departmentApi: IApiRequest = {
    url: 'https://api.tsp.com.vn/hrm/department?page=0&size=1000',
    method: 'get',
    headers: {
      // Set Authorization header using token from cookies
      Authorization: `Bearer ${token}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  };

  const addDepartmentApi: IApiRequest = {
    url: 'https://api.tsp.com.vn/hrm/department',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  };

  // Handles successful department response
  const handleResponse = {
    handleRequestSuccess: (response: any) => {
      if (response?.code === 2000) {
        setData(response.data);
      } else {
        toastDefault(EnumToast.ERROR, 'Failed to fetch department data');
      }
    },
    handleRequestFailed: (error: any) => {
      LoggerService.error('Error fetching departments:', error.message);
    },
  };

  // Handles successful addDepartment response
  const addDepartmentResponse = {
    handleRequestSuccess: (response: any) => {
      if (response?.code === 2000) {
        toastDefault(EnumToast.SUCCESS, 'Department added successfully');
        mutateDepartments({}); // Refresh departments after adding
      } else {
        toastDefault(EnumToast.ERROR, 'Failed to add department');
      }
    },
    handleRequestFailed: (error: any) => {
      LoggerService.error('Error adding department:', error.message);
    },
  };

  // Custom hook to trigger the department fetch request
  const { mutate: mutateDepartments } = useRequest(departmentApi, handleResponse);
  const { mutate: addDepartment } = useRequest(addDepartmentApi, addDepartmentResponse);

  useEffect(() => {
    mutateDepartments({});
  }, []);

  // Filter data based on search query
  const filteredData = data.filter(item => {
    const query = searchQuery.toLowerCase();

    // Check for active status
    if (query === 'hoạt động' || query === 'hoat dong') {
      return item.active;
    }
    if (query === 'đã khóa' || query === 'da khoa') {
      return !item.active;
    }

    // Otherwise, check the other fields
    return (
      (typeof item.name === 'string' && item.name.toLowerCase().includes(query)) ||
      (typeof item.code === 'string' && item.code.toLowerCase().includes(query)) ||
      (typeof item.note === 'string' && item.note.toLowerCase().includes(query)) ||
      item.totalStaff.toString().includes(query) ||
      item.id.toString().includes(query)
    );
  });

  const handleReset = () => {
    setSearchQuery('');
  };

  return (
    <div>
      <div className='h-8 w-full bg-blue-400'></div>
      <div className='h-full bg-[#e8e8e8] pb-28'>
        <h1 className='h-8 pb-4 pl-2 pt-1 font-semibold'>Phòng ban</h1>

        <div className='mx-8 mt-4 rounded-md bg-white'>
          <Input
            type='text'
            className='ml-6 mr-2 mt-6 w-[15%] rounded-md px-4 py-2'
            placeholder='Search'
            iconStart={
              <IconRoot
                icon={IconVariable.search}
                className='hover:cursor-pointer'
              />
            }
            name={'search'}
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
            }}></Input>

          <DepartmentView
            // Pass filtered data to DepartmentView
            data={filteredData}
            columns={columns}
            onAddDepartment={addDepartment}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;
