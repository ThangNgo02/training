import type { TableProps } from 'antd';

import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import { Popover } from '@/components/popover';
import { Tag } from '@/components/tag';

import { ListEmployeesView } from './view';
export interface IDataType {
  employeeCode?: string | null;
  attendanceCode?: string | null;
  employeeName?: string | null;
  gender?: string | null;
  position?: string | null;
  departmentName?: string | null;
  level?: string | null;
  socialInsurance?: string | null;
  taxCode?: string | null;
  phoneNumber?: string | null;
  status?: string | null;
}
export function ListEmployeesPage() {
  const columns: TableProps<IDataType>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, __, index) => index + 1,
      width: 40,
    },
    {
      title: 'Mã NV',
      dataIndex: 'employeeCode',
      key: 'employeeCode',
      render: text => (
        <Popover
          text={text}
          children={<span className='text-[#4072D0] underline hover:cursor-pointer'>{text}</span>}
        />
      ),
      width: 120,
    },
    {
      title: 'Mã chấm công',
      dataIndex: 'attendanceCode',
      key: 'attendanceCode',
      width: 120,
    },
    {
      title: 'Tên NV',
      key: 'employeeName',
      dataIndex: 'employeeName',
      width: 1500,
    },
    {
      title: 'Giới tính',
      key: 'gender',
      dataIndex: 'gender',
      width: 120,
    },
    {
      title: 'Chức vụ',
      key: 'position',
      dataIndex: 'position',
      width: 500,
    },
    {
      title: 'Phòng ban',
      key: 'departmentName',
      dataIndex: 'departmentName',
      width: 120,
    },
    {
      title: 'Bậc',
      key: 'level',
      dataIndex: 'level',
      width: 720,
    },
    {
      title: 'BHXH',
      key: 'socialInsurance',
      dataIndex: 'socialInsurance',
      width: 820,
    },
    {
      title: 'MST',
      key: 'taxCode',
      dataIndex: 'taxCode',
      width: 620,
    },
    {
      title: 'SDT',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
      width: 420,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: text => (
        <Tag
          className={`w-[100px] text-center ${text === 'Hoat dong' ? 'bg-[#ECFDF3] text-[#027A48]' : 'bg-[#FEF3F2] text-[#B42318]'} `}
          text={text === 'Hoat dong' ? 'Hoạt động' : 'Đã khóa'}
          iconStart={
            text === 'Hoat dong' ? <IconRoot icon={IconVariable.tick} /> : <IconRoot icon={IconVariable.lock} />
          }
        />
      ),
    },
  ];

  const data: IDataType[] = [
    {
      employeeCode: 'F00023',
      attendanceCode: 'AC003',
      employeeName: 'Trinh Hoang Quan',
      gender: 'Nam',
      position: 'Back end',
      departmentName: 'TSP',
      level: 'Thuc tap sinh',
      socialInsurance: null,
      taxCode: null,
      phoneNumber: '0372939592',
      status: 'Hoat dong',
    },
    {
      employeeCode: 'F00029',
      attendanceCode: 'AC009',
      employeeName: 'Vo Thi Diem My',
      gender: 'Nu',
      position: 'Back end',
      departmentName: 'TTP',
      level: 'Thuc tap sinh',
      socialInsurance: null,
      taxCode: null,
      phoneNumber: '0372938172',
      status: 'Da khoa',
    },
    {
      employeeCode: '0002null',
      attendanceCode: '0002null',
      employeeName: 'Vo Thi Diem My',
      gender: 'Nu',
      position: 'Back end',
      departmentName: 'TTP',
      level: 'Thuc tap sinh',
      socialInsurance: null,
      taxCode: null,
      phoneNumber: '0372938172',
      status: 'Hoat dong',
    },
  ];

  return (
    <ListEmployeesView
      data={data}
      columns={columns}
    />
  );
}
