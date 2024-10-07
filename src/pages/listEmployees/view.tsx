import { Table } from 'antd';

import Button from '@/components/button';
import { Header } from '@/components/header';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import { Pagination } from '@/components/pagination';
import { Search } from '@/components/search';
import SelectRoot from '@/components/select';

import { type IDataType } from '.';

interface IListEmployeesViewProps {
  data: IDataType[];
  columns: any;
}

const options = [
  { label: '5 Dòng', value: '5' },
  { label: '10 Dòng', value: '10' },
  { label: '20 Dòng', value: '20' },
  { label: '25 Dòng', value: '25' },
  { label: '50 Dòng', value: '50' },
  { label: '100 Dòng', value: '100' },
];

export function ListEmployeesView({ data, columns }: IListEmployeesViewProps) {
  const handleSelect = (value: any) => {
    console.log(value);
  };
  return (
    <div className='flex h-full flex-col'>
      <Header
        title='Danh sách nhân viên'
        className='text-2xl font-bold text-[#1A1A1A]'
      />
      <div className='p-3'>
        <div className='flex-col rounded-xl bg-white p-6'>
          <div className='flex items-center justify-between'>
            <Search
              placeholder='Mã / Tên nhân viên'
              iconStart={<IconRoot icon={IconVariable.search} />}
            />
            <div className='flex items-center gap-4'>
              <Button
                text='Cột'
                className='flex items-center gap-2 rounded-lg border px-4 py-[10px] hover:border-[#2DB976]'
                iconStart={<IconRoot icon={IconVariable.setting} />}
              />
              <Button
                text='Bộ lọc'
                className='flex items-center gap-2 rounded-lg border px-4 py-[10px] hover:border-[#2DB976]'
                iconStart={<IconRoot icon={IconVariable.filter} />}
              />
              <Button
                text='Xuất dữ liệu'
                className='flex items-center gap-2 rounded-lg border px-4 py-[10px] hover:border-[#2DB976]'
                iconStart={<IconRoot icon={IconVariable.download} />}
              />

              <Button
                className='flex items-center rounded-lg border bg-[#2DB976] px-4 py-[10px] text-white hover:border-[#2DB976]'
                text='Thêm mới'
                iconStart={<IconRoot icon={IconVariable.plus} />}
              />
            </div>
          </div>
          <div className='mt-5 flex items-center justify-end gap-4'>
            <Pagination />
            <SelectRoot
              options={options}
              firstValue={{
                label: '25 Dòng',
                value: 25,
              }}
              onChange={handleSelect}
              className='gap-[10px] rounded-md border px-4 py-2'
            />
          </div>
          <Table<IDataType>
            columns={columns}
            dataSource={data}
            scroll={{ x: 1000 }}
            className='custom-table mt-5 '
            pagination={false}
            size='small'
            bordered
            rowKey='employeeCode'
          />
        </div>
      </div>
    </div>
  );
}
