import { useEffect, useState } from 'react';
import { number } from 'yup';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import { Popover } from '@/components/popover';
import { type IOption } from '@/components/select';
import { Tag } from '@/components/tag';
import toastDefault, { EnumToast } from '@/components/toast';
import Config from '@/env';
import { LoggerService } from '@/utils/Logger';

import { type IColumnsTableProps, type IDataTableType } from './type';
import { ListEmployeesView } from './view';
export function ListEmployeesPage() {
  const initStateColumns: IColumnsTableProps[] = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Mã NV',
      dataIndex: 'code',
      key: 'code',
      render: text => (
        <Popover
          text={text}
          children={<span className='text-[#4072D0] underline hover:cursor-pointer'>{text}</span>}
        />
      ),
    },
    {
      title: 'Mã chấm công',
      dataIndex: 'timekeepingCode',
      key: 'timekeepingCode',
      width: 120,
    },
    {
      title: 'Tên nhân viên',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: 'Giới tính',
      key: 'gender',
      dataIndex: 'gender',
    },
    {
      title: 'Chức vụ',
      key: 'position',
      dataIndex: 'position',
    },
    {
      title: 'Phòng ban',
      key: 'departmentName',
      dataIndex: 'departmentName',
    },
    {
      title: 'Bậc',
      key: 'level',
      dataIndex: 'level',
    },
    {
      title: 'BHXH',
      key: 'socialInsuranceCode',
      dataIndex: 'socialInsuranceCode',
    },
    {
      title: 'MST',
      key: 'taxCode',
      dataIndex: 'taxCode',
    },
    {
      title: 'SDT',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: text => (
        <Tag
          className={`w-[100px] text-center ${text === 'Hoạt động' ? 'bg-[#ECFDF3] text-[#027A48]' : 'bg-[#FEF3F2] text-[#B42318]'} `}
          text={text}
          iconStart={
            text === 'Hoạt động' ? <IconRoot icon={IconVariable.tick} /> : <IconRoot icon={IconVariable.lock} />
          }
        />
      ),
    },
  ];

  const [listDepartment, setListDepartment] = useState<IOption[]>([]);
  const [listEmployee, setListEmployee] = useState<IDataTableType[]>([]);
  const [columns, setColumns] = useState<IColumnsTableProps[]>(initStateColumns);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowDisplay, setRowDisplay] = useState<number>(25);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [checkboxStates, setCheckboxStates] = useState<any>(() => ({
    stt: true,
    code: true,
    timekeepingCode: false,
    fullName: true,
    gender: true,
    position: true,
    departmentName: true,
    level: true,
    socialInsuranceCode: false,
    taxCode: false,
    phoneNumber: false,
    status: true,
  }));
  const [filterValues, setFilterValues] = useState({
    position: '',
    taxCode: '',
    status: '',
    socialInsuranceCode: '',
    departmentCode: '',
  });
  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: rowDisplay,
    position: '',
    socialInsuranceCode: '',
    taxCode: '',
    departmentCode: '',
    status: '',
    codeOrFullName: '',
  });
  const [queryParamsString, setQueryParamsString] = useState<string>('');
  useEffect(() => {
    const params = new URLSearchParams();
    for (const key of Object.keys(queryParams)) {
      const value = (queryParams as any)[key];
      if (value) params.append(key, value);
    }
    setQueryParamsString(params.toString());
  }, [queryParams]);

  const getAllEmployeeApi: IApiRequest = {
    url: `${Config.getInstance().getState().api.host}${Config.getInstance().getState().api.apiPath.getInfoEmployees}?${queryParamsString}`,
    method: 'get',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('tokenLogin')}`,
    },
  };

  const handlegetAllEmployee = async () => {
    mutate({});
  };

  const handleResponse = {
    handleRequestSuccess: (response: any) => {
      try {
        if (response.code === 2000) {
          const listDepartmentData = response.data.map((item: any) => {
            return {
              label: item.department.name,
              value: item.department.code,
            };
          });
          const dataTable: IDataTableType[] = response.data.map((item: any) => {
            return {
              code: item.code,
              timekeepingCode: item.timekeepingCode,
              fullName: item.fullName,
              gender: item.gender === 'MALE' ? 'Nam' : 'Nữ',
              position: item.position,
              departmentName: item.department.name,
              level: item.level,
              socialInsuranceCode: item.socialInsuranceCode,
              taxCode: item.taxCode,
              phoneNumber: item.phoneNumber,
              status: item.status === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa',
            };
          });
          setColumns(initStateColumns.filter(column => checkboxStates[column.key]));
          setListEmployee(dataTable);
          setListDepartment(listDepartmentData);
          setData(response.data);
          setTotalPages(Math.ceil(response.data.length / rowDisplay));
          toastDefault(EnumToast.SUCCESS, 'Lấy thông tin thành công');
        }
      } catch (error: any) {
        LoggerService.error('error when get info employees', error);
      }
    },
    handleRequestFailed: (response: any) => {
      LoggerService.error('Error', response.message);
    },
  };

  const { mutate } = useRequest(getAllEmployeeApi, handleResponse);

  useEffect(() => {
    handlegetAllEmployee();
  }, [queryParamsString]);

  const handleCheckboxChange = (updatedStates: Record<string, boolean>) => {
    setCheckboxStates(updatedStates);
  };
  useEffect(() => {
    const updatedColumns = initStateColumns.filter(column => checkboxStates[column.key]);
    setColumns(updatedColumns);
  }, [checkboxStates]);

  const handleChangeRowDisplay = (value: number) => {
    setRowDisplay(value);
    const totalPage = Math.ceil(20 / value);
    console.log('Total', totalPage);
    setQueryParams(prev => ({ ...prev, size: value }));
    setTotalPages(totalPage);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setQueryParams(prev => ({ ...prev, page: newPage }));
    setCurrentPage(newPage);
  };

  const handleFormFilter = (value: any) => {
    setFilterValues(value);
    setQueryParams(prev => ({
      ...prev,
      departmentCode: value.departmentCode || '',
      position: value.position || '',
      status: value.status || '',
      socialInsuranceCode: value.socialInsuranceCode || '',
      taxCode: value.taxCode || '',
    }));
  };

  const handleOnChangeSearch = (textSearch: string) => {
    setQueryParams(prev => ({ ...prev, codeOrFullName: textSearch }));
  };

  return (
    <ListEmployeesView
      data={listEmployee}
      columns={columns}
      listEmployee={data}
      listDepartment={listDepartment}
      currentPage={currentPage}
      totalPages={totalPages}
      checkboxStates={checkboxStates}
      initialValues={filterValues}
      onCheckboxChange={handleCheckboxChange}
      onChangeRowDisplay={handleChangeRowDisplay}
      onPageChange={handlePageChange}
      handleFormFilter={handleFormFilter}
      handleOnChangeSearch={handleOnChangeSearch}
    />
  );
}
