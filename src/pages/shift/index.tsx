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
import ShiftView from './view';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface shiftData {
  code: string;
  name: string;
  note: string;
  phonenumber: string;
}

export interface IWorkingTime {
  id: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  fromBreakTime: string;
  toBreakTime: string;
  totalHours: number;
  active: boolean;
}

export interface IDepartment {
  id?: string;
  name?: string;
  code?: string;
}

export interface IShiftDataType {
  id?: number;
  code: string;
  name: string;
  shiftType: 'FIXED' | 'FLEXIBLE';
  departmentList: IDepartment[];
  note: string;
  overtime: boolean;
  overtimeForMinutes: number;
  workingTimes: Array<{
    active: boolean;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    fromBreakTime: string;
    toBreakTime: string;
    totalHours: number;
  }>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShiftPage: React.FC = () => {
  const [data, setData] = useState<IShiftDataType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [totalData, setTotalData] = useState<IShiftDataType[]>([]);
  const [departmentCode, setDepartmentCode] = useState<string>('');

  //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState<number | null>(null);
  const [selectedShiftData, setSelectedShiftData] = useState<shiftData | null>(null);

  // Fetch token from cookies using AuthService
  const token = AuthService.getPackageAuth();

  // Api
  const shiftApi: IApiRequest = {
    url: 'https://api.tsp.com.vn/hrm/shift-for-staff?page=0&size=2000',
    method: 'get',
    headers: {
      // Set Authorization header using token from cookies
      Authorization: `Bearer ${token}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  };

  const filterShiftApi: IApiRequest = {
    url: `https://api.tsp.com.vn/hrm/shift-for-staff?page=${currentPage - 1}&size=${pageSize}${departmentCode ? `&departmentCode=${departmentCode}` : ''}${searchValue ? `&codeOrName=${searchValue}` : ''}`,
    method: 'get',
    headers: {
      // Set Authorization header using token from cookies
      Authorization: `Bearer ${token}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  };

  const getShiftApi = (id: number): IApiRequest => ({
    url: `https://api.tsp.com.vn/hrm/shift/${id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  });

  const saveShiftApi: IApiRequest = {
    url: `https://api.tsp.com.vn/hrm/shift/${selectedShiftId}`,
    method: 'put',
    headers: {
      Authorization: `Bearer ${token}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  };

  const addShiftApi: IApiRequest = {
    url: 'https://api.tsp.com.vn/hrm/shift-for-staff',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  };

  // Handles successful shift response
  const handleAllShiftResponse = {
    handleRequestSuccess: (response: any) => {
      if (response?.code === 2000) {
        setTotal(response.totalElements || response.data.length > 0);
        setTotalData(response.data);
      } else {
        toastDefault(EnumToast.ERROR, 'Failed to fetch shift data');
      }
    },
    handleRequestFailed: (error: any) => {
      LoggerService.error('Error fetching shifts:', error.message);
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
      LoggerService.error('Error fetching filtered shifts:', error.message);
    },
  };

  const getShiftResponse = {
    handleRequestSuccess: (response: any) => {
      if (response?.code === 2000) {
        const formattedData = {
          code: response.data.code,
          name: response.data.name,
          note: response.data.note,
          phonenumber: response.data.phoneNumber || '',
        };
        setSelectedShiftData(formattedData);
        setIsModalOpen(true);
      } else {
        toastDefault(EnumToast.ERROR, 'Failed to get shift details');
      }
    },
    handleRequestFailed: (error: any) => {
      LoggerService.error('Error getting shift:', error.message);
      toastDefault(EnumToast.ERROR, 'Failed to get shift details');
    },
  };

  const saveShiftResponse = {
    handleRequestSuccess: (response: any) => {
      if (response?.code === 2000) {
        toastDefault(EnumToast.SUCCESS, 'Shift added successfully');
        mutateFilterShifts({}); // Refresh shifts
      } else {
        toastDefault(EnumToast.ERROR, 'Failed to add shift');
      }
    },
    handleRequestFailed: (error: any) => {
      LoggerService.error('Error adding shift:', error.message);
    },
  };

  const addShiftResponse = {
    handleRequestSuccess: (response: any) => {
      if (response?.code === 2000) {
        toastDefault(EnumToast.SUCCESS, 'Shift added successfully');
        mutateFilterShifts({}); // Refresh shifts after adding
      } else {
        toastDefault(EnumToast.ERROR, 'Failed to add shift');
      }
    },
    handleRequestFailed: (error: any) => {
      LoggerService.error('Error adding shift:', error.message);
    },
  };

  const createShiftRequest = (id: number) => {
    return useRequest(getShiftApi(id), getShiftResponse);
  };

  // Custom hook to trigger the shift fetch request
  const { mutate: mutateShifts } = useRequest(shiftApi, handleAllShiftResponse);
  const { mutate: mutateFilterShifts } = useRequest(filterShiftApi, handleFilterStaffResponse);
  const { mutate: mutateGetShift } = useRequest(
    getShiftApi(selectedShiftId ?? 0), // Provide a default value
    getShiftResponse,
  );
  const { mutate: mutateSaveShift } = useRequest(saveShiftApi, saveShiftResponse);
  const { mutate: mutateAddShift } = useRequest(addShiftApi, addShiftResponse);

  useEffect(() => {
    mutateShifts({});
  }, []);

  useEffect(() => {
    if (selectedShiftId) {
      mutateGetShift({});
    }
  }, [selectedShiftId]);

  useEffect(() => {
    mutateFilterShifts({});
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

  const handleFilterShift = () => {
    mutateFilterShifts({});
  };

  const handleCodeClick = async (record: IShiftDataType) => {
    if (!record.id) return;

    setSelectedShiftId(record.id);
    const { mutate } = createShiftRequest(record.id);
    mutate({});
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShiftId(null);
    setSelectedShiftData({
      code: '',
      name: '',
      note: '',
      phonenumber: '',
    });
  };

  const handlePutFormSubmit = (data: shiftData) => {
    const dataApi = {
      code: data.code,
      name: data.name,
      note: data.note,
      phoneNumber: data.phonenumber,
    };
    mutateSaveShift({ ...dataApi });

    // Refresh the data and reset state
    mutateFilterShifts({});
    handlePageChange(1);
    setIsModalOpen(false);
    setSelectedShiftData(null);
  };

  // define columns
  const columns: TableColumnsType<IShiftDataType> = [
    {
      title: 'Mã ca',
      dataIndex: 'code',
      key: 'code',
      width: '20%',
      render: (text, record) => (
        <div
          className='cursor-pointer text-blue-600 hover:text-blue-800'
          onClick={() => {
            handleCodeClick(record);
            setSelectedShiftId(record.id ?? null);
          }}>
          {text}
        </div>
      ),
    },
    {
      title: 'Tên ca',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      render: text => <div className=''>{text}</div>,
    },
    {
      title: 'Loại ca',
      dataIndex: 'shiftType',
      key: 'shiftType',
      width: '15%',
      render: type => <div>{type === 'FIXED' ? 'Ca cố định' : 'Ca linh hoạt'}</div>,
    },
    {
      title: 'Mô tả',
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
      title: 'Phòng ban',
      dataIndex: 'departmentList',
      key: 'departments',
      width: '25%',
      render: (departments: IDepartment[]) => (
        <div
          className='max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap'
          title={departments.map(dept => `${dept.name}`).join(', ')} // Shows full list on hover
        >
          {departments.map((dept, index) => (
            <span key={dept.id}>
              {dept.name}
              {index < departments.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      width: '15%',
      render: (status: string) => (
        <div className=''>
          <Tag
            color={status === 'ACTIVE' ? 'green' : 'volcano'}
            className='flex items-center justify-center font-semibold'>
            {status === 'ACTIVE' ? (
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
            {status === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa'}
          </Tag>
        </div>
      ),
    },
  ];

  return (
    <div className='flex  flex-col '>
      <div className='flex'>
        {/* Content with Side Menu and Main Area */}
        <SideMenu defaultSelectedKeys={['3']} />
        <main className='min-h-[65rem] flex-1 bg-[#e8e8e8] pb-28'>
          {/* Header */}
          <NavBar title='Ca làm việc' />

          <div className='mx-8 mt-10 rounded-md bg-white p-4'>
            {/* Main Content Area */}
            <div className='mt-4 p-4'>
              <ShiftView
                // Pass filtered data to ShiftView
                data={data}
                totalData={totalData}
                columns={columns}
                onPageSizeChange={handlePageSizeChange}
                onPageChange={handlePageChange}
                onSearchValueChange={handleSearchValueChange}
                onFilterShift={handleFilterShift}
                onAddShift={mutateAddShift}
                setDepartmentCode={setDepartmentCode}
                pageSize={pageSize}
                currentPage={currentPage}
                total={total}
              />

              <PutForm
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handlePutFormSubmit}
                departmentData={selectedShiftData ?? undefined}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShiftPage;
