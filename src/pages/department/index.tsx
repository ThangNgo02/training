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

import PutForm from './Form/putForm';
import DepartmentView from './view';

export enum BlockForTimesheet {
  DRIVER = 'DRIVER',
  FACTORY = 'FACTORY',
  OFFICE = 'OFFICE',
  DELIVERY = 'DELIVERY',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface departmentData {
  code: string;
  name: string;
  note: string;
  phonenumber: string;
  blockForTimesheet: BlockForTimesheet;
}

export interface IDepartmentDataType {
  id: number;
  code: string;
  name: string;
  note: string;
  totalStaff: number;
  active: boolean;
  phoneNumber?: string;
  blockForTimesheet?: BlockForTimesheet;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const DepartmentPage: React.FC = () => {
  const [data, setData] = useState<IDepartmentDataType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
  const [selectedDepartmentData, setSelectedDepartmentData] = useState<departmentData | null>(null);

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

  const filterDepartmentApi: IApiRequest = {
    url: `https://api.tsp.com.vn/hrm/department?page=${currentPage - 1}&size=${pageSize}${searchValue ? `&codeOrName=${searchValue}` : ''}`,
    method: 'get',
    headers: {
      // Set Authorization header using token from cookies
      Authorization: `Bearer ${token}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  };

  const getDepartmentApi = (id: number): IApiRequest => ({
    url: `https://api.tsp.com.vn/hrm/department/${id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  });

  const createSaveDepartmentApi = (id: number): IApiRequest => ({
    url: `https://api.tsp.com.vn/hrm/department/${id}`,
    method: 'put',
    headers: {
      Authorization: `Bearer ${token}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  });

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
  const handleAllDepartmentResponse = {
    handleRequestSuccess: (response: any) => {
      if (response?.code === 2000) {
        setTotal(response.totalElements || response.data.length > 0);
      } else {
        toastDefault(EnumToast.ERROR, 'Failed to fetch department data');
      }
    },
    handleRequestFailed: (error: any) => {
      LoggerService.error('Error fetching departments:', error.message);
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
      LoggerService.error('Error fetching filtered departments:', error.message);
    },
  };

  const getDepartmentResponse = {
    handleRequestSuccess: (response: any) => {
      if (response?.code === 2000) {
        const formattedData = {
          code: response.data.code,
          name: response.data.name,
          note: response.data.note,
          phonenumber: response.data.phoneNumber || '',
          blockForTimesheet: response.data.blockForTimesheet || BlockForTimesheet.DRIVER,
        };
        setSelectedDepartmentData(formattedData);
        setIsModalOpen(true);
      } else {
        toastDefault(EnumToast.ERROR, 'Failed to get department details');
      }
    },
    handleRequestFailed: (error: any) => {
      LoggerService.error('Error getting department:', error.message);
      toastDefault(EnumToast.ERROR, 'Failed to get department details');
    },
  };

  const saveDepartmentResponse = {
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

  const createDepartmentRequest = (id: number) => {
    return useRequest(getDepartmentApi(id), getDepartmentResponse);
  };

  // Custom hook to trigger the department fetch request
  const { mutate: mutateDepartments } = useRequest(departmentApi, handleAllDepartmentResponse);
  const { mutate: mutateFilterDepartments } = useRequest(filterDepartmentApi, handleFilterStaffResponse);
  const { mutate: mutateGetDepartment } = useRequest(
    getDepartmentApi(selectedDepartmentId ?? 0), // Provide a default value
    getDepartmentResponse,
  );
  const { mutate: mutateSaveDepartment } = useRequest(
    // Only create the API when we have an ID
    createSaveDepartmentApi(selectedDepartmentId ?? 0),
    saveDepartmentResponse,
  );
  const { mutate: mutateAddDepartment } = useRequest(addDepartmentApi, addDepartmentResponse);

  useEffect(() => {
    mutateDepartments({});
  }, []);

  useEffect(() => {
    if (selectedDepartmentId) {
      mutateGetDepartment({});
    }
  }, [selectedDepartmentId]);

  useEffect(() => {
    mutateFilterDepartments({});
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

  const handleFilterDepartment = () => {
    mutateFilterDepartments({});
  };

  const handleCodeClick = async (record: IDepartmentDataType) => {
    if (!record.id) return;

    setSelectedDepartmentId(record.id);
    const { mutate } = createDepartmentRequest(record.id);
    mutate({});
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDepartmentId(null);
    setSelectedDepartmentData({
      code: '',
      name: '',
      note: '',
      phonenumber: '',
      blockForTimesheet: '' as BlockForTimesheet,
    });
  };

  const handlePutFormSubmit = (data: departmentData) => {
    console.log('Selected Department ID before submit:', selectedDepartmentId);
    mutateSaveDepartment({
      id: selectedDepartmentId,
      data: {
        code: data.code,
        name: data.name,
        note: data.note,
        phoneNumber: data.phonenumber,
        blockForTimesheet: data.blockForTimesheet,
      },
    });

    // Refresh the data and reset state
    mutateFilterDepartments({});
    handlePageChange(1);
    setIsModalOpen(false);
    setSelectedDepartmentId(null);
    setSelectedDepartmentData(null);
  };

  // define columns
  const columns: TableColumnsType<IDepartmentDataType> = [
    {
      title: 'Mã phòng ban',
      dataIndex: 'code',
      key: 'code',
      width: '20%',
      render: (text, record) => (
        <div
          className='cursor-pointer text-blue-600 hover:text-blue-800'
          onClick={() => {
            handleCodeClick(record);
          }}>
          {text}
        </div>
      ),
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
      render: text => (
        <div
          className='max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap'
          style={{ textOverflow: 'ellipsis' }}
          title={text} // This shows the full text on hover
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Số lượng nhân viên',
      dataIndex: 'totalStaff',
      key: 'totalStaff',
      width: '20%',
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

  return (
    <div className='flex  flex-col '>
      <div className='flex'>
        {/* Content with Side Menu and Main Area */}
        <SideMenu defaultSelectedKeys={['2']} />
        <main className='min-h-[65rem] flex-1 bg-[#e8e8e8] pb-28'>
          {/* Header */}
          <NavBar title='Phòng ban' />

          <div className='mx-8 mt-10 rounded-md bg-white p-4'>
            {/* Main Content Area */}
            <div className='mt-4 p-4'>
              <DepartmentView
                // Pass filtered data to DepartmentView
                data={data}
                columns={columns}
                onPageSizeChange={handlePageSizeChange}
                onPageChange={handlePageChange}
                onSearchValueChange={handleSearchValueChange}
                onFilterDepartment={handleFilterDepartment}
                onAddDepartment={mutateAddDepartment}
                pageSize={pageSize}
                currentPage={currentPage}
                total={total}
              />

              <PutForm
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handlePutFormSubmit}
                departmentData={selectedDepartmentData ?? undefined}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DepartmentPage;
