import { UserDeleteOutlined } from '@ant-design/icons';
import { type TableColumnsType, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import NavBar from '@/components/navBar';
import SideMenu from '@/components/sideMenu';
import toastDefault, { EnumToast } from '@/components/toast';
import AuthService from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

import StaffView from './view';

export interface IStaffDataType {
  id: number;
  code: string;
  timekeepingCode: string | null;
  fullName: string;
  gender: 'MALE' | 'FEMALE';
  position: string | null;
  department?: {
    id: number;
    code: string;
  };
  staffMetaDataLevel: string | null;
  socialInsuranceCode: string | null;
  taxCode: string | null;
  phoneNumber: string | null;
  status: 'ACTIVE' | 'DEACTIVE' | 'RESIGNED';
}

// Define table columns
const getColumns = (currentPage: number, pageSize: number): TableColumnsType<IStaffDataType> => [
  {
    title: 'Stt',
    dataIndex: 'id',
    key: 'id',
    width: '5%',
    render: (_, __, index) => <div className=''>{currentPage * pageSize - pageSize + index + 1}</div>,
  },
  {
    title: 'Mã NV',
    dataIndex: 'code',
    key: 'code',
    width: '10%',
    render: text => <div className=''>{text}</div>,
  },
  {
    title: 'Mã chấm công',
    dataIndex: 'timekeepingCode',
    key: 'timekeepingCode',
    width: '20%',
    render: text => <div className=''>{text ?? ''}</div>,
  },
  {
    title: 'Tên NV',
    dataIndex: 'fullName',
    key: 'fullName',
    width: '25%',
    render: text => <div className=''>{text}</div>,
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    key: 'gender',
    width: '10%',
    render: text => (text === 'MALE' ? <div className=''>Nam</div> : <div className=''>Nữ</div>),
  },

  {
    title: 'Chức vụ',
    dataIndex: 'position',
    key: 'position',
    width: '10%',
    render: text => <div className=''>{text ?? ''}</div>,
  },
  {
    title: 'Phòng ban',
    dataIndex: 'departmentCode',
    key: 'departmentCode',
    width: '15%',
    render: (_, record) => <div className=''>{record.department?.code ?? ''}</div>,
  },
  {
    title: 'Bậc',
    dataIndex: 'staffMetaDataLevel',
    key: 'staffMetaDataLevel',
    width: '10%',
    render: text => <div className=''>{text ?? ''}</div>,
  },
  {
    title: 'BHXH',
    dataIndex: 'socialInsuranceCode',
    key: 'socialInsuranceCode',
    width: '10%',
    render: text => <div className=''>{text ?? ''}</div>,
  },
  {
    title: 'MST',
    dataIndex: 'taxCode',
    key: 'taxCode',
    width: '10%',
    render: text => <div className=''>{text ?? ''}</div>,
  },
  {
    title: 'SDT',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: '15%',
    render: text => <div className=''>{text ?? ''}</div>,
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    width: '10%',
    render: (status: string) => (
      <div className=''>
        <Tag
          color={status === 'ACTIVE' ? 'green' : status === 'DEACTIVE' ? 'volcano' : 'default'}
          className='flex items-center justify-center font-semibold'>
          {status === 'ACTIVE' ? (
            <IconRoot
              icon={IconVariable.tick}
              className='px-1 py-1'
            />
          ) : status === 'DEACTIVE' ? (
            <IconRoot
              icon={IconVariable.lock}
              className='px-1 py-1'
            />
          ) : (
            <UserDeleteOutlined
              style={{
                fontSize: '16px',
                margin: '4px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            />
          )}
          {status === 'ACTIVE' ? 'Hoạt động' : status === 'DEACTIVE' ? 'Đã khóa' : 'Đã nghỉ'}
        </Tag>
      </div>
    ),
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
const StaffPage: React.FC = () => {
  const [data, setData] = useState<IStaffDataType[]>([]);
  const [totalData, setTotalData] = useState<IStaffDataType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [position, setPosition] = useState<string>('');
  const [socialInsuranceCode, setSocialInsuranceCode] = useState<string>('');
  const [taxCode, setTaxCode] = useState<string>('');
  const [departmentCode, setDepartmentCode] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  // Fetch token from cookies using AuthService
  const token = AuthService.getPackageAuth();

  // Api
  const getAllStaffApi: IApiRequest = {
    url: `https://api.tsp.com.vn/hrm/staff-meta-data?page=0&size=25`,
    method: 'get',
    headers: {
      // Set Authorization header using token from cookies
      Authorization: `Bearer ${token}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  };

  const staffFilterApi: IApiRequest = {
    // url: `https://api.tsp.com.vn/hrm/staff-meta-data?page=${currentPage - 1}&size=${pageSize}&codeOrFullName=${searchValue}`,
    url: `https://api.tsp.com.vn/hrm/staff-meta-data?page=${currentPage - 1}&size=${pageSize}${
      position ? `&position=${position}` : ''
    }${socialInsuranceCode ? `&socialInsuranceCode=${socialInsuranceCode}` : ''}${
      taxCode ? `&taxCode=${taxCode}` : ''
    }${departmentCode ? `&departmentCode=${departmentCode}` : ''}${
      status ? `&status=${status}` : ''
    }${searchValue ? `&codeOrFullName=${searchValue}` : ''}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  };

  const addStaffApi: IApiRequest = {
    url: 'https://api.tsp.com.vn/hrm/staff-meta-data',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  };

  // const extractStaffApi: IApiRequest = {
  //   url: `https://api.tsp.com.vn/hrm/report/export/staff${searchValue ? `?codeOrFullName=${encodeURIComponent(searchValue)}` : ''}`,
  //   method: 'get', // Changed to GET since it's a query parameter
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     // eslint-disable-next-line @typescript-eslint/naming-convention
  //     'Content-Type': 'application/json',
  //   },
  // };

  // Handles successful staff response
  const handleAllStaffResponse = {
    handleRequestSuccess: (response: any) => {
      if (response?.code === 2000) {
        setTotal(response.totalElements || response.data.length > 0);
        setTotalData(response.data);
      } else {
        toastDefault(EnumToast.ERROR, 'Failed to fetch staff data');
      }
    },
    handleRequestFailed: (error: any) => {
      LoggerService.error('Error fetching staff:', error.message);
    },
  };

  const handleFilterStaffResponse = {
    handleRequestSuccess: (response: any) => {
      if (response?.code === 2000) {
        setData(response.data);
        setTotal(response.totalElements || response.data.length > 0);
      } else {
        toastDefault(EnumToast.ERROR, 'Failed to fetch filtered staff data');
      }
    },
    handleRequestFailed: (error: any) => {
      LoggerService.error('Error fetching filtered staff:', error.message);
    },
  };

  // const handleExtractStaffResponse = {
  //   handleRequestSuccess: (response: any) => {
  //     if (response?.code === 2000) {

  //     } else {
  //       toastDefault(EnumToast.ERROR, 'Failed to fetch filtered staff data');
  //     }
  //   },
  //   handleRequestFailed: (error: any) => {
  //     LoggerService.error('Error fetching filtered staff:', error.message);
  //   },
  // };

  const addStaffResponse = {
    handleRequestSuccess: (response: any) => {
      if (response?.code === 2000) {
        toastDefault(EnumToast.SUCCESS, 'Staff added successfully');
        mutateFilterStaff({});
      } else {
        toastDefault(EnumToast.ERROR, 'Failed to add department');
      }
    },
    handleRequestFailed: (error: any) => {
      LoggerService.error('Error adding department:', error.message);
    },
  };

  // Custom hook to trigger the department fetch request
  const { mutate: mutateStaff } = useRequest(getAllStaffApi, handleAllStaffResponse);
  const { mutate: mutateFilterStaff } = useRequest(staffFilterApi, handleFilterStaffResponse);
  // const { mutate: mutateEXtractStaff } = useRequest(extractStaffApi, handleExtractStaffResponse);
  const { mutate: mutateAddStaff } = useRequest(addStaffApi, addStaffResponse);

  useEffect(() => {
    mutateStaff({});
  }, []);

  useEffect(() => {
    mutateFilterStaff({});
  }, [searchValue, pageSize, currentPage]);

  // Update page size and reset to the first page
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to the first page when page size changes
  };

  // Update the current page
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchValueChange = (searchValue: string) => {
    setSearchValue(searchValue);
    setCurrentPage(1); // Reset to the first page when search value changes
  };

  const handleFilterStaff = () => {
    mutateFilterStaff({});
  };

  return (
    <div className='flex  flex-col '>
      <div className='flex'>
        {/* Content with Side Menu and Main Area */}
        <SideMenu defaultSelectedKeys={['1']} />
        <main className='min-h-[65rem] flex-1 bg-[#e8e8e8] pb-28'>
          {/* Header */}
          <NavBar title='Danh sách nhân viên' />

          <div className='mx-8 mt-10 rounded-md bg-white p-4'>
            {/* Main Content Area */}
            <div className='mt-4 p-4'>
              <StaffView
                data={data}
                totalData={totalData}
                columns={getColumns(currentPage, pageSize)}
                onPageSizeChange={handlePageSizeChange}
                onPageChange={handlePageChange}
                onSearchValueChange={handleSearchValueChange}
                onFilterStaff={handleFilterStaff}
                onAddStaff={mutateAddStaff}
                pageSize={pageSize}
                currentPage={currentPage}
                total={total}
                setPosition={setPosition}
                setSocialInsuranceCode={setSocialInsuranceCode}
                setTaxCode={setTaxCode}
                setDepartmentCode={setDepartmentCode}
                setStatus={setStatus}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffPage;
