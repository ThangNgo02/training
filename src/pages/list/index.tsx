import { useEffect } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useGet } from '@/api/api.middleware';
import { EnumApiPath } from '@/common/enum/Enums';
import { type IStaff } from '@/common/interfaces/staff';
import { type ITableColumns } from '@/common/interfaces/tableColumn';
import { Localize } from '@/context/languages';
import Config from '@/env';
import AuthService from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

import EmployeeListView from './view';

const columns: ITableColumns[] = [
  {
    key: 'index',
    fixed: 'left',
  },
  {
    key: 'code',
  },
  {
    key: 'gender',
    render: values => <span>{Localize({ tid: values.gender.toLowerCase() })}</span>,
  },
  {
    key: 'department',
    render: values => <>{values.department.code}</>,
  },
  {
    key: 'position',
  },
  {
    key: 'note',
  },
  {
    key: 'action',
    name: 'Thao tác',
    isHiddenHeader: true,
    onClick: (values, index) => {
      console.log(values, index);
    },
  },
];

function EmployeeListIndex() {
  const loginApi: IApiRequest = {
    url: `${Config.getInstance().getState().api.host}${EnumApiPath.staff}`,
    method: 'get',
    headers: {
      authorization: `Bearer ${AuthService.getPackageAuth().token}`,
    },
  };
  const funcRequest = {
    handleResponse: (response: any) => {
      try {
        LoggerService.debug('EditBankComponent execute handleRequestSuccess receive data', response);
      } catch (error: any) {
        LoggerService.error('CalendarYearDetailComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestFailed: (response: any) => {
      LoggerService.error('Error', response.message);
    },
  };

  const { data } = useGet(loginApi, funcRequest);

  useEffect(() => {
    console.log(data?.data, 'data');
  }, [data]);

  return (
    <EmployeeListView
      name='staff'
      data={data?.data as unknown as IStaff[]}
      columns={columns}
    />
  );
}

export default EmployeeListIndex;
